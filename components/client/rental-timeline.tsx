'use client'

import { CheckCircle, Clock, Package, Truck, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TimelineStep {
  id: string
  label: string
  status: 'completed' | 'current' | 'pending'
  date?: Date
  description?: string
}

interface RentalTimelineProps {
  steps: TimelineStep[]
  className?: string
}

export function RentalTimeline({ steps, className }: RentalTimelineProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Linha do Tempo
      </h3>
      <div className="relative">
        {/* Linha vertical */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step) => {
            const Icon = getStepIcon(step.id)

            return (
              <div key={step.id} className="relative flex items-start gap-4">
                {/* Ícone */}
                <div
                  className={cn(
                    'relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors',
                    step.status === 'completed' &&
                      'bg-green-500 border-green-500 text-white',
                    step.status === 'current' &&
                      'bg-orange-500 border-orange-500 text-white',
                    step.status === 'pending' &&
                      'bg-gray-200 border-gray-300 text-gray-400'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Conteúdo */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <p
                      className={cn(
                        'font-medium',
                        step.status === 'completed' && 'text-gray-900',
                        step.status === 'current' && 'text-orange-600',
                        step.status === 'pending' && 'text-gray-500'
                      )}
                    >
                      {step.label}
                    </p>
                    {step.date && (
                      <p className="text-sm text-gray-500">
                        {step.date.toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    )}
                  </div>
                  {step.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function getStepIcon(stepId: string) {
  switch (stepId) {
    case 'quote':
      return FileText
    case 'approved':
      return CheckCircle
    case 'boleto':
      return FileText
    case 'paid':
      return CheckCircle
    case 'checkout':
      return Truck
    case 'active':
      return Package
    case 'checkin':
      return Truck
    case 'completed':
      return CheckCircle
    default:
      return Clock
  }
}

/**
 * Gera steps da timeline baseado no status da locação
 */
export function generateTimelineSteps(rental: {
  status: string
  createdAt: Date
  checkOutAt?: Date | null
  checkInAt?: Date | null
  payments?: Array<{
    status: string
    method: string
    paidAt?: Date | null
    createdAt: Date
  }>
  quote?: {
    status: string
    approvedAt?: Date | null
  } | null
}): TimelineStep[] {
  const steps: TimelineStep[] = []

  // Step 1: Pedido/Orçamento
  steps.push({
    id: 'quote',
    label: 'Orçamento Criado',
    status: 'completed',
    date: rental.createdAt,
    description: 'Seu orçamento foi criado e está aguardando aprovação',
  })

  // Step 2: Aprovação
  if (rental.quote?.approvedAt) {
    steps.push({
      id: 'approved',
      label: 'Orçamento Aprovado',
      status: 'completed',
      date: rental.quote.approvedAt,
      description: 'Seu orçamento foi aprovado',
    })
  } else if (rental.status !== 'PENDING') {
    steps.push({
      id: 'approved',
      label: 'Orçamento Aprovado',
      status: 'completed',
      description: 'Orçamento foi aprovado',
    })
  }

  // Step 3: Boleto Gerado
  const boletoPayment = rental.payments?.find((p) => p.method === 'BOLETO')
  if (boletoPayment) {
    steps.push({
      id: 'boleto',
      label: 'Boleto Gerado',
      status: boletoPayment.status === 'PAID' ? 'completed' : 'current',
      date: boletoPayment.createdAt,
      description:
        boletoPayment.status === 'PAID'
          ? 'Boleto foi pago'
          : 'Aguardando pagamento do boleto',
    })
  }

  // Step 4: Pagamento Confirmado
  const paidPayment = rental.payments?.find((p) => p.status === 'PAID')
  if (paidPayment) {
    steps.push({
      id: 'paid',
      label: 'Pagamento Confirmado',
      status: 'completed',
      date: paidPayment.paidAt || paidPayment.createdAt,
      description: 'Pagamento foi confirmado',
    })
  }

  // Step 5: Check-out
  if (rental.checkOutAt) {
    steps.push({
      id: 'checkout',
      label: 'Equipamento Retirado',
      status: 'completed',
      date: rental.checkOutAt,
      description: 'Equipamento foi retirado e está em uso',
    })
  } else if (rental.status === 'ACTIVE') {
    steps.push({
      id: 'checkout',
      label: 'Equipamento Retirado',
      status: 'current',
      description: 'Equipamento está em uso',
    })
  }

  // Step 6: Locação Ativa
  if (rental.status === 'ACTIVE') {
    steps.push({
      id: 'active',
      label: 'Locação Ativa',
      status: 'current',
      description: 'Equipamento está em uso',
    })
  }

  // Step 7: Check-in
  if (rental.checkInAt) {
    steps.push({
      id: 'checkin',
      label: 'Equipamento Devolvido',
      status: 'completed',
      date: rental.checkInAt,
      description: 'Equipamento foi devolvido',
    })
  }

  // Step 8: Concluída
  if (rental.status === 'COMPLETED') {
    steps.push({
      id: 'completed',
      label: 'Locação Concluída',
      status: 'completed',
      date: rental.checkInAt || rental.createdAt,
      description: 'Locação foi finalizada',
    })
  }

  return steps
}
