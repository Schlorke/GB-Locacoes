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
import { useQuote } from '@/contexts/quote-context'
import { toast } from '@/hooks/use-toast'
import { formatCurrency } from '@/lib/utils'
import { convertFormDataToWhatsApp, openWhatsAppQuote } from '@/lib/whatsapp'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Package, Plus, ShoppingCart, Trash2, User } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useState } from 'react'

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

interface SelectedEquipment extends Equipment {
  quantity: number
  days: number
  selectedPeriod?: {
    id: string
    label: string
    period: string
    multiplier: number
    discount: number
    popular?: boolean
  }
  finalPrice?: number
  dailyDiscount?: number
  weeklyDiscount?: number
  biweeklyDiscount?: number
  monthlyDiscount?: number
}

interface QuoteFormData {
  name: string
  email: string
  phone: string
  cpf: string
  cnpj: string
  cep: string
  message: string
}

function QuotePage() {
  const searchParams = useSearchParams()
  const { selectedEquipmentForQuote, clearSelection } = useQuote()
  const [selectedEquipments, setSelectedEquipments] = useState<
    SelectedEquipment[]
  >([])
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cnpj: '',
    cep: '',
    message: '',
  })
  // Removido: estado de isSubmitting não utilizado

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

  // Função para formatar CEP brasileiro
  const formatCEP = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '')

    // Aplica a formatação baseada no tamanho
    if (numbers.length <= 5) {
      return numbers
    } else {
      return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
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

  // Função para lidar com mudanças no campo de CEP
  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value)
    setFormData((prev) => ({
      ...prev,
      cep: formatted,
    }))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Efeito para processar equipamento do contexto
  useEffect(() => {
    if (selectedEquipmentForQuote) {
      const equipmentToAdd: SelectedEquipment = {
        id: selectedEquipmentForQuote.equipmentId,
        name: selectedEquipmentForQuote.equipmentName,
        description: selectedEquipmentForQuote.description || '',
        pricePerDay: selectedEquipmentForQuote.pricePerDay,
        category: selectedEquipmentForQuote.category || { name: '' },
        isAvailable: true,
        quantity: selectedEquipmentForQuote.quantity,
        days: selectedEquipmentForQuote.selectedPeriod.multiplier,
        selectedPeriod: selectedEquipmentForQuote.selectedPeriod,
        finalPrice: selectedEquipmentForQuote.finalPrice,
        maxStock: selectedEquipmentForQuote.maxStock,
        images: selectedEquipmentForQuote.images,
        dailyDiscount: selectedEquipmentForQuote.dailyDiscount,
        weeklyDiscount: selectedEquipmentForQuote.weeklyDiscount,
        biweeklyDiscount: selectedEquipmentForQuote.biweeklyDiscount,
        monthlyDiscount: selectedEquipmentForQuote.monthlyDiscount,
      }

      setSelectedEquipments((prev) => {
        const exists = prev.find(
          (eq) => eq.id === selectedEquipmentForQuote.equipmentId
        )
        if (exists) {
          // Atualizar equipamento existente com nova configuração
          return prev.map((eq) =>
            eq.id === selectedEquipmentForQuote.equipmentId
              ? { ...eq, ...equipmentToAdd }
              : eq
          )
        }
        return [...prev, equipmentToAdd]
      })

      // Limpar seleção do contexto após processar
      clearSelection()
    }
  }, [selectedEquipmentForQuote, clearSelection])

  const fetchEquipmentAndAdd = useCallback(
    async (equipmentId: string) => {
      try {
        const response = await fetch(`/api/equipments`)
        const data = await response.json()
        const equipments = Array.isArray(data) ? data : []
        const equipment = equipments.find(
          (eq: Equipment) => eq.id === equipmentId
        )

        if (equipment) {
          setSelectedEquipments((prev) => {
            const safePrev = Array.isArray(prev) ? prev : []
            // Verificar se o equipamento já existe
            const exists = safePrev.find((eq) => eq.id === equipmentId)
            if (exists) {
              return safePrev // Não adicionar duplicados
            }

            const price = Number(equipment.pricePerDay) || 0
            const equipmentToAdd = {
              ...equipment,
              pricePerDay: price,
              quantity: 1,
              days: 1,
              // Incluir campos de desconto e valor direto
              dailyDiscount: equipment.dailyDiscount || 0,
              weeklyDiscount: equipment.weeklyDiscount || 0,
              biweeklyDiscount: equipment.biweeklyDiscount || 0,
              monthlyDiscount: equipment.monthlyDiscount || 0,
              // Incluir campos de valor direto
              dailyDirectValue: equipment.dailyDirectValue || 0,
              weeklyDirectValue: equipment.weeklyDirectValue || 0,
              biweeklyDirectValue: equipment.biweeklyDirectValue || 0,
              monthlyDirectValue: equipment.monthlyDirectValue || 0,
              // Incluir campos de controle de método de preço
              dailyUseDirectValue: equipment.dailyUseDirectValue || false,
              weeklyUseDirectValue: equipment.weeklyUseDirectValue || false,
              biweeklyUseDirectValue: equipment.biweeklyUseDirectValue || false,
              monthlyUseDirectValue: equipment.monthlyUseDirectValue || false,
              popularPeriod: equipment.popularPeriod || 'weekly',
              maxStock: equipment.maxStock || 1,
            }
            return [...safePrev, equipmentToAdd]
          })
        }
      } catch {
        // Error handled silently for user experience
      }
    },
    [] // Remover selectedEquipments da dependência para evitar loop
  )

  useEffect(() => {
    const equipmentId = searchParams.get('equipmentId')
    if (equipmentId) {
      fetchEquipmentAndAdd(equipmentId)
    }
  }, [searchParams, fetchEquipmentAndAdd])

  // Função inteligente para determinar preço baseado nas configurações do admin
  const getIntelligentPricing = (
    equipment: SelectedEquipment,
    totalDays: number
  ) => {
    // Definir configurações de período em ordem de prioridade (maior para menor)
    const periodConfigs = [
      {
        threshold: 30,
        period: 'monthly',
        multiplier: 30,
        discount: equipment.monthlyDiscount || 0,
        directValue: equipment.monthlyDirectValue || 0,
        useDirectValue: equipment.monthlyUseDirectValue || false,
      },
      {
        threshold: 15,
        period: 'biweekly',
        multiplier: 15,
        discount: equipment.biweeklyDiscount || 0,
        directValue: equipment.biweeklyDirectValue || 0,
        useDirectValue: equipment.biweeklyUseDirectValue || false,
      },
      {
        threshold: 7,
        period: 'weekly',
        multiplier: 7,
        discount: equipment.weeklyDiscount || 0,
        directValue: equipment.weeklyDirectValue || 0,
        useDirectValue: equipment.weeklyUseDirectValue || false,
      },
      {
        threshold: 1,
        period: 'daily',
        multiplier: 1,
        discount: equipment.dailyDiscount || 0,
        directValue: equipment.dailyDirectValue || 0,
        useDirectValue: equipment.dailyUseDirectValue || false,
      },
    ]

    // Encontrar a configuração apropriada baseada nos dias
    const selectedConfig =
      periodConfigs.find((config) => totalDays >= config.threshold) ||
      periodConfigs[3] // fallback para daily

    return {
      ...selectedConfig,
      days: selectedConfig?.threshold || 1,
    }
  }

  // Função inteligente para calcular preço final
  const calculateIntelligentPrice = (
    equipment: SelectedEquipment,
    totalDays: number
  ) => {
    const pricingConfig = getIntelligentPricing(equipment, totalDays)

    // Se usar valor direto, calcular de forma proporcional
    if (
      pricingConfig.useDirectValue &&
      pricingConfig.directValue !== undefined &&
      pricingConfig.directValue !== null
    ) {
      if (pricingConfig.directValue === 0) {
        // Se valor direto é 0, usar esse valor (equipamento gratuito no período)
        return 0
      }

      // Calcular quantos períodos completos + dias restantes
      const multiplier = pricingConfig.multiplier || 1
      const completePeriods = Math.floor(totalDays / multiplier)
      const remainingDays = totalDays % multiplier

      let totalPrice = completePeriods * pricingConfig.directValue

      // Para dias restantes, usar valor proporcional do período
      if (remainingDays > 0) {
        const proportionalValue =
          (pricingConfig.directValue / multiplier) * remainingDays
        totalPrice += proportionalValue
      }

      return totalPrice
    }

    // Se usar desconto percentual, calcular com desconto
    const basePrice = equipment.pricePerDay * totalDays
    const discount = pricingConfig.discount || 0
    const discountAmount = basePrice * (discount / 100)
    return basePrice - discountAmount
  }

  // Função para recalcular preço final usando lógica inteligente
  const recalculateFinalPrice = (
    equipment: SelectedEquipment,
    newDays: number
  ) => {
    // Usar a nova função inteligente de cálculo
    return calculateIntelligentPrice(equipment, newDays)
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setSelectedEquipments((prev) => {
      const safePrev = Array.isArray(prev) ? prev : []
      return safePrev.map((eq) => {
        if (eq.id === id) {
          // Limit quantity to maxStock (default to 999 if not specified)
          const maxStock = eq.maxStock || 999
          const limitedQuantity = Math.min(quantity, maxStock)

          // Recalcular finalPrice se necessário
          const updatedEquipment = { ...eq, quantity: limitedQuantity }
          if (eq.selectedPeriod) {
            updatedEquipment.finalPrice = recalculateFinalPrice(eq, eq.days)
          }

          return updatedEquipment
        }
        return eq
      })
    })
  }

  const updateDays = (id: string, days: number) => {
    if (days < 1) return
    setSelectedEquipments((prev) => {
      const safePrev = Array.isArray(prev) ? prev : []
      return safePrev.map((eq) => {
        if (eq.id === id) {
          const updatedEquipment = { ...eq, days }

          // Recalcular finalPrice com os novos dias
          if (eq.selectedPeriod) {
            updatedEquipment.finalPrice = recalculateFinalPrice(eq, days)
          }

          return updatedEquipment
        }
        return eq
      })
    })
  }

  const removeEquipment = (id: string) => {
    setSelectedEquipments((prev) => {
      const safePrev = Array.isArray(prev) ? prev : []
      return safePrev.filter((eq) => eq.id !== id)
    })
  }

  const calculateSubtotal = (equipment: SelectedEquipment) => {
    const quantity = Number(equipment.quantity) || 1
    const days = Number(equipment.days) || 1

    // Usar a nova lógica inteligente para calcular o preço
    const intelligentPrice = calculateIntelligentPrice(equipment, days)

    return intelligentPrice * quantity
  }

  const calculateTotal = () => {
    return selectedEquipments.reduce(
      (total, eq) => total + calculateSubtotal(eq),
      0
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação: pelo menos um dos campos CPF ou CNPJ deve ser preenchido
    if (!formData.cpf.trim() && !formData.cnpj.trim()) {
      toast({
        title: 'Erro de Validação',
        description: 'Por favor, preencha pelo menos o CPF ou CNPJ.',
        variant: 'destructive',
      })
      return
    }

    // início envio (estado visual não utilizado)

    try {
      const safeSelectedEquipments = Array.isArray(selectedEquipments)
        ? selectedEquipments
        : []
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          equipments: safeSelectedEquipments.map((eq) => ({
            equipmentId: eq.id,
            quantity: eq.quantity,
            days: eq.days,
          })),
          total: calculateTotal(),
        }),
      })

      if (response.ok) {
        toast({
          title: 'Sucesso!',
          description:
            'Orçamento enviado com sucesso. Entraremos em contato em breve.',
        })
        setSelectedEquipments([])
        setFormData({
          name: '',
          email: '',
          phone: '',
          cpf: '',
          cnpj: '',
          cep: '',
          message: '',
        })
      } else {
        throw new Error('Erro ao enviar orçamento')
      }
    } catch {
      toast({
        title: 'Erro',
        description: 'Erro ao enviar orçamento. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      // fim envio (estado visual não utilizado)
    }
  }

  const handleWhatsAppSubmit = () => {
    // Validação: pelo menos um dos campos CPF ou CNPJ deve ser preenchido
    if (!formData.cpf.trim() && !formData.cnpj.trim()) {
      toast({
        title: 'Erro de Validação',
        description: 'Por favor, preencha pelo menos o CPF ou CNPJ.',
        variant: 'destructive',
      })
      return
    }

    // Validação: campos obrigatórios
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      toast({
        title: 'Erro de Validação',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }

    try {
      const safeSelectedEquipments = Array.isArray(selectedEquipments)
        ? selectedEquipments
        : []

      // Converter dados para formato WhatsApp
      const whatsappData = convertFormDataToWhatsApp(
        formData,
        safeSelectedEquipments.map((eq) => ({
          name: eq.name,
          quantity: eq.quantity,
          days: eq.days,
          pricePerDay: Number(eq.pricePerDay),
          finalPrice: calculateSubtotal(eq),
          id: eq.id,
          discount: (() => {
            const pricingConfig = getIntelligentPricing(eq, eq.days)
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

      toast({
        title: 'Orçamento Preparado! 📱',
        description: 'WhatsApp aberto com sua solicitação formatada.',
      })
    } catch (error) {
      console.error('Erro ao preparar mensagem WhatsApp:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao preparar mensagem para WhatsApp.',
        variant: 'destructive',
      })
    }
  }

  const getEquipmentImage = (equipment: Equipment) => {
    if (
      equipment.images &&
      equipment.images.length > 0 &&
      equipment.images[0] &&
      equipment.images[0].trim() !== ''
    ) {
      return equipment.images[0]
    }
    return `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(equipment.name)}`
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
                    <AnimatePresence>
                      {Array.isArray(selectedEquipments) &&
                        selectedEquipments.map((equipment, index) => {
                          const imageUrl = getEquipmentImage(equipment)
                          return (
                            <motion.div
                              key={`equipment-${equipment.id}-${index}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ delay: index * 0.05 }}
                              className="relative overflow-hidden border-0 bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                            >
                              {/* Clean depth layers for equipment item card */}
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-100/20"></div>
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-gray-50/30"></div>
                              <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                                {/* Imagem */}
                                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mx-auto sm:mx-0 shadow-sm flex items-center justify-center">
                                  <Image
                                    src={imageUrl || '/placeholder.svg'}
                                    alt={equipment.name}
                                    width={80}
                                    height={80}
                                    priority
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement
                                      target.src = `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(equipment.name)}`
                                    }}
                                  />
                                </div>

                                {/* Informações do Equipamento */}
                                <div className="flex-1 min-w-0">
                                  <div className="text-center sm:text-left">
                                    <h3 className="font-semibold text-lg truncate">
                                      {equipment.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-1 justify-center sm:justify-start mb-2">
                                      <Badge
                                        variant="secondary"
                                        className="text-sm rounded-full"
                                      >
                                        {equipment.category.name}
                                      </Badge>
                                      {(() => {
                                        const pricingConfig =
                                          getIntelligentPricing(
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
                                      {equipment.finalPrice ? (
                                        (() => {
                                          const pricingConfig =
                                            getIntelligentPricing(
                                              equipment,
                                              equipment.days
                                            )
                                          const originalPrice =
                                            Number(equipment.pricePerDay) *
                                            equipment.days
                                          const actualPeriodLabel =
                                            pricingConfig.period === 'daily'
                                              ? 'diário'
                                              : pricingConfig.period ===
                                                  'weekly'
                                                ? 'semanal'
                                                : pricingConfig.period ===
                                                    'biweekly'
                                                  ? 'quinzenal'
                                                  : pricingConfig.period ===
                                                      'monthly'
                                                    ? 'mensal'
                                                    : 'diário'

                                          return (
                                            <div>
                                              {(pricingConfig.discount || 0) >
                                                0 && (
                                                <div className="text-sm text-gray-500 line-through">
                                                  {formatCurrency(
                                                    originalPrice
                                                  )}
                                                </div>
                                              )}
                                              <div>
                                                <span className="font-semibold text-green-600 text-base">
                                                  {formatCurrency(
                                                    equipment.finalPrice
                                                  )}
                                                </span>
                                                <span className="text-xs text-gray-500 ml-1">
                                                  total ({equipment.days} dias)
                                                </span>
                                              </div>
                                              {(pricingConfig.discount || 0) >
                                                0 && (
                                                <div className="text-xs text-green-600 font-medium">
                                                  ✓ Desconto {actualPeriodLabel}{' '}
                                                  aplicado: -
                                                  {pricingConfig.discount}%
                                                </div>
                                              )}
                                            </div>
                                          )
                                        })()
                                      ) : (
                                        <span>
                                          {formatCurrency(
                                            Number(equipment.pricePerDay) || 0
                                          )}
                                          /dia
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Controles - Layout Responsivo */}
                                  <div className="flex flex-row gap-4 max-[1170px]:flex-col">
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
                                                equipment.id,
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
                                                equipment.id,
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
                                                equipment.id,
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
                                        {equipment.selectedPeriod
                                          ? 'Períodos:'
                                          : 'Dias:'}
                                      </Label>
                                      <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-2">
                                        <div className="flex items-center justify-center gap-2">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              const currentValue =
                                                equipment.selectedPeriod
                                                  ? Math.ceil(
                                                      equipment.days /
                                                        equipment.selectedPeriod
                                                          .multiplier
                                                    )
                                                  : equipment.days
                                              const newValue = Math.max(
                                                1,
                                                currentValue - 1
                                              )
                                              const days =
                                                equipment.selectedPeriod
                                                  ? newValue *
                                                    equipment.selectedPeriod
                                                      .multiplier
                                                  : newValue
                                              updateDays(equipment.id, days)
                                            }}
                                            className="h-8 w-8 p-0 flex-shrink-0"
                                          >
                                            <Minus className="h-3 w-3" />
                                          </Button>
                                          <Input
                                            type="number"
                                            value={
                                              equipment.selectedPeriod
                                                ? Math.ceil(
                                                    equipment.days /
                                                      equipment.selectedPeriod
                                                        .multiplier
                                                  )
                                                : equipment.days
                                            }
                                            onChange={(e) => {
                                              const periods =
                                                Number.parseInt(
                                                  e.target.value
                                                ) || 1
                                              const days =
                                                equipment.selectedPeriod
                                                  ? periods *
                                                    equipment.selectedPeriod
                                                      .multiplier
                                                  : periods
                                              updateDays(equipment.id, days)
                                            }}
                                            className="w-12 h-8 text-center font-medium [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                            min="1"
                                          />
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              const currentValue =
                                                equipment.selectedPeriod
                                                  ? Math.ceil(
                                                      equipment.days /
                                                        equipment.selectedPeriod
                                                          .multiplier
                                                    )
                                                  : equipment.days
                                              const newValue = currentValue + 1
                                              const days =
                                                equipment.selectedPeriod
                                                  ? newValue *
                                                    equipment.selectedPeriod
                                                      .multiplier
                                                  : newValue
                                              updateDays(equipment.id, days)
                                            }}
                                            className="h-8 w-8 p-0 flex-shrink-0"
                                          >
                                            <Plus className="h-3 w-3" />
                                          </Button>
                                        </div>
                                        {equipment.selectedPeriod && (
                                          <span className="text-sm font-medium text-gray-600 whitespace-nowrap sm:ml-2">
                                            ({equipment.days} dias)
                                          </span>
                                        )}
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
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      removeEquipment(equipment.id)
                                    }
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                    </AnimatePresence>
                  </div>
                )}
              </CardContent>
            </Card>

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
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
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
                        required
                        className="mt-1"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={handleCEPChange}
                        className="mt-1"
                        placeholder="00000-000"
                        maxLength={9}
                      />
                    </div>
                  </div>

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
                {Array.isArray(selectedEquipments) &&
                selectedEquipments.length > 0 ? (
                  <>
                    {selectedEquipments.map((equipment, index) => (
                      <div
                        key={`summary-${equipment.id}-${index}`}
                        className="space-y-1 pb-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 pr-2">
                            <p className="font-medium text-gray-900 text-sm leading-tight">
                              {equipment.name}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              <span className="text-sm text-gray-600 font-medium">
                                Qtd: {equipment.quantity}x
                              </span>
                              {equipment.selectedPeriod ? (
                                <>
                                  <span className="text-sm text-gray-400">
                                    •
                                  </span>
                                  <span className="text-sm text-orange-600 font-medium">
                                    {Math.ceil(
                                      equipment.days /
                                        equipment.selectedPeriod.multiplier
                                    )}{' '}
                                    {equipment.selectedPeriod.label.toLowerCase()}
                                  </span>
                                  <span className="text-sm text-gray-400">
                                    •
                                  </span>
                                  <span className="text-sm text-gray-600 font-medium">
                                    {equipment.days} dias
                                  </span>
                                  {(() => {
                                    const pricingConfig = getIntelligentPricing(
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

                                    return (
                                      (pricingConfig.discount || 0) > 0 && (
                                        <>
                                          <span className="text-sm text-green-600 font-semibold">
                                            Desc. {actualPeriodLabel}: -
                                            {pricingConfig.discount}%
                                          </span>
                                        </>
                                      )
                                    )
                                  })()}
                                </>
                              ) : (
                                <>
                                  <span className="text-sm text-gray-400">
                                    •
                                  </span>
                                  <span className="text-sm text-gray-600 font-medium">
                                    {equipment.days} dias
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            {(() => {
                              const pricingConfig = getIntelligentPricing(
                                equipment,
                                equipment.days
                              )
                              const originalPrice =
                                Number(equipment.pricePerDay) *
                                equipment.days *
                                equipment.quantity
                              const finalPrice = calculateSubtotal(equipment)

                              return (
                                <div>
                                  {(pricingConfig.discount || 0) > 0 && (
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
                    ))}

                    <Separator />

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">
                        {formatCurrency(calculateTotal())}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      *Valor estimado. Orçamento final pode variar conforme
                      condições específicas.
                    </p>

                    {/* Botão Principal - Solicitar Orçamento */}
                    <div className="pt-4">
                      <Button
                        onClick={handleWhatsAppSubmit}
                        className="w-full hover:scale-105 transition-transform duration-200"
                        size="lg"
                      >
                        Solicitar Orçamento
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
