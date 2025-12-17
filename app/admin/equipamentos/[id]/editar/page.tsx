'use client'

import React from 'react'

import { EquipmentPricingSelector } from '@/components/equipment-pricing-selector'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CurrencyInput } from '@/components/ui/currency-input'
import { CustomSelect, CustomSelectItem } from '@/components/ui/custom-select'
import { HybridTooltip } from '@/components/ui/HybridTooltip'
import { ImageUpload } from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Info,
  Package,
  Pencil,
  PlusCircle,
  Save,
  Trash2,
  X,
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
}

// interface _Equipment {
//   id: string
//   name: string
//   description: string
//   pricePerDay: number
//   categoryId: string
//   images: string[]
//   isAvailable: boolean
//   specifications?: Record<string, string>
// }

interface FormData {
  name: string
  description: string
  pricePerDay: number
  categoryId: string
  images: string[]
  isAvailable: boolean
  specifications?: Record<string, string>
  // Inventory management
  maxStock: number
  // Equipment control
  partsLossHistory?: Array<{
    date: string
    description: string
    quantity: number
    images?: string[]
  }>
  partsLossCount?: number
  // Rental period configurations
  dailyDiscount: number
  weeklyDiscount: number
  biweeklyDiscount: number
  monthlyDiscount: number
  popularPeriod: string
  // Direct value pricing configurations
  dailyDirectValue: number
  weeklyDirectValue: number
  biweeklyDirectValue: number
  monthlyDirectValue: number
  // Pricing method control (percentage or direct value)
  dailyUseDirectValue: boolean
  weeklyUseDirectValue: boolean
  biweeklyUseDirectValue: boolean
  monthlyUseDirectValue: boolean
}

export default function EditarEquipamento() {
  const params = useParams()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    pricePerDay: 0,
    categoryId: '',
    images: [],
    isAvailable: true,
    specifications: {},
    // Inventory management
    maxStock: 1,
    // Equipment control
    partsLossHistory: [],
    partsLossCount: 0,
    // Rental period configurations
    dailyDiscount: 0,
    weeklyDiscount: 0,
    biweeklyDiscount: 0,
    monthlyDiscount: 0,
    popularPeriod: 'weekly',
    // Direct value pricing configurations
    dailyDirectValue: 0,
    weeklyDirectValue: 0,
    biweeklyDirectValue: 0,
    monthlyDirectValue: 0,
    // Pricing method control (percentage or direct value)
    dailyUseDirectValue: false,
    weeklyUseDirectValue: false,
    biweeklyUseDirectValue: false,
    monthlyUseDirectValue: false,
  })
  const [specKey, setSpecKey] = useState('')
  const [specValue, setSpecValue] = useState('')
  const [newPartsLossDate, setNewPartsLossDate] = useState('')
  const [newPartsLossSelectedDate, setNewPartsLossSelectedDate] =
    useState<Date | null>(null)
  const [isPartsLossCalendarOpen, setIsPartsLossCalendarOpen] = useState(false)
  const [newPartsLossDescription, setNewPartsLossDescription] = useState('')
  const [newPartsLossQuantity, setNewPartsLossQuantity] = useState('')
  const [newPartsLossImages, setNewPartsLossImages] = useState<string[]>([])
  const [editingPartsLossIndex, setEditingPartsLossIndex] = useState<
    number | null
  >(null)

  // Estados do carrossel
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageZoomed, setIsImageZoomed] = useState(false)

  useEffect(() => {
    if (!params.id) return

    const fetchEquipment = async (id: string) => {
      try {
        const response = await fetch(`/api/admin/equipments/${id}`)
        if (response.ok) {
          const equipment = await response.json()
          setFormData({
            name: equipment.name || '',
            description: equipment.description || '',
            pricePerDay: equipment.pricePerDay || 0,
            categoryId: equipment.categoryId || '',
            images: equipment.images || [],
            isAvailable: equipment.isAvailable ?? true,
            specifications: equipment.specifications || {},
            // Inventory management
            maxStock: equipment.maxStock || 1,
            // Equipment control
            partsLossHistory:
              equipment.partsLossHistory &&
              typeof equipment.partsLossHistory === 'object'
                ? (equipment.partsLossHistory as Array<{
                    date: string
                    description: string
                    quantity: number
                    images?: string[]
                  }>)
                : [],
            partsLossCount: equipment.partsLossCount || 0,
            // Rental period configurations
            dailyDiscount: equipment.dailyDiscount || 0,
            weeklyDiscount: equipment.weeklyDiscount || 0,
            biweeklyDiscount: equipment.biweeklyDiscount || 0,
            monthlyDiscount: equipment.monthlyDiscount || 0,
            popularPeriod: equipment.popularPeriod || 'weekly',
            // Direct value pricing configurations
            dailyDirectValue: equipment.dailyDirectValue || 0,
            weeklyDirectValue: equipment.weeklyDirectValue || 0,
            biweeklyDirectValue: equipment.biweeklyDirectValue || 0,
            monthlyDirectValue: equipment.monthlyDirectValue || 0,
            // Pricing method control (percentage or direct value)
            dailyUseDirectValue: equipment.dailyUseDirectValue || false,
            weeklyUseDirectValue: equipment.weeklyUseDirectValue || false,
            biweeklyUseDirectValue: equipment.biweeklyUseDirectValue || false,
            monthlyUseDirectValue: equipment.monthlyUseDirectValue || false,
          })
        }
      } catch (error) {
        console.error('Erro ao buscar equipamento:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEquipment(params.id as string)
    fetchCategories()
  }, [params.id])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
      toast.error('Erro', { description: 'Falha ao carregar categorias.' })
    }
  }

  const handleAddSpecification = () => {
    if (specKey && specValue) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: specValue,
        },
      }))
      setSpecKey('')
      setSpecValue('')
    } else {
      toast.warning('Atenção', {
        description: 'Preencha a chave e o valor da especificação.',
      })
    }
  }

  const handleRemoveSpecification = (keyToRemove: string) => {
    setFormData((prev) => {
      const newSpecifications = { ...prev.specifications }
      delete newSpecifications[keyToRemove]
      return { ...prev, specifications: newSpecifications }
    })
  }

  // Funções do carrossel
  const nextImage = useCallback(() => {
    if (formData.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === formData.images.length - 1 ? 0 : prev + 1
      )
    }
  }, [formData.images.length])

  const prevImage = useCallback(() => {
    if (formData.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? formData.images.length - 1 : prev - 1
      )
    }
  }, [formData.images.length])

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  // Reset carrossel quando as imagens mudarem
  useEffect(() => {
    if (formData.images.length === 0) {
      setCurrentImageIndex(0)
      setIsImageZoomed(false)
    } else if (currentImageIndex >= formData.images.length) {
      setCurrentImageIndex(formData.images.length - 1)
    }
  }, [formData.images, currentImageIndex])

  // Função para prevenir submit ao pressionar Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // Não fazer nada - apenas prevenir o submit
    }
  }

  // Data mínima para o calendário de perdas (hoje)
  const today = useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])

  // Handler para seleção de data no calendário de perdas
  const handlePartsLossDateSelect = useCallback((date: Date | undefined) => {
    if (date) {
      setNewPartsLossSelectedDate(date)
      // Converter para formato ISO (YYYY-MM-DD) para compatibilidade com o backend
      const isoDate = format(date, 'yyyy-MM-dd')
      setNewPartsLossDate(isoDate)
      setIsPartsLossCalendarOpen(false)
    }
  }, [])

  // Handler para limpar data selecionada
  const handleClearPartsLossDate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setNewPartsLossSelectedDate(null)
    setNewPartsLossDate('')
  }, [])

  // Texto do botão de data
  const partsLossDateDisplayText = useMemo(() => {
    if (newPartsLossSelectedDate) {
      return format(newPartsLossSelectedDate, 'dd/MM/yyyy', { locale: ptBR })
    }
    return 'Selecione a data da perda'
  }, [newPartsLossSelectedDate])

  // Sincronizar newPartsLossDate com newPartsLossSelectedDate quando carregar dados
  useEffect(() => {
    if (newPartsLossDate && !newPartsLossSelectedDate) {
      try {
        const date = new Date(newPartsLossDate)
        if (!isNaN(date.getTime())) {
          setNewPartsLossSelectedDate(date)
        }
      } catch (_error) {
        // Ignorar erro de parsing
      }
    }
  }, [newPartsLossDate, newPartsLossSelectedDate])

  // Função para desabilitar datas no calendário
  const isPartsLossDateDisabled = useCallback(
    (date: Date) => {
      const dateToCheck = new Date(date)
      dateToCheck.setHours(0, 0, 0, 0)
      // Desabilitar datas futuras (apenas permitir datas passadas e hoje)
      return dateToCheck > today
    },
    [today]
  )

  // Handler para iniciar edição de um registro de perda
  const handleEditPartsLoss = useCallback(
    (index: number) => {
      const loss = formData.partsLossHistory?.[index]
      if (!loss) return

      // Preencher formulário com dados do registro
      setNewPartsLossDate(loss.date)
      try {
        const date = new Date(loss.date)
        if (!isNaN(date.getTime())) {
          setNewPartsLossSelectedDate(date)
        }
      } catch (_error) {
        // Ignorar erro de parsing
      }
      setNewPartsLossDescription(loss.description)
      setNewPartsLossQuantity(loss.quantity.toString())
      setNewPartsLossImages(loss.images || [])
      setEditingPartsLossIndex(index)
      setIsPartsLossCalendarOpen(false)
    },
    [formData.partsLossHistory]
  )

  // Handler para cancelar edição
  const handleCancelEditPartsLoss = useCallback(() => {
    setNewPartsLossDate('')
    setNewPartsLossSelectedDate(null)
    setNewPartsLossDescription('')
    setNewPartsLossQuantity('')
    setNewPartsLossImages([])
    setEditingPartsLossIndex(null)
    setIsPartsLossCalendarOpen(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.description ||
      !formData.categoryId ||
      formData.pricePerDay <= 0
    ) {
      toast.error('Erro de Validação', {
        description:
          'Preencha todos os campos obrigatórios (*). O preço deve ser maior que zero.',
      })
      return
    }

    if (formData.images.length === 0) {
      toast.error('Erro de Validação', {
        description: 'Adicione pelo menos uma imagem do equipamento.',
      })
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch(`/api/admin/equipments/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Equipamento Atualizado!', {
          description: 'Equipamento atualizado com sucesso.',
        })
        router.push('/admin/equipamentos')
      } else {
        const errorData = await response.json()
        console.error('Erro da API:', errorData)

        // Mostrar detalhes específicos do erro se disponível
        const errorMessage =
          errorData.details ||
          errorData.error ||
          'Erro ao atualizar equipamento'
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('Erro ao atualizar equipamento:', error)
      toast.error('Erro', {
        description:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao atualizar o equipamento.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6 p-3 sm:p-4 lg:p-6 xl:p-8 pb-24 md:pb-12">
        {/* Header com gradiente */}
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
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white"
                >
                  <Link href="/admin/equipamentos">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Voltar</span>
                  </Link>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                    Editar Equipamento
                  </h1>
                  <p className="text-orange-50 font-medium">
                    Atualize as informações do equipamento
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <Package className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  Preencha os dados do equipamento
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Dados do Equipamento
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Atualize as informações necessárias do equipamento
                </p>
              </CardHeader>
              <CardContent className="relative z-10 space-y-8">
                {/* Layout Principal: Informações Básicas + Especificações (Esquerda) + Imagens (Direita) */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Coluna Esquerda: Informações Básicas + Especificações Técnicas */}
                  <div className="space-y-8">
                    {/* Seção: Informações Básicas */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">
                            1
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Informações Básicas
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium">
                            Nome do Equipamento *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Ex: Betoneira 400L"
                            required
                            className="mt-1 focus:border-blue-500"
                            onKeyDown={handleKeyDown}
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="category"
                            className="text-sm font-medium"
                          >
                            Categoria *
                          </Label>
                          <CustomSelect
                            value={formData.categoryId}
                            onValueChange={(value: string) =>
                              setFormData((prev) => ({
                                ...prev,
                                categoryId: value,
                              }))
                            }
                            placeholder="Escolha uma categoria"
                          >
                            {categories
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((category) => (
                                <CustomSelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </CustomSelectItem>
                              ))}
                          </CustomSelect>
                        </div>

                        <div>
                          <Label
                            htmlFor="description"
                            className="text-sm font-medium"
                          >
                            Descrição *
                          </Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                            placeholder="Descreva as características e usos do equipamento..."
                            rows={4}
                            required
                            className="mt-1 focus:border-blue-500"
                            onKeyDown={handleKeyDown}
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="pricePerDay"
                            className="text-sm font-medium"
                          >
                            Preço por Dia (R$) *
                          </Label>
                          <CurrencyInput
                            id="pricePerDay"
                            value={formData.pricePerDay}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                pricePerDay: value || 0,
                              }))
                            }
                            required
                            className="mt-1 focus:border-blue-500"
                            onKeyDown={handleKeyDown}
                          />
                        </div>

                        <div className="flex items-center space-x-3 pt-2">
                          <Switch
                            id="isAvailable"
                            checked={formData.isAvailable}
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({
                                ...prev,
                                isAvailable: checked,
                              }))
                            }
                            className="data-[state=checked]:bg-slate-700 data-[state=unchecked]:bg-input hover:data-[state=checked]:bg-slate-600 transition-colors duration-200"
                          />
                          <Label
                            htmlFor="isAvailable"
                            className="cursor-pointer text-sm"
                          >
                            Equipamento disponível para locação
                          </Label>
                        </div>

                        {/* Rental Period Configuration */}
                        <div className="space-y-6 border-t border-gray-100 pt-4">
                          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-orange-600">
                                2
                              </span>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">
                              Configuração de Períodos de Locação
                            </h3>
                          </div>

                          {/* Prévia em Tempo Real - Usando o Componente Original */}
                          <div
                            className="space-y-4 rounded-xl p-6 border shadow-xl backdrop-blur-sm min-h-[200px] transition-all duration-300 hover:shadow-2xl"
                            style={{
                              backgroundColor: 'rgb(248, 250, 252)',
                              borderColor: 'rgb(224, 230, 235)',
                              borderWidth: '1.5px',
                              boxShadow:
                                'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
                            }}
                          >
                            <div className="mb-4">
                              <h3 className="text-sm font-semibold text-slate-700">
                                Prévia da Interface Pública
                              </h3>
                            </div>

                            {/* Componente Exato da Interface Pública */}
                            <div className="flex justify-center">
                              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm max-w-sm w-full">
                                <EquipmentPricingSelector
                                  pricePerDay={formData.pricePerDay}
                                  dailyDiscount={formData.dailyDiscount}
                                  weeklyDiscount={formData.weeklyDiscount}
                                  biweeklyDiscount={formData.biweeklyDiscount}
                                  monthlyDiscount={formData.monthlyDiscount}
                                  popularPeriod={formData.popularPeriod}
                                  dailyDirectValue={formData.dailyDirectValue}
                                  weeklyDirectValue={formData.weeklyDirectValue}
                                  biweeklyDirectValue={
                                    formData.biweeklyDirectValue
                                  }
                                  monthlyDirectValue={
                                    formData.monthlyDirectValue
                                  }
                                  dailyUseDirectValue={
                                    formData.dailyUseDirectValue
                                  }
                                  weeklyUseDirectValue={
                                    formData.weeklyUseDirectValue
                                  }
                                  biweeklyUseDirectValue={
                                    formData.biweeklyUseDirectValue
                                  }
                                  monthlyUseDirectValue={
                                    formData.monthlyUseDirectValue
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          {/* Campos de Configuração organizados em linhas */}
                          <div className="space-y-4">
                            {/* PRIMEIRA LINHA: Quantidade Máxima e Período Popular */}
                            <div className="grid grid-cols-2 gap-4 items-start">
                              {/* Quantidade Máxima Disponível */}
                              <div>
                                <Label
                                  htmlFor="maxStock"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Quantidade Máxima Disponível *
                                </Label>
                                <Input
                                  id="maxStock"
                                  type="number"
                                  min="1"
                                  value={formData.maxStock}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      maxStock: parseInt(e.target.value) || 1,
                                    }))
                                  }
                                  placeholder="Ex: 5"
                                  required
                                  className="mt-2 border-gray-200 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1 min-h-[16px]">
                                  Máximo disponível para locação simultânea
                                </p>
                              </div>

                              {/* Período Popular */}
                              <div>
                                <Label
                                  htmlFor="popularPeriod"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Período Popular
                                </Label>
                                <div className="mt-2">
                                  <CustomSelect
                                    value={formData.popularPeriod}
                                    onValueChange={(value: string) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        popularPeriod: value,
                                      }))
                                    }
                                    placeholder="Escolha o período popular"
                                  >
                                    <CustomSelectItem value="daily">
                                      Diário
                                    </CustomSelectItem>
                                    <CustomSelectItem value="weekly">
                                      Semanal
                                    </CustomSelectItem>
                                    <CustomSelectItem value="biweekly">
                                      Quinzenal
                                    </CustomSelectItem>
                                    <CustomSelectItem value="monthly">
                                      Mensal
                                    </CustomSelectItem>
                                  </CustomSelect>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 min-h-[16px]">
                                  Destacado com etiqueta &quot;Popular&quot;
                                </p>
                              </div>
                            </div>

                            {/* Configuração de Preços por Período */}
                            <div className="space-y-6">
                              {/* Diário */}
                              <div
                                className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 shadow-xl transition-all duration-300 hover:shadow-2xl"
                                style={{
                                  boxShadow:
                                    'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
                                }}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    Período Diário
                                  </h4>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="dailyUsePercentage"
                                        checked={!formData.dailyUseDirectValue}
                                        onChange={(e) => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            dailyUseDirectValue:
                                              !e.target.checked,
                                          }))
                                        }}
                                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        aria-label="Usar desconto percentual para período diário"
                                      />
                                      <Label
                                        htmlFor="dailyUsePercentage"
                                        className="text-xs text-gray-700"
                                      >
                                        Usar desconto percentual
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="dailyUseDirectValue"
                                        checked={formData.dailyUseDirectValue}
                                        onChange={(e) => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            dailyUseDirectValue:
                                              e.target.checked,
                                          }))
                                        }}
                                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        aria-label="Usar valor direto para período diário"
                                      />
                                      <Label
                                        htmlFor="dailyUseDirectValue"
                                        className="text-xs text-gray-700"
                                      >
                                        Usar valor direto
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label
                                      htmlFor="dailyDiscount"
                                      className="text-xs text-gray-600"
                                    >
                                      Desconto (%)
                                    </Label>
                                    <Input
                                      id="dailyDiscount"
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={formData.dailyDiscount}
                                      onChange={(e) => {
                                        const value =
                                          parseInt(e.target.value) || 0
                                        const clampedValue = Math.min(
                                          Math.max(value, 0),
                                          100
                                        )
                                        setFormData((prev) => ({
                                          ...prev,
                                          dailyDiscount: clampedValue,
                                        }))
                                      }}
                                      disabled={formData.dailyUseDirectValue}
                                      className="mt-1 text-sm"
                                      onKeyDown={handleKeyDown}
                                    />
                                  </div>
                                  <div>
                                    <Label
                                      htmlFor="dailyDirectValue"
                                      className="text-xs text-gray-600"
                                    >
                                      Valor Direto (R$)
                                    </Label>
                                    <Input
                                      id="dailyDirectValue"
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={formData.dailyDirectValue}
                                      onChange={(e) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          dailyDirectValue:
                                            parseFloat(e.target.value) || 0,
                                        }))
                                      }
                                      disabled={!formData.dailyUseDirectValue}
                                      className="mt-1 text-sm"
                                      onKeyDown={handleKeyDown}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Semanal */}
                              <div
                                className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 shadow-xl transition-all duration-300 hover:shadow-2xl"
                                style={{
                                  boxShadow:
                                    'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
                                }}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    Período Semanal
                                  </h4>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="weeklyUsePercentage"
                                        checked={!formData.weeklyUseDirectValue}
                                        onChange={(e) => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            weeklyUseDirectValue:
                                              !e.target.checked,
                                          }))
                                        }}
                                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        aria-label="Usar desconto percentual para período semanal"
                                      />
                                      <Label
                                        htmlFor="weeklyUsePercentage"
                                        className="text-xs text-gray-700"
                                      >
                                        Usar desconto percentual
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="weeklyUseDirectValue"
                                        checked={formData.weeklyUseDirectValue}
                                        onChange={(e) => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            weeklyUseDirectValue:
                                              e.target.checked,
                                          }))
                                        }}
                                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        aria-label="Usar valor direto para período semanal"
                                      />
                                      <Label
                                        htmlFor="weeklyUseDirectValue"
                                        className="text-xs text-gray-700"
                                      >
                                        Usar valor direto
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label
                                      htmlFor="weeklyDiscount"
                                      className="text-xs text-gray-600"
                                    >
                                      Desconto (%)
                                    </Label>
                                    <Input
                                      id="weeklyDiscount"
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={formData.weeklyDiscount}
                                      onChange={(e) => {
                                        const value =
                                          parseInt(e.target.value) || 0
                                        const clampedValue = Math.min(
                                          Math.max(value, 0),
                                          100
                                        )
                                        setFormData((prev) => ({
                                          ...prev,
                                          weeklyDiscount: clampedValue,
                                        }))
                                      }}
                                      disabled={formData.weeklyUseDirectValue}
                                      className="mt-1 text-sm"
                                      onKeyDown={handleKeyDown}
                                    />
                                  </div>
                                  <div>
                                    <Label
                                      htmlFor="weeklyDirectValue"
                                      className="text-xs text-gray-600"
                                    >
                                      Valor Direto (R$)
                                    </Label>
                                    <Input
                                      id="weeklyDirectValue"
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={formData.weeklyDirectValue}
                                      onChange={(e) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          weeklyDirectValue:
                                            parseFloat(e.target.value) || 0,
                                        }))
                                      }
                                      disabled={!formData.weeklyUseDirectValue}
                                      className="mt-1 text-sm"
                                      onKeyDown={handleKeyDown}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Quinzenal */}
                              <div
                                className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 shadow-xl transition-all duration-300 hover:shadow-2xl"
                                style={{
                                  boxShadow:
                                    'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
                                }}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    Período Quinzenal
                                  </h4>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="biweeklyUsePercentage"
                                        checked={
                                          !formData.biweeklyUseDirectValue
                                        }
                                        onChange={(e) => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            biweeklyUseDirectValue:
                                              !e.target.checked,
                                          }))
                                        }}
                                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        aria-label="Usar desconto percentual para período quinzenal"
                                      />
                                      <Label
                                        htmlFor="biweeklyUsePercentage"
                                        className="text-xs text-gray-700"
                                      >
                                        Usar desconto percentual
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="biweeklyUseDirectValue"
                                        checked={
                                          formData.biweeklyUseDirectValue
                                        }
                                        onChange={(e) => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            biweeklyUseDirectValue:
                                              e.target.checked,
                                          }))
                                        }}
                                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        aria-label="Usar valor direto para período quinzenal"
                                      />
                                      <Label
                                        htmlFor="biweeklyUseDirectValue"
                                        className="text-xs text-gray-700"
                                      >
                                        Usar valor direto
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label
                                      htmlFor="biweeklyDiscount"
                                      className="text-xs text-gray-600"
                                    >
                                      Desconto (%)
                                    </Label>
                                    <Input
                                      id="biweeklyDiscount"
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={formData.biweeklyDiscount}
                                      onChange={(e) => {
                                        const value =
                                          parseInt(e.target.value) || 0
                                        const clampedValue = Math.min(
                                          Math.max(value, 0),
                                          100
                                        )
                                        setFormData((prev) => ({
                                          ...prev,
                                          biweeklyDiscount: clampedValue,
                                        }))
                                      }}
                                      disabled={formData.biweeklyUseDirectValue}
                                      className="mt-1 text-sm"
                                      onKeyDown={handleKeyDown}
                                    />
                                  </div>
                                  <div>
                                    <Label
                                      htmlFor="biweeklyDirectValue"
                                      className="text-xs text-gray-600"
                                    >
                                      Valor Direto (R$)
                                    </Label>
                                    <Input
                                      id="biweeklyDirectValue"
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={formData.biweeklyDirectValue}
                                      onChange={(e) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          biweeklyDirectValue:
                                            parseFloat(e.target.value) || 0,
                                        }))
                                      }
                                      disabled={
                                        !formData.biweeklyUseDirectValue
                                      }
                                      className="mt-1 text-sm"
                                      onKeyDown={handleKeyDown}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Mensal */}
                              <div
                                className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 shadow-xl transition-all duration-300 hover:shadow-2xl"
                                style={{
                                  boxShadow:
                                    'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
                                }}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    Período Mensal
                                  </h4>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="monthlyUsePercentage"
                                        checked={
                                          !formData.monthlyUseDirectValue
                                        }
                                        onChange={(e) => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            monthlyUseDirectValue:
                                              !e.target.checked,
                                          }))
                                        }}
                                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        aria-label="Usar desconto percentual para período mensal"
                                      />
                                      <Label
                                        htmlFor="monthlyUsePercentage"
                                        className="text-xs text-gray-700"
                                      >
                                        Usar desconto percentual
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="monthlyUseDirectValue"
                                        checked={formData.monthlyUseDirectValue}
                                        onChange={(e) => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            monthlyUseDirectValue:
                                              e.target.checked,
                                          }))
                                        }}
                                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        aria-label="Usar valor direto para período mensal"
                                      />
                                      <Label
                                        htmlFor="monthlyUseDirectValue"
                                        className="text-xs text-gray-700"
                                      >
                                        Usar valor direto
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label
                                      htmlFor="monthlyDiscount"
                                      className="text-xs text-gray-600"
                                    >
                                      Desconto (%)
                                    </Label>
                                    <Input
                                      id="monthlyDiscount"
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={formData.monthlyDiscount}
                                      onChange={(e) => {
                                        const value =
                                          parseInt(e.target.value) || 0
                                        const clampedValue = Math.min(
                                          Math.max(value, 0),
                                          100
                                        )
                                        setFormData((prev) => ({
                                          ...prev,
                                          monthlyDiscount: clampedValue,
                                        }))
                                      }}
                                      disabled={formData.monthlyUseDirectValue}
                                      className="mt-1 text-sm"
                                      onKeyDown={handleKeyDown}
                                    />
                                  </div>
                                  <div>
                                    <Label
                                      htmlFor="monthlyDirectValue"
                                      className="text-xs text-gray-600"
                                    >
                                      Valor Direto (R$)
                                    </Label>
                                    <Input
                                      id="monthlyDirectValue"
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={formData.monthlyDirectValue}
                                      onChange={(e) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          monthlyDirectValue:
                                            parseFloat(e.target.value) || 0,
                                        }))
                                      }
                                      disabled={!formData.monthlyUseDirectValue}
                                      className="mt-1 text-sm"
                                      onKeyDown={handleKeyDown}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coluna Direita: Imagens do Equipamento (Ocupando toda a altura) */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-600">
                          3
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Imagens do Equipamento
                      </h3>
                    </div>

                    <div className="min-h-[500px]">
                      <ImageUpload
                        key="equipment-images"
                        images={formData.images}
                        onImagesChange={(imgs) => {
                          // Garantir que atualiza APENAS formData.images
                          setFormData((prev) => ({ ...prev, images: imgs }))
                        }}
                        maxImages={5}
                        currentImageIndex={currentImageIndex}
                        onImageIndexChange={setCurrentImageIndex}
                        onImageZoom={() => setIsImageZoomed(true)}
                        nextImage={nextImage}
                        prevImage={prevImage}
                        goToImage={goToImage}
                        tooltipContent={
                          <>
                            💡 <strong>Editando Imagens:</strong> A primeira
                            imagem será exibida como destaque na listagem de
                            equipamentos. Arraste para reordenar.
                          </>
                        }
                      />
                    </div>

                    {/* Seção: Especificações Técnicas */}
                    <div className="space-y-6 border-t border-gray-100 pt-6">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-purple-600">
                            4
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Especificações Técnicas
                        </h3>
                        <span className="text-sm text-gray-500">
                          (Opcional)
                        </span>
                      </div>

                      <div className="space-y-4">
                        {Object.entries(formData.specifications || {}).length >
                          0 && (
                          <div className="space-y-3">
                            {Object.entries(formData.specifications || {}).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="flex items-center justify-between p-3 border rounded-md"
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="font-medium text-sm">
                                      {key}
                                    </div>
                                    <div className="text-sm mt-1">
                                      {String(value)}
                                    </div>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      handleRemoveSpecification(key)
                                    }
                                    className="flex-shrink-0 ml-2"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              )
                            )}
                          </div>
                        )}

                        <div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <Label
                                  htmlFor="specKey"
                                  className="text-sm font-medium"
                                >
                                  Nome da Especificação
                                </Label>
                                <Input
                                  id="specKey"
                                  value={specKey}
                                  onChange={(e) => setSpecKey(e.target.value)}
                                  placeholder="Ex: Peso"
                                  className="mt-1 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="specValue"
                                  className="text-sm font-medium"
                                >
                                  Valor
                                </Label>
                                <Input
                                  id="specValue"
                                  value={specValue}
                                  onChange={(e) => setSpecValue(e.target.value)}
                                  placeholder="Ex: 150kg"
                                  className="mt-1 focus:border-blue-500"
                                />
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleAddSpecification}
                              className="w-fit px-4 bg-transparent border-gray-200 hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
                            >
                              <PlusCircle className="h-4 w-4 mr-2 group-hover:text-orange-500 transition-colors duration-200" />
                              <span className="group-hover:text-orange-500 transition-colors duration-200">
                                Adicionar Especificação
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Registro de Perdas de Peças e Avarias */}
                    <div className="space-y-6 border-t border-gray-100 pt-6">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-red-600">
                            5
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Registro de Perdas de Peças e Avarias
                        </h3>
                        <HybridTooltip
                          content="💡 Esta área permite registrar perdas de peças e avarias nos equipamentos. Essas informações são essenciais para controle de estoque, cobrança de taxas de avaria nos orçamentos e tomada de decisões sobre manutenção dos equipamentos."
                          side="top"
                          align="center"
                        >
                          <Info className="size-4 text-gray-700 cursor-help transition-colors hover:text-orange-600" />
                        </HybridTooltip>
                      </div>

                      {/* Contador de perdas */}
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-red-700">
                              Total de Perdas Registradas
                            </div>
                            <div className="text-2xl font-bold text-red-900 mt-1">
                              {formData.partsLossCount || 0}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Histórico de perdas */}
                      {formData.partsLossHistory &&
                        formData.partsLossHistory.length > 0 && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">
                              Histórico de Perdas
                            </Label>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {formData.partsLossHistory.map((loss, index) => (
                                <div
                                  key={index}
                                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">
                                      {loss.description}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      Data:{' '}
                                      {new Date(loss.date).toLocaleDateString(
                                        'pt-BR'
                                      )}{' '}
                                      - Quantidade: {loss.quantity}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleEditPartsLoss(index)}
                                      className="h-8 w-8"
                                      title="Editar registro"
                                    >
                                      <Pencil className="h-4 w-4 text-blue-500" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        const newHistory =
                                          formData.partsLossHistory?.filter(
                                            (_, i) => i !== index
                                          ) || []
                                        const newCount =
                                          (formData.partsLossCount || 0) -
                                          loss.quantity
                                        setFormData((prev) => ({
                                          ...prev,
                                          partsLossHistory: newHistory,
                                          partsLossCount: Math.max(0, newCount),
                                        }))
                                        toast.success('Registro removido', {
                                          description:
                                            'Registro de perda removido com sucesso.',
                                        })
                                      }}
                                      className="h-8 w-8"
                                      title="Remover registro"
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Formulário para adicionar/editar perda */}
                      <div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {editingPartsLossIndex !== null
                              ? 'Editar Registro de Perda'
                              : 'Adicionar Novo Registro de Perda'}
                          </h4>
                          {editingPartsLossIndex !== null && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleCancelEditPartsLoss}
                              className="text-xs text-gray-500 hover:text-gray-700"
                            >
                              Cancelar Edição
                            </Button>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <Label
                                htmlFor="partsLossDate"
                                className="text-sm font-medium"
                              >
                                Data da Perda
                              </Label>
                              <div className="mt-1 space-y-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsPartsLossCalendarOpen(
                                      !isPartsLossCalendarOpen
                                    )
                                  }}
                                  className={cn(
                                    'flex h-10 w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors overflow-hidden',
                                    'hover:bg-gray-50',
                                    'disabled:cursor-not-allowed disabled:opacity-50',
                                    !newPartsLossSelectedDate
                                      ? 'justify-center text-gray-500'
                                      : 'justify-center relative'
                                  )}
                                >
                                  {!newPartsLossSelectedDate ? (
                                    <div className="flex items-center gap-2">
                                      <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                      <span className="whitespace-nowrap">
                                        {partsLossDateDisplayText}
                                      </span>
                                      <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                    </div>
                                  ) : (
                                    <>
                                      <span className="flex-1 text-center whitespace-nowrap">
                                        {partsLossDateDisplayText}
                                      </span>
                                      <X
                                        className="h-4 w-4 text-gray-400 hover:text-gray-600 absolute right-3"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleClearPartsLossDate(e)
                                        }}
                                      />
                                    </>
                                  )}
                                </button>

                                {/* Calendário inline - aparece quando isPartsLossCalendarOpen é true */}
                                {isPartsLossCalendarOpen && (
                                  <div className="border border-gray-200 rounded-md bg-white p-0 shadow-md overflow-hidden max-w-full">
                                    <Calendar
                                      mode="single"
                                      defaultMonth={
                                        newPartsLossSelectedDate || today
                                      }
                                      month={newPartsLossSelectedDate || today}
                                      selected={
                                        newPartsLossSelectedDate || undefined
                                      }
                                      onSelect={handlePartsLossDateSelect}
                                      numberOfMonths={1}
                                      disabled={isPartsLossDateDisabled}
                                      locale={ptBR}
                                      toDate={today}
                                      showOutsideDays={false}
                                      includeWeekends={true}
                                    />
                                    <div className="border-t border-gray-200 px-3 py-2">
                                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                                        <div>
                                          Selecione a data em que ocorreu a
                                          perda
                                        </div>
                                        {newPartsLossSelectedDate && (
                                          <div className="text-green-600 font-medium">
                                            ✓ Data selecionada:{' '}
                                            {partsLossDateDisplayText}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <Label
                                htmlFor="partsLossDescription"
                                className="text-sm font-medium"
                              >
                                Descrição da Perda
                              </Label>
                              <Input
                                id="partsLossDescription"
                                value={newPartsLossDescription}
                                onChange={(e) =>
                                  setNewPartsLossDescription(e.target.value)
                                }
                                placeholder="Ex: Perda de parafusos, peças quebradas, etc."
                                className="mt-1 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="partsLossQuantity"
                                className="text-sm font-medium"
                              >
                                Quantidade
                              </Label>
                              <Input
                                id="partsLossQuantity"
                                type="number"
                                min="1"
                                value={newPartsLossQuantity}
                                onChange={(e) =>
                                  setNewPartsLossQuantity(e.target.value)
                                }
                                placeholder="Ex: 5"
                                className="mt-1 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Label className="text-sm font-medium">
                                  Fotos da Avaria/Perda (Opcional)
                                </Label>
                                <HybridTooltip
                                  content={
                                    <>
                                      💡 Adicione até 5 fotos para documentar a
                                      avaria ou peça perdida
                                    </>
                                  }
                                  side="top"
                                  align="center"
                                >
                                  <Info className="size-4 text-gray-700 cursor-help transition-colors hover:text-orange-600" />
                                </HybridTooltip>
                              </div>
                              <ImageUpload
                                key="parts-loss-images"
                                images={newPartsLossImages}
                                onImagesChange={(imgs) => {
                                  // Garantir que atualiza APENAS newPartsLossImages
                                  setNewPartsLossImages(imgs)
                                }}
                                maxImages={5}
                                sectionTitle="Fotos da Avaria/Perda"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                if (
                                  newPartsLossDate &&
                                  newPartsLossDescription.trim() &&
                                  newPartsLossQuantity
                                ) {
                                  const quantity =
                                    parseInt(newPartsLossQuantity) || 0
                                  const newLoss = {
                                    date: newPartsLossDate,
                                    description: newPartsLossDescription.trim(),
                                    quantity,
                                    images: newPartsLossImages,
                                  }

                                  if (editingPartsLossIndex !== null) {
                                    // Atualizar registro existente
                                    const oldLoss =
                                      formData.partsLossHistory?.[
                                        editingPartsLossIndex
                                      ]
                                    const oldQuantity = oldLoss?.quantity || 0
                                    const newHistory = [
                                      ...(formData.partsLossHistory || []),
                                    ]
                                    newHistory[editingPartsLossIndex] = newLoss

                                    setFormData((prev) => ({
                                      ...prev,
                                      partsLossHistory: newHistory,
                                      partsLossCount:
                                        (prev.partsLossCount || 0) -
                                        oldQuantity +
                                        quantity,
                                    }))

                                    toast.success('Registro atualizado!', {
                                      description:
                                        'Registro de perda atualizado com sucesso.',
                                    })
                                  } else {
                                    // Adicionar novo registro
                                    const newHistory = [
                                      ...(formData.partsLossHistory || []),
                                      newLoss,
                                    ]
                                    setFormData((prev) => ({
                                      ...prev,
                                      partsLossHistory: newHistory,
                                      partsLossCount:
                                        (prev.partsLossCount || 0) + quantity,
                                    }))

                                    toast.success('Perda registrada!', {
                                      description:
                                        'Registro de perda adicionado com sucesso.',
                                    })
                                  }

                                  // Limpar formulário
                                  setNewPartsLossDate('')
                                  setNewPartsLossSelectedDate(null)
                                  setNewPartsLossDescription('')
                                  setNewPartsLossQuantity('')
                                  setNewPartsLossImages([])
                                  setEditingPartsLossIndex(null)
                                  setIsPartsLossCalendarOpen(false)
                                } else {
                                  toast.warning('Atenção', {
                                    description:
                                      'Preencha todos os campos para registrar a perda.',
                                  })
                                }
                              }}
                              className="w-fit px-4 bg-transparent border-gray-200 hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
                            >
                              {editingPartsLossIndex !== null ? (
                                <>
                                  <Save className="h-4 w-4 mr-2 group-hover:text-blue-500 transition-colors duration-200" />
                                  <span className="group-hover:text-blue-500 transition-colors duration-200">
                                    Salvar Alterações
                                  </span>
                                </>
                              ) : (
                                <>
                                  <PlusCircle className="h-4 w-4 mr-2 group-hover:text-red-500 transition-colors duration-200" />
                                  <span className="group-hover:text-red-500 transition-colors duration-200">
                                    Adicionar Registro de Perda
                                  </span>
                                </>
                              )}
                            </Button>
                            {editingPartsLossIndex !== null && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleCancelEditPartsLoss}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                Cancelar
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação - Posicionados no canto inferior direito */}
                <div className="flex justify-end pt-6 mt-8 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      type="button"
                      asChild
                      className="w-full sm:w-auto hover:text-orange-500 bg-transparent"
                    >
                      <Link href="/admin/equipamentos">Cancelar</Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </form>
      </div>

      {/* Modal de Zoom da Imagem */}
      {isImageZoomed && formData.images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={formData.images[currentImageIndex] || ''}
              alt={`Equipamento - Imagem ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navegação no modal */}
            {formData.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    prevImage()
                  }}
                  title="Imagem anterior"
                  aria-label="Navegar para imagem anterior"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    nextImage()
                  }}
                  title="Próxima imagem"
                  aria-label="Navegar para próxima imagem"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Indicador de imagem atual */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} de {formData.images.length}
            </div>

            {/* Botão de fechar */}
            <button
              onClick={() => setIsImageZoomed(false)}
              title="Fechar"
              aria-label="Fechar visualização"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-200"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
