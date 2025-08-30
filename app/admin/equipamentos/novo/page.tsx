'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CurrencyInput } from '@/components/ui/currency-input'
import { CustomSelect, CustomSelectItem } from '@/components/ui/custom-select'
import { ImageUpload } from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { EquipmentPricingSelector } from '@/components/equipment-pricing-selector'
import { toast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Package,
  PlusCircle,
  Save,
  Trash2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type * as React from 'react'
import { useCallback, useEffect, useState } from 'react'

interface Category {
  id: string
  name: string
}

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
  // Rental period configurations
  dailyDiscount: number
  weeklyDiscount: number
  biweeklyDiscount: number
  monthlyDiscount: number
  popularPeriod: string
}

export default function NovoEquipamento() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
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
    // Rental period configurations
    dailyDiscount: 0,
    weeklyDiscount: 10,
    biweeklyDiscount: 15,
    monthlyDiscount: 20,
    popularPeriod: 'weekly',
  })
  const [specKey, setSpecKey] = useState('')
  const [specValue, setSpecValue] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
      toast({
        title: 'Erro',
        description: 'Falha ao carregar categorias.',
        variant: 'destructive',
      })
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
      toast({
        title: 'Atenção',
        description: 'Preencha a chave e o valor da especificação.',
        variant: 'default',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.description ||
      !formData.categoryId ||
      formData.pricePerDay <= 0
    ) {
      toast({
        title: 'Erro de Validação',
        description:
          'Preencha todos os campos obrigatórios (*). O preço deve ser maior que zero.',
        variant: 'destructive',
      })
      return
    }

    if (formData.images.length === 0) {
      toast({
        title: 'Erro de Validação',
        description: 'Adicione pelo menos uma imagem do equipamento.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/equipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Sucesso!',
          description: 'Equipamento criado com sucesso.',
        })
        router.push('/admin/equipamentos')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao criar equipamento')
      }
    } catch (error) {
      console.error('Erro ao criar equipamento:', error)
      toast({
        title: 'Erro',
        description:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao criar o equipamento.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
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
                    Novo Equipamento
                  </h1>
                  <p className="text-orange-50 font-medium">
                    Adicione um novo equipamento ao catálogo de locação
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
          {/* Formulário Completo do Equipamento */}
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
                  Preencha todas as informações necessárias para cadastrar o
                  equipamento
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
                          <Label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700"
                          >
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
                            className="mt-2 border-gray-200 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="category"
                            className="text-sm font-medium text-gray-700"
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
                            className="text-sm font-medium text-gray-700"
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
                            className="mt-2 border-gray-200 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="pricePerDay"
                            className="text-sm font-medium text-gray-700"
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
                            className="mt-2 border-gray-200 focus:border-blue-500"
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
                            className="cursor-pointer text-sm text-gray-700"
                          >
                            Equipamento disponível para locação
                          </Label>
                        </div>

                        {/* Rental Period Configuration */}
                        <div className="space-y-6 border-t border-gray-100 pt-4">
                          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-orange-600">
                                3
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
                            <div className="flex justify-center">
                              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm max-w-sm w-full">
                                <EquipmentPricingSelector
                                  pricePerDay={formData.pricePerDay}
                                  dailyDiscount={formData.dailyDiscount}
                                  weeklyDiscount={formData.weeklyDiscount}
                                  biweeklyDiscount={formData.biweeklyDiscount}
                                  monthlyDiscount={formData.monthlyDiscount}
                                  popularPeriod={formData.popularPeriod}
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

                            {/* Segunda Linha: Desconto Diário e Semanal */}
                            <div className="grid grid-cols-2 gap-4 items-start">
                              <div>
                                <Label
                                  htmlFor="dailyDiscount"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Desconto Diário (%)
                                </Label>
                                <Input
                                  id="dailyDiscount"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={formData.dailyDiscount}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      dailyDiscount:
                                        parseInt(e.target.value) || 0,
                                    }))
                                  }
                                  className="mt-2 border-gray-200 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1 min-h-[16px]">
                                  &nbsp;
                                </p>
                              </div>

                              <div>
                                <Label
                                  htmlFor="weeklyDiscount"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Desconto Semanal (%)
                                </Label>
                                <Input
                                  id="weeklyDiscount"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={formData.weeklyDiscount}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      weeklyDiscount:
                                        parseInt(e.target.value) || 0,
                                    }))
                                  }
                                  className="mt-2 border-gray-200 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1 min-h-[16px]">
                                  &nbsp;
                                </p>
                              </div>
                            </div>

                            {/* Terceira Linha: Desconto Quinzenal e Mensal */}
                            <div className="grid grid-cols-2 gap-4 items-start">
                              <div>
                                <Label
                                  htmlFor="biweeklyDiscount"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Desconto Quinzenal (%)
                                </Label>
                                <Input
                                  id="biweeklyDiscount"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={formData.biweeklyDiscount}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      biweeklyDiscount:
                                        parseInt(e.target.value) || 0,
                                    }))
                                  }
                                  className="mt-2 border-gray-200 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1 min-h-[16px]">
                                  &nbsp;
                                </p>
                              </div>

                              <div>
                                <Label
                                  htmlFor="monthlyDiscount"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Desconto Mensal (%)
                                </Label>
                                <Input
                                  id="monthlyDiscount"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={formData.monthlyDiscount}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      monthlyDiscount:
                                        parseInt(e.target.value) || 0,
                                    }))
                                  }
                                  className="mt-2 border-gray-200 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1 min-h-[16px]">
                                  &nbsp;
                                </p>
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
                          2
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Imagens do Equipamento
                      </h3>
                    </div>

                    <ImageUpload
                      images={formData.images}
                      onImagesChange={(images) =>
                        setFormData((prev) => ({ ...prev, images }))
                      }
                      maxImages={5}
                      currentImageIndex={currentImageIndex}
                      onImageIndexChange={setCurrentImageIndex}
                      onImageZoom={() => setIsImageZoomed(true)}
                      nextImage={nextImage}
                      prevImage={prevImage}
                      goToImage={goToImage}
                    />

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
                                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50/50"
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900">
                                      {key}
                                    </div>
                                    <div className="text-sm text-gray-700 mt-1">
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
                                    className="text-red-500 hover:text-red-700 hover:bg-red-100 flex-shrink-0 ml-2"
                                  >
                                    <Trash2 className="h-4 w-4" />
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
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Nome da Especificação
                                </Label>
                                <Input
                                  id="specKey"
                                  value={specKey}
                                  onChange={(e) => setSpecKey(e.target.value)}
                                  placeholder="Ex: Peso"
                                  className="mt-2 border-gray-200 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="specValue"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Valor
                                </Label>
                                <Input
                                  id="specValue"
                                  value={specValue}
                                  onChange={(e) => setSpecValue(e.target.value)}
                                  placeholder="Ex: 150kg"
                                  className="mt-2 border-gray-200 focus:border-blue-500"
                                />
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleAddSpecification}
                              className="w-fit px-4 border-gray-200 hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
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
                  </div>
                </div>

                {/* Botões de Ação - Posicionados no canto inferior direito */}
                <div className="flex justify-end pt-6 mt-8 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      type="button"
                      asChild
                      className="w-full sm:w-auto hover:text-orange-500 border-gray-200 hover:bg-gray-50"
                    >
                      <Link href="/admin/equipamentos">Cancelar</Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Salvando...' : 'Salvar Equipamento'}
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
