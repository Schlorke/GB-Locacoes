import { createAsaasBoleto, getAsaasPayment } from './asaas'

export interface BoletoGatewayResponse {
  transactionId: string
  barcode: string
  digitableLine: string
  dueDate: Date
  pdfUrl?: string
  instructions?: string[]
}

/**
 * Cliente genérico para geração de boletos
 * Pode delegar para gateways reais (Asaas, etc.) ou retornar um boleto direto
 */
export class BoletoGateway {
  private apiKey: string
  private apiSecret: string
  private environment: 'sandbox' | 'production'
  private gatewayType:
    | 'stripe'
    | 'pagseguro'
    | 'asaas'
    | 'mercadopago'
    | 'direct'

  constructor(config: {
    apiKey: string
    apiSecret: string
    environment?: 'sandbox' | 'production'
    gatewayType?: 'stripe' | 'pagseguro' | 'asaas' | 'mercadopago' | 'direct'
  }) {
    this.apiKey = config.apiKey
    this.apiSecret = config.apiSecret
    this.environment = config.environment || 'sandbox'
    this.gatewayType = config.gatewayType || 'direct'
    // Campos reservados para futuras integrações completas
    void this.apiSecret
    void this.environment
  }

  /**
   * Gera boleto bancário
   */
  async generateBoleto(data: {
    amount: number
    dueDate: Date
    description: string
    customerName: string
    customerDocument: string
    customerEmail: string
    metadata?: Record<string, unknown>
  }): Promise<BoletoGatewayResponse> {
    switch (this.gatewayType) {
      case 'asaas':
        return this.generateAsaasBoleto(data)
      case 'stripe':
        return this.generateStripeBoleto(data)
      case 'pagseguro':
        return this.generatePagSeguroBoleto(data)
      case 'mercadopago':
        return this.generateMercadoPagoBoleto(data)
      default:
        return this.generateDirectBoleto(data)
    }
  }

  /**
   * Verifica status de pagamento do boleto
   */
  async verifyPayment(transactionId: string): Promise<{
    status: 'pending' | 'paid' | 'overdue' | 'cancelled' | 'refunded'
    paidAt?: Date
    amount?: number
  }> {
    switch (this.gatewayType) {
      case 'asaas':
        return getAsaasPayment(transactionId, this.apiKey)
      default:
        return {
          status: 'pending',
        }
    }
  }

  /**
   * Gera boleto via Stripe (placeholder)
   */
  private async generateStripeBoleto(_data: {
    amount: number
    dueDate: Date
    description: string
    customerName: string
    customerDocument: string
    customerEmail: string
    metadata?: Record<string, unknown>
  }): Promise<BoletoGatewayResponse> {
    throw new Error('Stripe boleto integration not yet implemented')
  }

  /**
   * Gera boleto via PagSeguro (placeholder)
   */
  private async generatePagSeguroBoleto(_data: {
    amount: number
    dueDate: Date
    description: string
    customerName: string
    customerDocument: string
    customerEmail: string
    metadata?: Record<string, unknown>
  }): Promise<BoletoGatewayResponse> {
    throw new Error('PagSeguro boleto integration not yet implemented')
  }

  /**
   * Gera boleto via Asaas
   */
  private async generateAsaasBoleto(data: {
    amount: number
    dueDate: Date
    description: string
    customerName: string
    customerDocument: string
    customerEmail: string
    metadata?: Record<string, unknown>
  }): Promise<BoletoGatewayResponse> {
    const boleto = await createAsaasBoleto({
      amount: data.amount,
      dueDate: data.dueDate,
      description: data.description,
      customer: {
        name: data.customerName,
        document: data.customerDocument,
        email: data.customerEmail,
      },
      externalReference: data.metadata
        ? JSON.stringify(data.metadata)
        : undefined,
      apiKey: this.apiKey,
    })

    return boleto
  }

  /**
   * Gera boleto via Mercado Pago (placeholder)
   */
  private async generateMercadoPagoBoleto(_data: {
    amount: number
    dueDate: Date
    description: string
    customerName: string
    customerDocument: string
    customerEmail: string
    metadata?: Record<string, unknown>
  }): Promise<BoletoGatewayResponse> {
    throw new Error('Mercado Pago boleto integration not yet implemented')
  }

  /**
   * Gera boleto direto (mock)
   */
  private async generateDirectBoleto(data: {
    amount: number
    dueDate: Date
    description: string
    customerName: string
    customerDocument: string
    customerEmail: string
    metadata?: Record<string, unknown>
  }): Promise<BoletoGatewayResponse> {
    const transactionId = `BOL_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`

    const barcode = this.generateMockBarcode(data.amount, data.dueDate)
    const digitableLine = this.formatDigitableLine(barcode)

    return {
      transactionId,
      barcode,
      digitableLine,
      dueDate: data.dueDate,
      instructions: [
        'Não receber após o vencimento',
        'Em caso de dúvidas, entre em contato conosco',
      ],
    }
  }

  private generateMockBarcode(amount: number, dueDate: Date): string {
    const amountStr = Math.floor(amount * 100)
      .toString()
      .padStart(10, '0')
    const dateStr = this.formatDateForBarcode(dueDate)
    const random = Math.random().toString().slice(2, 12).padStart(10, '0')

    return `8${dateStr}${amountStr}${random}`.padEnd(44, '0')
  }

  private formatDigitableLine(barcode: string): string {
    const part1 = barcode.substring(0, 5)
    const part2 = barcode.substring(5, 10)
    const part3 = barcode.substring(10, 15)
    const part4 = barcode.substring(15, 21)
    const part5 = barcode.substring(21, 26)
    const part6 = barcode.substring(26, 32)
    const part7 = barcode.substring(32, 33)
    const part8 = barcode.substring(33, 44)

    return `${part1}.${part2} ${part3}.${part4} ${part5}.${part6} ${part7} ${part8}`
  }

  private formatDateForBarcode(date: Date): string {
    const baseDate = new Date(1997, 9, 7) // 7 de outubro de 1997
    const diffTime = date.getTime() - baseDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays.toString().padStart(7, '0')
  }
}

let boletoGatewayInstance: BoletoGateway | null = null

export function getBoletoGateway(): BoletoGateway {
  if (!boletoGatewayInstance) {
    const gatewayTypeEnv =
      (process.env.BOLETO_GATEWAY_TYPE as
        | 'stripe'
        | 'pagseguro'
        | 'asaas'
        | 'mercadopago'
        | 'direct') || (process.env.ASAAS_API_KEY ? 'asaas' : 'direct')

    boletoGatewayInstance = new BoletoGateway({
      apiKey: process.env.BOLETO_API_KEY || process.env.ASAAS_API_KEY || '',
      apiSecret: process.env.BOLETO_API_SECRET || '',
      environment:
        (process.env.BOLETO_ENVIRONMENT as 'sandbox' | 'production') ||
        'sandbox',
      gatewayType: gatewayTypeEnv,
    })
  }
  return boletoGatewayInstance
}
