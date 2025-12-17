import { z } from 'zod'

const ASAAS_BASE_URL =
  process.env.ASAAS_BASE_URL || 'https://sandbox.asaas.com/api/v3'
const ASAAS_API_KEY = process.env.ASAAS_API_KEY || ''

type AsaasPaymentStatus =
  | 'PENDING'
  | 'RECEIVED'
  | 'CONFIRMED'
  | 'OVERDUE'
  | 'REFUNDED'
  | 'RECEIVED_IN_CASH'
  | 'REFUND_REQUESTED'
  | 'REFUND_IN_PROGRESS'
  | 'REFUND_DENIED'
  | 'CANCELLED'
  | 'AUTHORIZED'
  | 'AWAITING_RISK_ANALYSIS'
  | 'APPROVED_BY_RISK_ANALYSIS'
  | 'REPROVED_BY_RISK_ANALYSIS'
  | 'CREDIT_CARD_CAPTURE_REFUSED'

interface AsaasPaymentResponse {
  id: string
  status: AsaasPaymentStatus
  value: number
  netValue?: number
  billingType: string
  dueDate: string
  description?: string
  clientPaymentDate?: string
  paymentDate?: string
  originalValue?: number
  interestValue?: number
  discountValue?: number
  bankSlipUrl?: string
  invoiceUrl?: string
  bankSlipBarcode?: string
  identificationField?: string
  customer: string
}

const CustomerSchema = z.object({
  id: z.string(),
})

async function asaasRequest<T>(
  path: string,
  init?: RequestInit,
  apiKey = ASAAS_API_KEY
): Promise<T> {
  if (!apiKey) {
    throw new Error('ASAAS_API_KEY is not configured')
  }

  const response = await fetch(`${ASAAS_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      access_token: apiKey,
      ...(init?.headers || {}),
    },
  })

  const data = await response.json()

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'errors' in data
        ? JSON.stringify((data as { errors: unknown }).errors)
        : response.statusText
    throw new Error(`Asaas request failed: ${message}`)
  }

  return data as T
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function mapAsaasStatus(
  status: AsaasPaymentStatus
): 'pending' | 'paid' | 'overdue' | 'cancelled' | 'refunded' {
  switch (status) {
    case 'RECEIVED':
    case 'CONFIRMED':
    case 'RECEIVED_IN_CASH':
      return 'paid'
    case 'OVERDUE':
      return 'overdue'
    case 'CANCELLED':
      return 'cancelled'
    case 'REFUNDED':
    case 'REFUND_IN_PROGRESS':
    case 'REFUND_REQUESTED':
    case 'REFUND_DENIED':
      return 'refunded'
    default:
      return 'pending'
  }
}

export async function findOrCreateCustomer(params: {
  name: string
  cpfCnpj: string
  email: string
  phone?: string
  externalReference?: string
  apiKey?: string
}): Promise<string> {
  const searchParams = new URLSearchParams({ cpfCnpj: params.cpfCnpj })
  const search = await asaasRequest<{ data: Array<{ id: string }> }>(
    `/customers?${searchParams.toString()}`,
    undefined,
    params.apiKey
  )

  if (search.data?.[0]?.id) {
    return search.data[0].id
  }

  const created = await asaasRequest<{ id: string }>(
    '/customers',
    {
      method: 'POST',
      body: JSON.stringify({
        name: params.name,
        cpfCnpj: params.cpfCnpj,
        email: params.email,
        phone: params.phone,
        externalReference: params.externalReference,
        notificationDisabled: false,
      }),
    },
    params.apiKey
  )

  return CustomerSchema.parse(created).id
}

export async function createAsaasBoleto(params: {
  amount: number
  dueDate: Date
  description: string
  customer: {
    name: string
    document: string
    email: string
    phone?: string
  }
  externalReference?: string
  apiKey?: string
}): Promise<{
  transactionId: string
  barcode: string
  digitableLine: string
  dueDate: Date
  pdfUrl?: string
  instructions?: string[]
}> {
  const customerId = await findOrCreateCustomer({
    name: params.customer.name,
    cpfCnpj: params.customer.document,
    email: params.customer.email,
    phone: params.customer.phone,
    externalReference: params.externalReference,
    apiKey: params.apiKey,
  })

  const payment = await asaasRequest<AsaasPaymentResponse>(
    '/payments',
    {
      method: 'POST',
      body: JSON.stringify({
        customer: customerId,
        billingType: 'BOLETO',
        value: params.amount,
        dueDate: formatDate(params.dueDate),
        description: params.description,
        externalReference: params.externalReference,
        postalService: false,
      }),
    },
    params.apiKey
  )

  return {
    transactionId: payment.id,
    barcode: payment.bankSlipBarcode || payment.identificationField || '',
    digitableLine: payment.identificationField || payment.bankSlipBarcode || '',
    dueDate: new Date(payment.dueDate),
    pdfUrl: payment.bankSlipUrl || payment.invoiceUrl,
  }
}

export async function getAsaasPayment(
  paymentId: string,
  apiKey?: string
): Promise<{
  status: 'pending' | 'paid' | 'overdue' | 'cancelled' | 'refunded'
  paidAt?: Date
  amount?: number
}> {
  const payment = await asaasRequest<AsaasPaymentResponse>(
    `/payments/${paymentId}`,
    undefined,
    apiKey
  )

  const mappedStatus = mapAsaasStatus(payment.status)
  const paidAt =
    payment.clientPaymentDate || payment.paymentDate
      ? new Date(payment.clientPaymentDate || payment.paymentDate!)
      : undefined

  return {
    status: mappedStatus,
    paidAt,
    amount: payment.value,
  }
}

export function parseAsaasWebhook(body: unknown): {
  transactionId?: string
  status?: 'pending' | 'paid' | 'overdue' | 'cancelled' | 'refunded'
  paidAt?: Date
  amount?: number
} {
  const event = (body as { event?: string })?.event
  const payment = (body as { payment?: AsaasPaymentResponse })?.payment

  if (!payment?.id) {
    return {}
  }

  const mappedStatus = payment.status
    ? mapAsaasStatus(payment.status)
    : undefined

  const paidAt =
    payment.clientPaymentDate || payment.paymentDate
      ? new Date(payment.clientPaymentDate || payment.paymentDate!)
      : undefined

  // Em alguns eventos de estorno sem payment.status, usar o tipo de evento
  const fallbackStatus =
    event && event.startsWith('PAYMENT_REFUND')
      ? 'refunded'
      : event === 'PAYMENT_OVERDUE'
        ? 'overdue'
        : undefined

  return {
    transactionId: payment.id,
    status: mappedStatus || fallbackStatus,
    paidAt,
    amount: payment.value,
  }
}
