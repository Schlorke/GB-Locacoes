'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check } from 'lucide-react'
import { AddressForm, type AddressData } from '@/components/ui/address-form'
import { toast } from 'sonner'
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
import { CloseButton } from '@/components/ui/close-button'
import { validateCPF, validateCNPJ } from '@/lib/utils/validation'
import { calculateFreight, type FreightOption } from '@/lib/freight-calculator'
import {
  calculateIntelligentPrice,
  getPricingConfig,
  sanitizeCartItemPricing,
} from '@/lib/pricing'
import { getAutoRentalDateRange } from '@/lib/rental-date-utils'
import { formatCurrency } from '@/lib/utils'
import { convertFormDataToWhatsApp, openWhatsAppQuote } from '@/lib/whatsapp'
import { useCartStore, type CartItem } from '@/stores/useCartStore'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Loader2,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
  User,
  MapPin,
  Truck,
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'

interface Equipment {
  id: string
  name: string
  description: string
  pricePerDay: number
  images?: string[]
  category: {
    name: string
  }
  isAvailable: boolean
  maxStock?: number
  // Campos de desconto
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
  popularPeriod?: string
}

interface QuoteFormData {
  name: string
  email: string
  phone: string
  cpf: string
  cnpj: string
  cep: string
  company: string
  message: string
  deliveryType?: 'DELIVERY' | 'PICKUP'
  deliveryAddress?: AddressData
}

function QuotePage() {
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const {
    items: selectedEquipments,
    removeItem,
    updateItemQuantity,
    updateItemDays,
    updateItemIncludeWeekends,
    hydrateItems,
    clearCart,
  } = useCartStore()
  const [displayedItems, setDisplayedItems] = useState<CartItem[]>([])

  // Sincronizar itens exibidos com o store
  useEffect(() => {
    setDisplayedItems(selectedEquipments)
  }, [selectedEquipments])

  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cnpj: '',
    cep: '',
    company: '',
    message: '',
    deliveryType: undefined,
    deliveryAddress: undefined,
  })

  // Preencher dados do usuário logado
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || session.user?.name || '',
        email: prev.email || session.user?.email || '',
      }))
    }
  }, [session])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [freightOptions, setFreightOptions] = useState<FreightOption[]>([])
  const [selectedFreight, setSelectedFreight] = useState<string | null>(null)
  const [isCalculatingFreight, setIsCalculatingFreight] = useState(false)
  const [availabilityErrors, setAvailabilityErrors] = useState<
    Record<string, string>
  >({})
  const hasSyncedCartPricing = useRef(false)
  const scrollUnlockInitialized = useRef(false)
  const requestReferenceDate = useRef(new Date())
  // Estado para controlar confirmação de finais de semana
  const [pendingWeekendConfirmation, setPendingWeekendConfirmation] = useState<{
    equipmentId: string
    equipmentName: string
  } | null>(null)
  const [pendingSubmitEvent, setPendingSubmitEvent] =
    useState<React.FormEvent | null>(null)

  // Neutraliza o scroll-lock do Radix (RemoveScroll) que injeta data-scroll-locked no body
  useEffect(() => {
    if (scrollUnlockInitialized.current || typeof document === 'undefined')
      return
    scrollUnlockInitialized.current = true

    const unlock = () => {
      const body = document.body
      if (body.hasAttribute('data-scroll-locked')) {
        body.removeAttribute('data-scroll-locked')
      }
      body.style.pointerEvents = ''
      body.style.overflow = ''
      body.style.position = ''
      body.style.marginRight = ''
      body.style.paddingRight = ''
      body.style.setProperty('--removed-body-scroll-bar-size', '0')

      document
        .querySelectorAll(
          'style[data-rs], style[data-rs-scroll], style[data-rs-scrollbar]'
        )
        .forEach((node) => node.parentElement?.removeChild(node))
    }

    const observer = new MutationObserver(unlock)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-scroll-locked', 'style'],
    })

    unlock()

    return () => {
      observer.disconnect()
    }
  })

  // Helper para formatar datas (trata Date ou string do localStorage)
  const formatDate = useCallback((date: Date | string | undefined): string => {
    if (!date) return ''
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isNaN(dateObj.getTime())) return ''
    return format(dateObj, 'dd/MM/yyyy', { locale: ptBR })
  }, [])

  const resolveDateRange = (equipment: CartItem) => {
    if (equipment.startDate && equipment.endDate) {
      const startDate =
        equipment.startDate instanceof Date
          ? equipment.startDate
          : new Date(equipment.startDate)
      const endDate =
        equipment.endDate instanceof Date
          ? equipment.endDate
          : new Date(equipment.endDate)

      return { startDate, endDate, isAuto: false }
    }

    const days = Number(equipment.days) || 1
    const includeWeekends = equipment.includeWeekends ?? false
    const { startDate, endDate } = getAutoRentalDateRange({
      requestDate: requestReferenceDate.current,
      days,
      includeWeekends,
    })

    return { startDate, endDate, isAuto: true }
  }

  // Função para formatar telefone brasileiro
  const formatPhoneNumber = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '')

    // Aplica a formatação baseada no tamanho
    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }
  }

  // Função para formatar CPF brasileiro
  const formatCPF = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '')

    // Aplica a formatação baseada no tamanho
    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    } else if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    } else {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
    }
  }

  // Função para formatar CNPJ brasileiro
  const formatCNPJ = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '')

    // Aplica a formatação baseada no tamanho
    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
    } else if (numbers.length <= 12) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
    } else {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
    }
  }

  // Função para lidar com mudanças no campo de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }))
  }

  // Função para lidar com mudanças no campo de CPF
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    setFormData((prev) => ({
      ...prev,
      cpf: formatted,
    }))
  }

  // Função para lidar com mudanças no campo de CNPJ
  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value)
    setFormData((prev) => ({
      ...prev,
      cnpj: formatted,
    }))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Removido: lógica de processamento do contexto - agora usamos diretamente o store

  const fetchEquipmentAndAdd = useCallback(async (equipmentId: string) => {
    try {
      const response = await fetch(`/api/equipments`)
      const data = await response.json()
      const equipments = Array.isArray(data) ? data : []
      const equipment = equipments.find(
        (eq: Equipment) => eq.id === equipmentId
      )

      if (equipment) {
        console.log('🔍 EQUIPMENT FROM API:', {
          name: equipment.name,
          weeklyDiscount: equipment.weeklyDiscount,
          weeklyDirectValue: equipment.weeklyDirectValue,
          weeklyUseDirectValue: equipment.weeklyUseDirectValue,
        })

        const price = Number(equipment.pricePerDay) || 0
        const equipmentToAdd = sanitizeCartItemPricing({
          equipmentId: equipment.id,
          equipmentName: equipment.name,
          pricePerDay: price,
          quantity: 1,
          days: 1,
          description: equipment.description,
          category: equipment.category,
          images: equipment.images,
          maxStock: equipment.maxStock || 1,
          // Descontos percentuais
          dailyDiscount: equipment.dailyDiscount || 0,
          weeklyDiscount: equipment.weeklyDiscount || 0,
          biweeklyDiscount: equipment.biweeklyDiscount || 0,
          monthlyDiscount: equipment.monthlyDiscount || 0,
          // Valores diretos
          dailyDirectValue: equipment.dailyDirectValue || 0,
          weeklyDirectValue: equipment.weeklyDirectValue || 0,
          biweeklyDirectValue: equipment.biweeklyDirectValue || 0,
          monthlyDirectValue: equipment.monthlyDirectValue || 0,
          // Flags de uso de valor direto
          dailyUseDirectValue: equipment.dailyUseDirectValue || false,
          weeklyUseDirectValue: equipment.weeklyUseDirectValue || false,
          biweeklyUseDirectValue: equipment.biweeklyUseDirectValue || false,
          monthlyUseDirectValue: equipment.monthlyUseDirectValue || false,
        })

        console.log('🔍 EQUIPMENT TO ADD TO CART:', {
          name: equipmentToAdd.equipmentName,
          weeklyDiscount: equipmentToAdd.weeklyDiscount,
          weeklyDirectValue: equipmentToAdd.weeklyDirectValue,
          weeklyUseDirectValue: equipmentToAdd.weeklyUseDirectValue,
        })

        // Usar o store para adicionar o item
        useCartStore.getState().addItem(equipmentToAdd)
      }
    } catch {
      // Error handled silently for user experience
    }
  }, [])

  useEffect(() => {
    const equipmentId = searchParams.get('equipmentId')
    if (equipmentId) {
      fetchEquipmentAndAdd(equipmentId)
    }
  }, [searchParams, fetchEquipmentAndAdd])

  // Sincroniza itens persistidos para garantir que descontos e valores diretos reflitam o estado atual do catálogo
  useEffect(() => {
    if (hasSyncedCartPricing.current || selectedEquipments.length === 0) {
      return
    }

    hasSyncedCartPricing.current = true

    const syncCartPricing = async () => {
      try {
        const response = await fetch('/api/equipments')
        if (!response.ok) {
          return
        }

        const equipments: Equipment[] = await response.json()
        if (!Array.isArray(equipments) || equipments.length === 0) {
          return
        }

        const equipmentMap = new Map<string, Equipment>(
          equipments.map((equipment) => [equipment.id, equipment])
        )

        const updatedItems = selectedEquipments.map((item) => {
          const equipment = equipmentMap.get(item.equipmentId)
          if (!equipment) return sanitizeCartItemPricing(item)

          // Preservar dados críticos que já estão corretos no item (como valor direto e flags)
          // para evitar flash de valores incorretos durante a sincronização
          const sanitizedItem = sanitizeCartItemPricing({
            ...item,
            pricePerDay: Number(equipment.pricePerDay) || item.pricePerDay,
            // Priorizar valores do item atual se já estiverem configurados corretamente
            dailyDiscount: equipment.dailyDiscount ?? item.dailyDiscount ?? 0,
            weeklyDiscount:
              equipment.weeklyDiscount ?? item.weeklyDiscount ?? 0,
            biweeklyDiscount:
              equipment.biweeklyDiscount ?? item.biweeklyDiscount ?? 0,
            monthlyDiscount:
              equipment.monthlyDiscount ?? item.monthlyDiscount ?? 0,
            // Valores diretos: usar do equipamento (fonte de verdade), mas preservar se já estiver no item
            dailyDirectValue:
              Number(
                equipment.dailyDirectValue ?? item.dailyDirectValue ?? 0
              ) || 0,
            weeklyDirectValue:
              Number(
                equipment.weeklyDirectValue ?? item.weeklyDirectValue ?? 0
              ) || 0,
            biweeklyDirectValue:
              Number(
                equipment.biweeklyDirectValue ?? item.biweeklyDirectValue ?? 0
              ) || 0,
            monthlyDirectValue:
              Number(
                equipment.monthlyDirectValue ?? item.monthlyDirectValue ?? 0
              ) || 0,
            // Flags de uso de valor direto: priorizar equipamento (fonte de verdade)
            dailyUseDirectValue:
              equipment.dailyUseDirectValue ??
              item.dailyUseDirectValue ??
              false,
            weeklyUseDirectValue:
              equipment.weeklyUseDirectValue ??
              item.weeklyUseDirectValue ??
              false,
            biweeklyUseDirectValue:
              equipment.biweeklyUseDirectValue ??
              item.biweeklyUseDirectValue ??
              false,
            monthlyUseDirectValue:
              equipment.monthlyUseDirectValue ??
              item.monthlyUseDirectValue ??
              false,
          })

          return sanitizedItem
        })

        // Atualizar apenas se houver mudanças significativas para evitar re-renders desnecessários
        hydrateItems(updatedItems)
      } catch (error) {
        console.error('Failed to sync cart pricing', error)
      }
    }

    void syncCartPricing()
  }, [selectedEquipments, hydrateItems])

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    const item = selectedEquipments.find((eq) => eq.equipmentId === id)
    if (item) {
      const maxStock = item.maxStock || 999
      const limitedQuantity = Math.min(quantity, maxStock)
      updateItemQuantity(id, limitedQuantity)
    }
  }

  const updateDays = (id: string, days: number) => {
    if (days < 1) return
    updateItemDays(id, days)
  }

  const removeEquipment = (id: string) => {
    // Marca o item como removendo na lista exibida (inicia animação)
    setDisplayedItems((prev) =>
      prev.map((item) =>
        item.equipmentId === id ? { ...item, isRemoving: true } : item
      )
    )

    // Remove do store e da lista exibida após a animação completar
    setTimeout(() => {
      removeItem(id)
      setDisplayedItems((prev) =>
        prev.filter((item) => item.equipmentId !== id)
      )
    }, 300) // Duração da animação de fade out (sincronizada com container)
  }

  const calculateSubtotal = (equipment: CartItem) => {
    const quantity = Number(equipment.quantity) || 1
    const days = Number(equipment.days) || 1

    // Usar a nova lógica inteligente para calcular o preço
    const intelligentPrice = calculateIntelligentPrice(equipment, days)

    return intelligentPrice * quantity
  }

  const calculateTotal = () => {
    const equipmentTotal = selectedEquipments.reduce(
      (total, eq) => total + calculateSubtotal(eq),
      0
    )
    const freightTotal =
      selectedFreight && freightOptions.length > 0
        ? freightOptions.find((opt) => opt.id === selectedFreight)?.price || 0
        : 0
    return equipmentTotal + freightTotal
  }

  // Calcular frete quando endereço e tipo de entrega estiverem definidos
  useEffect(() => {
    const calculateFreightAsync = async () => {
      if (
        formData.deliveryType === 'DELIVERY' &&
        formData.deliveryAddress?.cep &&
        selectedEquipments.length > 0
      ) {
        setIsCalculatingFreight(true)
        try {
          // CEP da GB Locações (Porto Alegre) - pode ser configurável
          const fromCEP = '90000-000' // CEP padrão da empresa
          const result = await calculateFreight({
            fromCEP,
            toCEP: formData.deliveryAddress.cep,
            equipmentIds: selectedEquipments.map((eq) => eq.equipmentId),
            quantities: selectedEquipments.map((eq) => eq.quantity),
          })
          setFreightOptions(result.shippingOptions)
          if (result.shippingOptions.length > 0 && !selectedFreight) {
            setSelectedFreight(result.shippingOptions[0]!.id)
          }
        } catch (error) {
          console.error('Erro ao calcular frete:', error)
          toast.error('Erro ao calcular frete')
        } finally {
          setIsCalculatingFreight(false)
        }
      } else {
        setFreightOptions([])
        setSelectedFreight(null)
      }
    }

    void calculateFreightAsync()
  }, [
    formData.deliveryType,
    formData.deliveryAddress?.cep,
    selectedEquipments,
    selectedFreight,
  ])

  // Validar disponibilidade quando itens do carrinho mudarem (usando datas individuais de cada item)
  useEffect(() => {
    const validateAvailability = async () => {
      if (selectedEquipments.length > 0) {
        const errors: Record<string, string> = {}

        for (const equipment of selectedEquipments) {
          // Só validar se o equipamento tiver datas definidas
          if (!equipment.startDate || !equipment.endDate) {
            continue
          }

          try {
            const response = await fetch(
              `/api/equipments/${equipment.equipmentId}/availability?startDate=${equipment.startDate instanceof Date ? equipment.startDate.toISOString() : new Date(equipment.startDate).toISOString()}&endDate=${equipment.endDate instanceof Date ? equipment.endDate.toISOString() : new Date(equipment.endDate).toISOString()}`
            )
            if (response.ok) {
              const data = await response.json()
              const availability = data.availability

              if (!availability || typeof availability !== 'object') {
                // Se não houver dados de disponibilidade, não bloquear
                continue
              }

              // Verificar disponibilidade para cada dia do período
              const startDate =
                equipment.startDate instanceof Date
                  ? equipment.startDate
                  : new Date(equipment.startDate)
              const endDate =
                equipment.endDate instanceof Date
                  ? equipment.endDate
                  : new Date(equipment.endDate)
              const currentDate = new Date(startDate)
              let minAvailable = Infinity
              let hasUnavailableDay = false

              while (currentDate <= endDate) {
                const dateKey = currentDate.toISOString().split('T')[0]!
                const dayAvailability = availability[dateKey]

                if (!dayAvailability || !dayAvailability.available) {
                  hasUnavailableDay = true
                  const dateStr = currentDate.toLocaleDateString('pt-BR')
                  errors[equipment.equipmentId] =
                    `Equipamento indisponível em ${dateStr}`
                  break
                }

                if (dayAvailability.availableQuantity < equipment.quantity) {
                  minAvailable = Math.min(
                    minAvailable,
                    dayAvailability.availableQuantity
                  )
                }

                currentDate.setDate(currentDate.getDate() + 1)
              }

              if (
                !hasUnavailableDay &&
                minAvailable < equipment.quantity &&
                minAvailable !== Infinity
              ) {
                errors[equipment.equipmentId] =
                  `Apenas ${minAvailable} unidade(s) disponível(is) em algumas datas do período. Solicitado: ${equipment.quantity}`
              }
            }
          } catch (error) {
            console.error(
              `Erro ao verificar disponibilidade de ${equipment.equipmentId}:`,
              error
            )
          }
        }

        setAvailabilityErrors(errors)
      } else {
        setAvailabilityErrors({})
      }
    }

    void validateAvailability()
  }, [selectedEquipments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação de TODOS os campos obrigatórios (validação dupla para segurança)
    const missingFields: string[] = []
    const fieldIds: string[] = []

    if (!formData.name || !formData.name.trim()) {
      missingFields.push('Nome Completo')
      fieldIds.push('name')
    }

    if (!formData.phone || !formData.phone.trim()) {
      missingFields.push('Telefone')
      fieldIds.push('phone')
    }

    if (!formData.email || !formData.email.trim()) {
      missingFields.push('E-mail')
      fieldIds.push('email')
    }

    // Se há campos faltantes, mostrar toast informativa
    if (missingFields.length > 0) {
      const fieldsList = missingFields.join(', ')
      toast.info('Campos Obrigatórios', {
        description: `Por favor, preencha os seguintes campos antes de enviar: ${fieldsList}.`,
        duration: 6000,
      })

      // Focar no primeiro campo faltante
      if (fieldIds.length > 0) {
        const firstField = document.getElementById(fieldIds[0]!)
        if (firstField) {
          firstField.focus()
          firstField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
      return
    }

    // Validação: pelo menos um dos campos CPF ou CNPJ deve ser preenchido
    if (!formData.cpf.trim() && !formData.cnpj.trim()) {
      toast.error('Erro de Validação', {
        description: 'Por favor, preencha pelo menos o CPF ou CNPJ.',
      })
      return
    }

    // Validação: CPF/CNPJ válidos
    if (formData.cpf.trim() && !validateCPF(formData.cpf)) {
      toast.error('Erro de Validação', {
        description: 'CPF inválido. Por favor, verifique o número.',
      })
      return
    }

    if (formData.cnpj.trim() && !validateCNPJ(formData.cnpj)) {
      toast.error('Erro de Validação', {
        description: 'CNPJ inválido. Por favor, verifique o número.',
      })
      return
    }

    // Validação: Se tem CNPJ, deve ter empresa
    if (formData.cnpj.trim() && !formData.company.trim()) {
      toast.error('Erro de Validação', {
        description: 'Empresa é obrigatória quando CNPJ é informado.',
      })
      return
    }

    // Validação: Verificar se todos os equipamentos têm pelo menos o número de dias definido
    // Datas específicas (startDate/endDate) são opcionais - se não existirem, usa-se apenas o campo days
    const itemsWithoutPeriod = selectedEquipments.filter(
      (eq) => !eq.days || eq.days < 1
    )
    if (itemsWithoutPeriod.length > 0) {
      toast.error('Erro de Validação', {
        description: `Alguns equipamentos não têm período de locação definido. Por favor, defina o número de dias para cada equipamento.`,
      })
      return
    }

    // Validação: Se tipo é DELIVERY, deve ter endereço
    if (formData.deliveryType === 'DELIVERY' && !formData.deliveryAddress) {
      toast.error('Erro de Validação', {
        description: 'Endereço de entrega é obrigatório para entrega.',
      })
      return
    }

    // Validação: Verificar disponibilidade se houver erros
    if (Object.keys(availabilityErrors).length > 0) {
      toast.error('Erro de Disponibilidade', {
        description:
          'Um ou mais equipamentos não estão disponíveis nas datas selecionadas.',
      })
      return
    }

    // Validação: Verificar se há equipamentos sem datas selecionadas
    // Isso acontece quando o usuário não usou o calendário na página de detalhes
    // Se não há datas e a preferência de finais de semana não foi confirmada,
    // devemos confirmar antes de enviar
    const itemsNeedingWeekendConfirmation = selectedEquipments.filter((eq) => {
      const hasNoDates = !eq.startDate || !eq.endDate
      const needsConfirmation = !eq.includeWeekendsConfirmed
      return hasNoDates && needsConfirmation
    })

    if (itemsNeedingWeekendConfirmation.length > 0) {
      // Mostrar toast informativo e então abrir dialog de confirmação
      const firstItem = itemsNeedingWeekendConfirmation[0]!
      toast.info('Confirmação Necessária', {
        description: `Precisamos confirmar se o uso aos finais de semana está incluído para "${firstItem.equipmentName}".`,
        duration: 4000,
      })

      // Guardar o evento de submit para continuar depois da confirmação
      setPendingSubmitEvent(e)
      setPendingWeekendConfirmation({
        equipmentId: firstItem.equipmentId,
        equipmentName: firstItem.equipmentName,
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          cpf: formData.cpf.trim() || undefined,
          cnpj: formData.cnpj.trim() || undefined,
          cep: formData.cep.trim() || undefined,
          customerCompany: formData.company.trim() || undefined,
          message: formData.message.trim() || undefined,
          deliveryType: formData.deliveryType,
          deliveryAddress: formData.deliveryAddress
            ? {
                cep: formData.deliveryAddress.cep,
                logradouro: formData.deliveryAddress.logradouro,
                numero: formData.deliveryAddress.numero,
                complemento: formData.deliveryAddress.complemento,
                bairro: formData.deliveryAddress.bairro,
                cidade: formData.deliveryAddress.cidade,
                estado: formData.deliveryAddress.estado,
              }
            : undefined,
          items: selectedEquipments.map((eq) => {
            const days = Number(eq.days) || 1
            const quantity = Number(eq.quantity) || 1

            // Converter datas para formato ISO se existirem
            const startDate = eq.startDate
              ? eq.startDate instanceof Date
                ? eq.startDate
                : new Date(eq.startDate)
              : undefined
            const endDate = eq.endDate
              ? eq.endDate instanceof Date
                ? eq.endDate
                : new Date(eq.endDate)
              : undefined

            // A API espera equipmentId, quantity, days e opcionalmente startDate/endDate por item
            // Os cálculos de preço são feitos no backend
            return {
              equipmentId: eq.equipmentId,
              quantity: quantity,
              days: days,
              startDate: startDate?.toISOString(),
              endDate: endDate?.toISOString(),
              includeWeekends: eq.includeWeekends || false,
            }
          }),
        }),
      })

      if (response.ok) {
        // Limpar query parameters da URL
        if (
          typeof window !== 'undefined' &&
          window.history &&
          window.history.replaceState
        ) {
          window.history.replaceState({}, '', window.location.pathname)
        }

        toast.success('Orçamento Enviado com Sucesso! 🎉', {
          description:
            'Entraremos em contato em até 2 horas úteis. Você receberá uma cópia no seu email.',
          duration: 8000,
        })
        clearCart()
        setFormData({
          name: '',
          email: '',
          phone: '',
          cpf: '',
          cnpj: '',
          cep: '',
          company: '',
          message: '',
          deliveryType: undefined,
          deliveryAddress: undefined,
        })
        setFreightOptions([])
        setSelectedFreight(null)
        setAvailabilityErrors({})
      } else {
        // Tentar ler a resposta de erro do servidor
        let errorMessage = 'Erro ao enviar orçamento. Tente novamente.'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
        } catch {
          // Se não conseguir ler JSON, usar mensagem padrão
        }
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error)
      toast.error('Erro', {
        description:
          error instanceof Error
            ? error.message
            : 'Erro ao enviar orçamento. Tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handler para confirmar uso em finais de semana
  const handleWeekendConfirmation = async (includeWeekends: boolean) => {
    if (!pendingWeekendConfirmation) return

    const equipmentId = pendingWeekendConfirmation.equipmentId
    const submitEvent = pendingSubmitEvent

    // Atualizar o item no carrinho com a escolha do usuário
    updateItemIncludeWeekends(equipmentId, includeWeekends)

    // Limpar estado de confirmação pendente
    setPendingWeekendConfirmation(null)
    setPendingSubmitEvent(null)

    // Se havia um submit pendente, tentar novamente após um pequeno delay
    // para garantir que o estado do carrinho foi atualizado
    if (submitEvent) {
      // Aguardar um frame para garantir que o estado foi atualizado
      await new Promise((resolve) => setTimeout(resolve, 150))
      // Criar um novo evento simulado para evitar problemas de recursão
      const syntheticEvent = {
        ...submitEvent,
        preventDefault: () => {},
      } as React.FormEvent
      void handleSubmit(syntheticEvent)
    }
  }

  // Handler para cancelar confirmação de finais de semana
  const handleWeekendConfirmationCancel = () => {
    setPendingWeekendConfirmation(null)
    setPendingSubmitEvent(null)
    toast.info('Confirmação cancelada', {
      description:
        'Por favor, confirme se deseja incluir finais de semana antes de enviar a solicitação.',
    })
  }

  const _handleWhatsAppSubmit = () => {
    // Validação: pelo menos um dos campos CPF ou CNPJ deve ser preenchido
    if (!formData.cpf.trim() && !formData.cnpj.trim()) {
      toast.error('Erro de Validação', {
        description: 'Por favor, preencha pelo menos o CPF ou CNPJ.',
      })
      return
    }

    // Validação: campos obrigatórios
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      toast.error('Erro de Validação', {
        description: 'Por favor, preencha todos os campos obrigatórios.',
      })
      return
    }

    try {
      // Converter dados para formato WhatsApp
      const whatsappData = convertFormDataToWhatsApp(
        formData,
        selectedEquipments.map((eq) => ({
          name: eq.equipmentName,
          quantity: eq.quantity,
          days: eq.days,
          pricePerDay: Number(eq.pricePerDay),
          finalPrice: calculateSubtotal(eq),
          id: eq.equipmentId,
          discount: (() => {
            const pricingConfig = getPricingConfig(eq, eq.days)
            if (pricingConfig.discount && pricingConfig.discount > 0) {
              return {
                type: 'percentage' as const,
                value: pricingConfig.discount,
                period:
                  pricingConfig.period === 'daily'
                    ? 'diário'
                    : pricingConfig.period === 'weekly'
                      ? 'semanal'
                      : pricingConfig.period === 'biweekly'
                        ? 'quinzenal'
                        : pricingConfig.period === 'monthly'
                          ? 'mensal'
                          : 'diário',
              }
            }
            return undefined
          })(),
        }))
      )

      // Abrir WhatsApp com mensagem formatada
      openWhatsAppQuote(whatsappData, '555198205163') // Número da GB Locações

      toast.success('Orçamento Preparado! 📱', {
        description: 'WhatsApp aberto com sua solicitação formatada.',
      })
    } catch (error) {
      console.error('Erro ao preparar mensagem WhatsApp:', error)
      toast.error('Erro', {
        description: 'Erro ao preparar mensagem para WhatsApp.',
      })
    }
  }

  const getEquipmentImage = (equipment: CartItem) => {
    if (
      equipment.images &&
      equipment.images.length > 0 &&
      equipment.images[0] &&
      equipment.images[0].trim() !== ''
    ) {
      return equipment.images[0]
    }
    return `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(equipment.equipmentName)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header com gradiente - seguindo padrão da página de equipamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            {/* Clean depth layers without decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                Solicitar Orçamento
              </h1>
              <p className="text-orange-50 mb-4 font-medium">
                Configure seu orçamento e receba nossa melhor proposta
              </p>
              <div className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit mx-auto">
                <ShoppingCart className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  {selectedEquipments.length} equipamentos selecionados
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Equipamentos Selecionados - Coluna Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6 lg:space-y-8"
          >
            <motion.div
              animate={{
                height: 'auto',
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                {/* Clean depth layers for equipment card */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

                <CardHeader className="relative z-10 p-4 sm:p-6 lg:p-6">
                  <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900">
                    <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 text-orange-600" />
                    Equipamentos Selecionados ({selectedEquipments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 p-4 sm:p-6 lg:p-6 pt-0">
                  {selectedEquipments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-base font-medium">
                        Nenhum equipamento selecionado
                      </p>
                      <p className="text-small text-gray-400 mt-2">
                        Você pode solicitar um orçamento geral ou{' '}
                        <Link
                          href="/equipamentos"
                          className="text-orange-600 hover:text-orange-700 underline"
                        >
                          navegar pelos equipamentos
                        </Link>{' '}
                        para adicionar itens específicos
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {displayedItems.map((equipment) => {
                          const imageUrl = getEquipmentImage(equipment)
                          const displayRange = resolveDateRange(equipment)
                          // Verificar se o item está sendo removido
                          const isRemoving =
                            'isRemoving' in equipment
                              ? (
                                  equipment as CartItem & {
                                    isRemoving: boolean
                                  }
                                ).isRemoving
                              : false
                          return (
                            <motion.div
                              key={equipment.equipmentId}
                              initial={false}
                              animate={false}
                              exit={{
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.3,
                              }}
                              className={`relative overflow-hidden border-0 bg-white rounded-lg p-4 shadow-lg transition-all duration-300 ${
                                isRemoving
                                  ? 'pointer-events-none'
                                  : 'hover:shadow-xl hover:scale-[1.01]'
                              }`}
                            >
                              {/* Clean depth layers for equipment item card */}
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-100/20"></div>
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-gray-50/30"></div>

                              {/* Conteúdo do item */}
                              <motion.div
                                className="relative z-10 flex flex-col sm:flex-row gap-4"
                                animate={
                                  isRemoving
                                    ? {
                                        opacity: 0,
                                        scale: 0.95,
                                        y: -5,
                                      }
                                    : {
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                      }
                                }
                                transition={{
                                  duration: 0.5,
                                  ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                              >
                                {/* Imagem */}
                                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mx-auto sm:mx-0 shadow-sm flex items-center justify-center">
                                  <Image
                                    src={imageUrl || '/placeholder.svg'}
                                    alt={equipment.equipmentName}
                                    width={80}
                                    height={80}
                                    priority
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement
                                      target.src = `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(equipment.equipmentName)}`
                                    }}
                                  />
                                </div>

                                {/* Informações do Equipamento */}
                                <div className="flex-1 min-w-0">
                                  <div className="text-center sm:text-left">
                                    <h3 className="font-semibold text-lg truncate">
                                      {equipment.equipmentName}
                                    </h3>
                                    <div className="flex flex-wrap gap-1 justify-center sm:justify-start mb-2">
                                      {equipment.category && (
                                        <Badge
                                          variant="secondary"
                                          className="text-sm rounded-full"
                                        >
                                          {equipment.category.name}
                                        </Badge>
                                      )}
                                      {(() => {
                                        const pricingConfig = getPricingConfig(
                                          equipment,
                                          equipment.days
                                        )
                                        const actualPeriodLabel =
                                          pricingConfig.period === 'daily'
                                            ? 'Diário'
                                            : pricingConfig.period === 'weekly'
                                              ? 'Semanal'
                                              : pricingConfig.period ===
                                                  'biweekly'
                                                ? 'Quinzenal'
                                                : pricingConfig.period ===
                                                    'monthly'
                                                  ? 'Mensal'
                                                  : 'Diário'

                                        return (
                                          <Badge
                                            variant="outline"
                                            className="text-sm rounded-full border-orange-200 text-orange-700 bg-orange-50 font-medium"
                                          >
                                            {actualPeriodLabel}
                                            {pricingConfig.useDirectValue ? (
                                              <span className="ml-1 font-semibold">
                                                Valor Fixo
                                              </span>
                                            ) : (pricingConfig.discount || 0) >
                                              0 ? (
                                              <span className="ml-1 font-semibold">
                                                -{pricingConfig.discount}%
                                              </span>
                                            ) : null}
                                          </Badge>
                                        )
                                      })()}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-3">
                                      {(() => {
                                        const pricingConfig = getPricingConfig(
                                          equipment,
                                          equipment.days
                                        )
                                        const calculatedPrice =
                                          calculateIntelligentPrice(
                                            equipment,
                                            equipment.days
                                          )
                                        // Só calcular originalPrice se realmente for mostrar (desconto, não valor direto)
                                        const shouldShowOriginalPrice =
                                          !pricingConfig.useDirectValue &&
                                          (pricingConfig.discount || 0) > 0
                                        const originalPrice =
                                          shouldShowOriginalPrice
                                            ? Number(equipment.pricePerDay) *
                                              equipment.days
                                            : 0
                                        const actualPeriodLabel =
                                          pricingConfig.period === 'daily'
                                            ? 'diário'
                                            : pricingConfig.period === 'weekly'
                                              ? 'semanal'
                                              : pricingConfig.period ===
                                                  'biweekly'
                                                ? 'quinzenal'
                                                : pricingConfig.period ===
                                                    'monthly'
                                                  ? 'mensal'
                                                  : 'diário'
                                        const showDiscount =
                                          !pricingConfig.useDirectValue &&
                                          (pricingConfig.discount || 0) > 0
                                        const showDirect =
                                          pricingConfig.useDirectValue && true

                                        return (
                                          <div>
                                            {showDiscount &&
                                              originalPrice > 0 && (
                                                <div className="text-sm text-gray-500 line-through">
                                                  {formatCurrency(
                                                    originalPrice
                                                  )}
                                                </div>
                                              )}
                                            <div>
                                              <span className="font-semibold text-green-600 text-base">
                                                {formatCurrency(
                                                  calculatedPrice
                                                )}
                                              </span>
                                              <span className="text-xs text-gray-500 ml-1">
                                                total ({equipment.days} dias)
                                              </span>
                                            </div>
                                            {showDirect ? (
                                              <div className="text-xs text-orange-700 font-medium">
                                                Valor direto {actualPeriodLabel}
                                                :{' '}
                                                {formatCurrency(
                                                  pricingConfig.directValue || 0
                                                )}
                                                {pricingConfig.multiplier > 1
                                                  ? ` / ${pricingConfig.multiplier} dias`
                                                  : ''}
                                              </div>
                                            ) : showDiscount ? (
                                              <div className="text-xs text-green-600 font-medium">
                                                ✓ Desconto {actualPeriodLabel}{' '}
                                                aplicado: -
                                                {pricingConfig.discount}%
                                              </div>
                                            ) : null}
                                          </div>
                                        )
                                      })()}
                                    </div>
                                    {/* Informações de datas e finais de semana */}
                                    {displayRange && (
                                      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-x-3 sm:gap-y-1 mt-3">
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                          <span className="font-medium text-gray-700">
                                            Período:
                                          </span>
                                          <span>
                                            {formatDate(displayRange.startDate)}{' '}
                                            até{' '}
                                            {formatDate(displayRange.endDate)}
                                            {displayRange.isAuto && (
                                              <span className="text-[10px] text-gray-500">
                                                {' '}
                                                (previsto)
                                              </span>
                                            )}
                                          </span>
                                        </div>
                                        {equipment.includeWeekends && (
                                          <div className="flex items-center gap-1.5 text-xs">
                                            <span className="text-green-600 font-semibold">
                                              ✓
                                            </span>
                                            <span className="text-gray-600 font-medium">
                                              Incluir finais de semana
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    {/* Erros de disponibilidade */}
                                    {availabilityErrors[
                                      equipment.equipmentId
                                    ] && (
                                      <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded mt-2">
                                        <span className="font-semibold">
                                          ⚠️
                                        </span>
                                        <span>
                                          {
                                            availabilityErrors[
                                              equipment.equipmentId
                                            ]
                                          }
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Controles - Layout Responsivo */}
                                  <div className="flex flex-row gap-4 max-[1170px]:flex-col mt-4">
                                    {/* Controle de Quantidade */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                      <Label className="text-sm font-medium text-gray-700 text-center sm:text-left sm:w-20">
                                        Quantidade:
                                      </Label>
                                      <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-2">
                                        <div className="flex items-center justify-center gap-2">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              updateQuantity(
                                                equipment.equipmentId,
                                                equipment.quantity - 1
                                              )
                                            }
                                            disabled={equipment.quantity <= 1}
                                            className="h-8 w-8 p-0 flex-shrink-0"
                                          >
                                            <Minus className="h-3 w-3" />
                                          </Button>
                                          <Input
                                            type="number"
                                            value={equipment.quantity}
                                            onChange={(e) =>
                                              updateQuantity(
                                                equipment.equipmentId,
                                                Number.parseInt(
                                                  e.target.value
                                                ) || 1
                                              )
                                            }
                                            className="w-12 h-8 text-center font-medium [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                            min="1"
                                            max={equipment.maxStock || 999}
                                          />
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              updateQuantity(
                                                equipment.equipmentId,
                                                equipment.quantity + 1
                                              )
                                            }
                                            disabled={
                                              equipment.quantity >=
                                              (equipment.maxStock || 999)
                                            }
                                            className="h-8 w-8 p-0 flex-shrink-0"
                                          >
                                            <Plus className="h-3 w-3" />
                                          </Button>
                                        </div>
                                        {equipment.maxStock &&
                                          equipment.maxStock < 999 && (
                                            <span className="text-xs text-gray-500 sm:ml-2">
                                              Max: {equipment.maxStock}{' '}
                                              disponível
                                            </span>
                                          )}
                                      </div>
                                    </div>

                                    {/* Controle de Período */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                      <Label className="text-sm font-medium text-gray-700 text-center sm:text-left">
                                        Dias:
                                      </Label>
                                      <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-2">
                                        <div className="flex items-center justify-center gap-2">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              const currentValue =
                                                equipment.days
                                              const newValue = Math.max(
                                                1,
                                                currentValue - 1
                                              )
                                              const days = newValue
                                              updateDays(
                                                equipment.equipmentId,
                                                days
                                              )
                                            }}
                                            className="h-8 w-8 p-0 flex-shrink-0"
                                          >
                                            <Minus className="h-3 w-3" />
                                          </Button>
                                          <Input
                                            type="number"
                                            value={equipment.days}
                                            onChange={(e) => {
                                              const periods =
                                                Number.parseInt(
                                                  e.target.value
                                                ) || 1
                                              const days = periods
                                              updateDays(
                                                equipment.equipmentId,
                                                days
                                              )
                                            }}
                                            className="w-12 h-8 text-center font-medium [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                            min="1"
                                          />
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              const currentValue =
                                                equipment.days
                                              const newValue = currentValue + 1
                                              const days = newValue
                                              updateDays(
                                                equipment.equipmentId,
                                                days
                                              )
                                            }}
                                            className="h-8 w-8 p-0 flex-shrink-0"
                                          >
                                            <Plus className="h-3 w-3" />
                                          </Button>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 whitespace-nowrap sm:ml-2">
                                          ({equipment.days} dias)
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Preço e Ações */}
                                <div className="text-center sm:text-right flex-shrink-0">
                                  <p className="text-base font-semibold text-primary mb-2">
                                    {formatCurrency(
                                      calculateSubtotal(equipment)
                                    )}
                                  </p>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        removeEquipment(equipment.equipmentId)
                                      }
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </motion.div>
                                </div>
                              </motion.div>
                            </motion.div>
                          )
                        })}
                      </AnimatePresence>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Formulário de Contato - SEMPRE VISÍVEL */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              {/* Clean depth layers for contact card */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10 p-4 sm:p-6 lg:p-6">
                <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900">
                  <User className="h-6 w-6 sm:h-7 sm:w-7 text-orange-600" />
                  Dados para Contato
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Preencha seus dados para receber o orçamento personalizado
                </p>
              </CardHeader>
              <CardContent className="relative z-10 p-4 sm:p-6 lg:p-6 pt-0">
                <form
                  id="quote-form"
                  onSubmit={(e) => {
                    e.preventDefault()

                    // Validação de TODOS os campos obrigatórios
                    const missingFields: string[] = []
                    const fieldIds: string[] = []

                    if (!formData.name || !formData.name.trim()) {
                      missingFields.push('Nome Completo')
                      fieldIds.push('name')
                    }

                    if (!formData.phone || !formData.phone.trim()) {
                      missingFields.push('Telefone')
                      fieldIds.push('phone')
                    }

                    if (!formData.email || !formData.email.trim()) {
                      missingFields.push('E-mail')
                      fieldIds.push('email')
                    }

                    // Se há campos faltantes, mostrar toast informativa
                    if (missingFields.length > 0) {
                      const fieldsList = missingFields.join(', ')
                      toast.info('Campos Obrigatórios', {
                        description: `Por favor, preencha os seguintes campos antes de enviar: ${fieldsList}.`,
                        duration: 6000,
                      })

                      // Focar no primeiro campo faltante
                      if (fieldIds.length > 0) {
                        const firstField = document.getElementById(fieldIds[0]!)
                        if (firstField) {
                          firstField.focus()
                          firstField.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          })
                        }
                      }
                      return
                    }

                    // Se passou nas validações, chama o handleSubmit normal
                    void handleSubmit(e)
                  }}
                  className="space-y-4"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="mt-1"
                        placeholder="(51) 99999-9999"
                        maxLength={15}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={handleCPFChange}
                        className="mt-1"
                        placeholder="000.000.000-00"
                        maxLength={14}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={formData.cnpj}
                        onChange={handleCNPJChange}
                        className="mt-1"
                        placeholder="00.000.000/0000-00"
                        maxLength={18}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="mt-1"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Empresa/Construtora</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        className="mt-1"
                        placeholder="Nome da empresa (se PJ)"
                      />
                    </div>
                  </div>

                  {/* Tipo de Entrega */}
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4" />
                      Tipo de Entrega/Retirada
                    </Label>
                    <Select
                      value={formData.deliveryType}
                      onValueChange={(value: 'DELIVERY' | 'PICKUP') =>
                        setFormData((prev) => ({
                          ...prev,
                          deliveryType: value,
                          deliveryAddress:
                            value === 'PICKUP'
                              ? undefined
                              : prev.deliveryAddress,
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o tipo de entrega" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PICKUP">Retirada na Loja</SelectItem>
                        <SelectItem value="DELIVERY">
                          Entrega no Endereço
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Endereço de Entrega */}
                  {formData.deliveryType === 'DELIVERY' && (
                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" />
                        Endereço de Entrega
                      </Label>
                      <AddressForm
                        value={
                          formData.deliveryAddress || {
                            cep: '',
                            logradouro: '',
                            numero: '',
                            complemento: '',
                            bairro: '',
                            cidade: '',
                            estado: '',
                          }
                        }
                        onChange={(address) =>
                          setFormData((prev) => ({
                            ...prev,
                            deliveryAddress: address,
                          }))
                        }
                        required
                      />
                    </div>
                  )}

                  {/* Seleção de Frete */}
                  {formData.deliveryType === 'DELIVERY' &&
                    freightOptions.length > 0 && (
                      <div>
                        <Label
                          htmlFor="freight"
                          className="flex items-center gap-2 mb-2"
                        >
                          <Truck className="h-4 w-4" />
                          Opções de Frete
                        </Label>
                        {isCalculatingFreight ? (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Calculando frete...
                          </div>
                        ) : (
                          <Select
                            modal={false}
                            value={selectedFreight || undefined}
                            onValueChange={setSelectedFreight}
                          >
                            <SelectTrigger className="mt-1 h-auto min-h-[3.5rem] py-3 px-4 [&>span]:line-clamp-none [&>span]:block [&>span]:w-full">
                              <SelectValue placeholder="Selecione uma opção de frete" />
                            </SelectTrigger>
                            <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
                              {freightOptions.map((option) => (
                                <SelectItem
                                  key={option.id}
                                  value={option.id}
                                  className="py-3 pl-4 pr-2 [&>span:first-child]:hidden"
                                >
                                  <div className="flex flex-col gap-1.5 w-full">
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-sm leading-tight">
                                        {option.name}
                                      </span>
                                      <SelectPrimitive.ItemIndicator className="inline-flex items-center justify-center flex-shrink-0">
                                        <Check className="h-4 w-4 text-orange-600" />
                                      </SelectPrimitive.ItemIndicator>
                                    </div>
                                    <span className="text-sm text-gray-600 leading-tight text-left">
                                      {option.company} •{' '}
                                      {formatCurrency(option.price)}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    )}

                  <div>
                    <Label htmlFor="message">Observações</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Descreva seu projeto, local de entrega, prazo necessário, etc."
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resumo do Pedido - Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="lg:sticky lg:top-24 overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              {/* Clean depth layers for summary card */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10 p-4 sm:p-6 lg:p-6">
                <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900">
                  <Package className="h-6 w-6 sm:h-7 sm:w-7 text-orange-600" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4 p-4 sm:p-6 lg:p-6 pt-0">
                {selectedEquipments.length > 0 ? (
                  <>
                    {selectedEquipments.map((equipment, index) => {
                      const displayRange = resolveDateRange(equipment)

                      return (
                        <div
                          key={`summary-${equipment.equipmentId}-${index}`}
                          className="space-y-1 pb-3"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 pr-2">
                              <p className="font-medium text-gray-900 text-sm leading-tight">
                                {equipment.equipmentName}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <span className="text-sm text-gray-600 font-medium">
                                  Qtd: {equipment.quantity}x
                                </span>
                                {(() => {
                                  const pricingConfig = getPricingConfig(
                                    equipment,
                                    equipment.days
                                  )
                                  const actualPeriodLabel =
                                    pricingConfig.period === 'daily'
                                      ? 'Diário'
                                      : pricingConfig.period === 'weekly'
                                        ? 'Semanal'
                                        : pricingConfig.period === 'biweekly'
                                          ? 'Quinzenal'
                                          : pricingConfig.period === 'monthly'
                                            ? 'Mensal'
                                            : 'Diário'
                                  const showDiscount =
                                    !pricingConfig.useDirectValue &&
                                    (pricingConfig.discount || 0) > 0
                                  const showDirect =
                                    pricingConfig.useDirectValue && true

                                  return (
                                    <>
                                      <span className="text-sm text-gray-400">
                                        ·
                                      </span>
                                      <span className="text-sm text-orange-600 font-medium">
                                        {actualPeriodLabel}
                                        {showDirect ? ' – valor direto' : ''}
                                      </span>
                                      <span className="text-sm text-gray-400">
                                        ·
                                      </span>
                                      <span className="text-sm text-gray-600 font-medium">
                                        {equipment.days} dias
                                      </span>
                                      {showDirect ? (
                                        <span className="text-sm text-orange-700 font-semibold">
                                          Valor direto:{' '}
                                          {formatCurrency(
                                            pricingConfig.directValue || 0
                                          )}
                                          {pricingConfig.multiplier > 1
                                            ? ` / ${pricingConfig.multiplier} dias`
                                            : ''}
                                        </span>
                                      ) : showDiscount ? (
                                        <span className="text-sm text-green-600 font-semibold">
                                          Desc. {actualPeriodLabel}: -
                                          {pricingConfig.discount}%
                                        </span>
                                      ) : null}
                                    </>
                                  )
                                })()}
                              </div>
                              {/* Informações de datas e finais de semana */}
                              {displayRange && (
                                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-x-3 sm:gap-y-1 mt-1">
                                  <div className="text-xs text-gray-600">
                                    {formatDate(displayRange.startDate)} até{' '}
                                    {formatDate(displayRange.endDate)}
                                    {displayRange.isAuto && (
                                      <span className="text-[10px] text-gray-500">
                                        {' '}
                                        (previsto)
                                      </span>
                                    )}
                                  </div>
                                  {equipment.includeWeekends && (
                                    <div className="flex items-center gap-1.5 text-xs">
                                      <span className="text-green-600 font-semibold">
                                        ✓
                                      </span>
                                      <span className="text-gray-600 font-medium">
                                        Incluir finais de semana
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              {(() => {
                                const pricingConfig = getPricingConfig(
                                  equipment,
                                  equipment.days
                                )
                                const finalPrice = calculateSubtotal(equipment)
                                const showDiscount =
                                  !pricingConfig.useDirectValue &&
                                  (pricingConfig.discount || 0) > 0
                                // Só calcular originalPrice se realmente for mostrar (desconto, não valor direto)
                                const originalPrice = showDiscount
                                  ? Number(equipment.pricePerDay) *
                                    equipment.days *
                                    equipment.quantity
                                  : 0

                                return (
                                  <div>
                                    {showDiscount && originalPrice > 0 && (
                                      <div className="text-sm text-gray-500 line-through">
                                        {formatCurrency(originalPrice)}
                                      </div>
                                    )}
                                    <div className="font-semibold text-green-600 text-base">
                                      {formatCurrency(finalPrice)}
                                    </div>
                                  </div>
                                )
                              })()}
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-900 font-medium">
                          {formatCurrency(
                            selectedEquipments.reduce(
                              (total, eq) => total + calculateSubtotal(eq),
                              0
                            )
                          )}
                        </span>
                      </div>
                      {selectedFreight && freightOptions.length > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Frete:</span>
                          <span className="text-gray-900 font-medium">
                            {formatCurrency(
                              freightOptions.find(
                                (opt) => opt.id === selectedFreight
                              )?.price || 0
                            )}
                          </span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-primary text-xl">
                          {formatCurrency(calculateTotal())}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      *Valor estimado. Orçamento final pode variar conforme
                      condições específicas.
                    </p>

                    {/* Botão Principal - Solicitar Orçamento */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        form="quote-form"
                        className="w-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        size="lg"
                        disabled={isSubmitting}
                        onClick={(e) => {
                          // Validação de TODOS os campos obrigatórios ANTES do submit
                          const missingFields: string[] = []
                          const fieldIds: string[] = []

                          if (!formData.name || !formData.name.trim()) {
                            missingFields.push('Nome Completo')
                            fieldIds.push('name')
                          }

                          if (!formData.phone || !formData.phone.trim()) {
                            missingFields.push('Telefone')
                            fieldIds.push('phone')
                          }

                          if (!formData.email || !formData.email.trim()) {
                            missingFields.push('E-mail')
                            fieldIds.push('email')
                          }

                          // Se há campos faltantes, mostrar toast informativa
                          if (missingFields.length > 0) {
                            e.preventDefault()
                            const fieldsList = missingFields.join(', ')
                            toast.info('Campos Obrigatórios', {
                              description: `Por favor, preencha os seguintes campos antes de enviar: ${fieldsList}.`,
                              duration: 6000,
                            })

                            // Focar no primeiro campo faltante
                            if (fieldIds.length > 0) {
                              const firstField = document.getElementById(
                                fieldIds[0]!
                              )
                              if (firstField) {
                                firstField.focus()
                                firstField.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'center',
                                })
                              }
                            }
                          }
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          'Enviar Solicitação'
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm text-gray-500">Orçamento Geral</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Receberá proposta personalizada por email
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Dialog de confirmação de finais de semana */}
      <AlertDialog
        open={pendingWeekendConfirmation !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleWeekendConfirmationCancel()
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader className="relative pr-8">
            <CloseButton
              size="sm"
              variant="ghostWhite"
              className="absolute right-4 top-4"
              onClick={handleWeekendConfirmationCancel}
              aria-label="Fechar dialog"
            />
            <AlertDialogHeaderIcon />
            <AlertDialogTitle>Incluir finais de semana?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="p-4 md:p-6">
            <AlertDialogDescription>
              Você está solicitando locação de{' '}
              <strong>
                {pendingWeekendConfirmation?.equipmentName ||
                  'este equipamento'}
              </strong>{' '}
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
            <AlertDialogCancel onClick={handleWeekendConfirmationCancel}>
              Não, apenas dias úteis
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleWeekendConfirmation(true)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Sim, incluir finais de semana
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default function QuotePageWrapper() {
  return (
    <Suspense fallback={null}>
      <QuotePage />
    </Suspense>
  )
}
