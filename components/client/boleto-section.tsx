'use client'

import { BoletoDisplay } from '@/components/payment/boleto-display'
import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface BoletoSectionProps {
  payment: {
    id: string
    amount: number
    dueDate: Date
    status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED'
    metadata?: {
      barcode?: string
      digitableLine?: string
      pdfUrl?: string
      instructions?: string[]
    } | null
  }
  className?: string
}

export function BoletoSection({ payment, className }: BoletoSectionProps) {
  if (!payment.metadata?.barcode || !payment.metadata?.digitableLine) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Boleto não disponível</AlertTitle>
        <AlertDescription>
          Os dados do boleto não foram encontrados. Entre em contato com o
          suporte.
        </AlertDescription>
      </Alert>
    )
  }

  const isOverdue =
    payment.status === 'OVERDUE' ||
    (payment.status === 'PENDING' && new Date() > payment.dueDate)

  return (
    <div className={className}>
      {isOverdue && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Boleto Vencido</AlertTitle>
          <AlertDescription>
            Este boleto está vencido. Entre em contato para gerar um novo boleto
            ou regularizar o pagamento.
          </AlertDescription>
        </Alert>
      )}

      <BoletoDisplay
        barcode={payment.metadata.barcode}
        digitableLine={payment.metadata.digitableLine}
        amount={payment.amount}
        dueDate={payment.dueDate}
        status={payment.status}
        paymentId={payment.id}
        pdfUrl={payment.metadata.pdfUrl}
        instructions={payment.metadata.instructions}
      />
    </div>
  )
}
