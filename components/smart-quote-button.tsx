'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogHeaderIcon,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { CloseButton } from '@/components/ui/close-button'
import { useCartStore, type CartItem } from '@/stores/useCartStore'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export interface PricingOption {
  id: string
  label: string
  period: string
  multiplier: number
  discount: number
  popular?: boolean
}

interface SmartQuoteButtonProps {
  equipmentId: string
  equipmentName: string
  pricePerDay: number
  isAvailable: boolean
  selectedPeriod: PricingOption
  finalPrice: number
  maxStock?: number
  description?: string
  category?: {
    name: string
  }
  images?: string[]
  dailyDiscount?: number
  weeklyDiscount?: number
  biweeklyDiscount?: number
  monthlyDiscount?: number
  // Campos de valor direto
  dailyDirectValue?: number
  weeklyDirectValue?: number
  biweeklyDirectValue?: number
  monthlyDirectValue?: number
  // Campos de controle de método de preço
  dailyUseDirectValue?: boolean
  weeklyUseDirectValue?: boolean
  biweeklyUseDirectValue?: boolean
  monthlyUseDirectValue?: boolean
  startDate?: Date | null
  endDate?: Date | null
  selectedDays?: number
  /** Indica se finais de semana estão incluídos na contagem de dias */
  includeWeekends?: boolean
  /** Marca se a preferência de finais de semana já foi confirmada */
  weekendSelectionConfirmed?: boolean
  onWeekendSelectionConfirm?: (_includeWeekends: boolean) => void
  className?: string
  size?: 'sm' | 'lg' | 'default'
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'reset'
    | 'gradient'
    | 'link'
  children?: React.ReactNode
}

export function SmartQuoteButton({
  equipmentId,
  equipmentName,
  pricePerDay,
  isAvailable,
  selectedPeriod,
  finalPrice,
  maxStock,
  description,
  category,
  images,
  dailyDiscount,
  weeklyDiscount,
  biweeklyDiscount,
  monthlyDiscount,
  dailyDirectValue,
  weeklyDirectValue,
  biweeklyDirectValue,
  monthlyDirectValue,
  dailyUseDirectValue,
  weeklyUseDirectValue,
  biweeklyUseDirectValue,
  monthlyUseDirectValue,
  startDate,
  endDate,
  selectedDays,
  includeWeekends = false,
  weekendSelectionConfirmed = false,
  onWeekendSelectionConfirm,
  className,
  size = 'lg',
  variant = 'default',
  children = 'Solicitar Orçamento Grátis',
}: SmartQuoteButtonProps) {
  const { addItem } = useCartStore()
  const router = useRouter()
  const [isWeekendDialogOpen, setIsWeekendDialogOpen] = useState(false)

  const finalizeAdd = useCallback(
    (includeWeekendSelection: boolean) => {
      // Calcular dias: usar selectedDays se disponível, senão usar multiplier do período
      const days = selectedDays || selectedPeriod.multiplier

      // Preparar dados do equipamento selecionado
      const equipmentForQuote: CartItem = {
        equipmentId,
        equipmentName,
        pricePerDay,
        quantity: 1,
        days,
        selectedPeriod,
        finalPrice,
        maxStock,
        description,
        category,
        images,
        dailyDiscount,
        weeklyDiscount,
        biweeklyDiscount,
        monthlyDiscount,
        // Campos de valor direto
        dailyDirectValue,
        weeklyDirectValue,
        biweeklyDirectValue,
        monthlyDirectValue,
        // Campos de controle de método de preço
        dailyUseDirectValue,
        weeklyUseDirectValue,
        biweeklyUseDirectValue,
        monthlyUseDirectValue,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        includeWeekends: includeWeekendSelection,
        includeWeekendsConfirmed: true,
      }

      // Adicionar ao carrinho
      addItem(equipmentForQuote)

      // Navegar para página de orçamento
      router.push('/orcamento')
    },
    [
      equipmentId,
      equipmentName,
      pricePerDay,
      selectedPeriod,
      finalPrice,
      maxStock,
      description,
      category,
      images,
      dailyDiscount,
      weeklyDiscount,
      biweeklyDiscount,
      monthlyDiscount,
      dailyDirectValue,
      weeklyDirectValue,
      biweeklyDirectValue,
      monthlyDirectValue,
      dailyUseDirectValue,
      weeklyUseDirectValue,
      biweeklyUseDirectValue,
      monthlyUseDirectValue,
      startDate,
      endDate,
      selectedDays,
      addItem,
      router,
    ]
  )

  const handleQuoteRequest = useCallback(() => {
    if (!isAvailable) return

    const hasExplicitDates = Boolean(startDate && endDate)
    if (!hasExplicitDates && !weekendSelectionConfirmed) {
      setIsWeekendDialogOpen(true)
      return
    }

    finalizeAdd(includeWeekends)
  }, [
    isAvailable,
    startDate,
    endDate,
    includeWeekends,
    weekendSelectionConfirmed,
    finalizeAdd,
  ])

  const handleWeekendConfirmation = (includeWeekendSelection: boolean) => {
    onWeekendSelectionConfirm?.(includeWeekendSelection)
    setIsWeekendDialogOpen(false)
    finalizeAdd(includeWeekendSelection)
  }

  const handleWeekendCancel = () => {
    setIsWeekendDialogOpen(false)
  }

  if (!isAvailable) {
    return (
      <Button size={size} variant={variant} className={className} disabled>
        Equipamento Indisponível
      </Button>
    )
  }

  return (
    <>
      <Button
        size={size}
        variant={variant}
        className={className}
        onClick={handleQuoteRequest}
      >
        {children}
      </Button>

      <AlertDialog
        open={isWeekendDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleWeekendCancel()
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader className="relative pr-8">
            <CloseButton
              size="sm"
              variant="ghostWhite"
              className="absolute right-4 top-4"
              onClick={handleWeekendCancel}
              aria-label="Fechar dialog"
            />
            <AlertDialogHeaderIcon />
            <AlertDialogTitle>Incluir finais de semana?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="p-4 md:p-6">
            <AlertDialogDescription>
              Você está solicitando locação de <strong>{equipmentName}</strong>{' '}
              sem ter selecionado datas específicas no calendário.
              <br />
              <br />
              <strong>
                Deseja incluir os finais de semana na contagem de dias?
              </strong>
              <br />
              <br />
              <span className="text-sm text-muted-foreground">
                • <strong>Sim:</strong> Sábados e domingos serão contados como
                dias de locação
                <br />• <strong>Não:</strong> Apenas dias úteis (segunda a
                sexta) serão contados
              </span>
            </AlertDialogDescription>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleWeekendConfirmation(false)}>
              Não, apenas dias úteis
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleWeekendConfirmation(true)}>
              Sim, incluir finais de semana
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
