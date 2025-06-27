"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingCart, Package } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface Equipment {
  id: string
  name: string
  description: string
  pricePerDay: number
  imageUrl?: string
  images?: string[]
  category: {
    name: string
  }
  isAvailable: boolean
}

interface SelectedEquipment extends Equipment {
  quantity: number
  days: number
}

interface QuoteFormData {
  name: string
  email: string
  phone: string
  message: string
}

function QuotePage() {
  const searchParams = useSearchParams()
  const [selectedEquipments, setSelectedEquipments] = useState<SelectedEquipment[]>([])
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const equipmentId = searchParams.get("equipmentId")
    if (equipmentId) {
      fetchEquipmentAndAdd(equipmentId)
    }
  }, [searchParams])

  const fetchEquipmentAndAdd = async (equipmentId: string) => {
    try {
      const response = await fetch(`/api/equipments`)
      const data = await response.json()
      const equipments = Array.isArray(data) ? data : []
      const equipment = equipments.find((eq: any) => eq.id === equipmentId)

      if (equipment && !selectedEquipments.find((eq) => eq.id === equipmentId)) {
        const price = Number(equipment.pricePerDay) || 0
        const equipmentToAdd = {
          ...equipment,
          pricePerDay: price,
          quantity: 1,
          days: 1,
        }
        setSelectedEquipments((prev) => [...prev, equipmentToAdd])
      }
    } catch (error) {
      console.error("Erro ao buscar equipamento:", error)
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setSelectedEquipments((prev) => prev.map((eq) => (eq.id === id ? { ...eq, quantity } : eq)))
  }

  const updateDays = (id: string, days: number) => {
    if (days < 1) return
    setSelectedEquipments((prev) => prev.map((eq) => (eq.id === id ? { ...eq, days } : eq)))
  }

  const removeEquipment = (id: string) => {
    setSelectedEquipments((prev) => prev.filter((eq) => eq.id !== id))
  }

  const calculateSubtotal = (equipment: SelectedEquipment) => {
    const price = Number(equipment.pricePerDay) || 0
    const quantity = Number(equipment.quantity) || 1
    const days = Number(equipment.days) || 1
    return price * quantity * days
  }

  const calculateTotal = () => {
    return selectedEquipments.reduce((total, eq) => total + calculateSubtotal(eq), 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          equipments: selectedEquipments.map((eq) => ({
            equipmentId: eq.id,
            quantity: eq.quantity,
            days: eq.days,
          })),
          total: calculateTotal(),
        }),
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Orçamento enviado com sucesso. Entraremos em contato em breve.",
        })
        setSelectedEquipments([])
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        throw new Error("Erro ao enviar orçamento")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao enviar orçamento. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getEquipmentImage = (equipment: Equipment) => {
    if (equipment.imageUrl && equipment.imageUrl.trim() !== "") {
      return equipment.imageUrl
    }
    if (equipment.images && equipment.images.length > 0 && equipment.images[0].trim() !== "") {
      return equipment.images[0]
    }
    return `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(equipment.name)}`
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Solicitar Orçamento</h1>
          <p className="text-lg md:text-xl text-gray-600">Configure seu orçamento e receba nossa melhor proposta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Equipamentos Selecionados - Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <ShoppingCart className="h-5 w-5" />
                  Equipamentos Selecionados ({selectedEquipments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedEquipments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-base md:text-lg font-medium">Nenhum equipamento selecionado</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Você pode solicitar um orçamento geral ou{" "}
                      <a href="/equipamentos" className="text-orange-600 hover:text-orange-700 underline">
                        navegar pelos equipamentos
                      </a>{" "}
                      para adicionar itens específicos
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedEquipments.map((equipment) => {
                      const imageUrl = getEquipmentImage(equipment)
                      return (
                        <div key={equipment.id} className="border rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Imagem */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mx-auto sm:mx-0">
                              <img
                                src={imageUrl || "/placeholder.svg"}
                                alt={equipment.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(equipment.name)}`
                                }}
                              />
                            </div>

                            {/* Informações do Equipamento */}
                            <div className="flex-1 min-w-0">
                              <div className="text-center sm:text-left">
                                <h3 className="font-semibold text-lg truncate">{equipment.name}</h3>
                                <Badge variant="secondary" className="text-xs mb-2">
                                  {equipment.category.name}
                                </Badge>
                                <p className="text-sm text-gray-600 mb-3">
                                  {formatCurrency(Number(equipment.pricePerDay) || 0)}/dia
                                </p>
                              </div>

                              {/* Controles - Layout Responsivo */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                  <Label className="text-sm font-medium">Quantidade:</Label>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => updateQuantity(equipment.id, equipment.quantity - 1)}
                                      disabled={equipment.quantity <= 1}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <Input
                                      type="number"
                                      value={equipment.quantity}
                                      onChange={(e) =>
                                        updateQuantity(equipment.id, Number.parseInt(e.target.value) || 1)
                                      }
                                      className="w-16 text-center h-8"
                                      min="1"
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => updateQuantity(equipment.id, equipment.quantity + 1)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                  <Label className="text-sm font-medium">Dias:</Label>
                                  <Input
                                    type="number"
                                    value={equipment.days}
                                    onChange={(e) => updateDays(equipment.id, Number.parseInt(e.target.value) || 1)}
                                    className="w-20 h-8"
                                    min="1"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Preço e Ações */}
                            <div className="text-center sm:text-right flex-shrink-0">
                              <p className="text-lg font-semibold text-primary mb-2">
                                {formatCurrency(calculateSubtotal(equipment))}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeEquipment(equipment.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Formulário de Contato - SEMPRE VISÍVEL */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Dados para Contato</CardTitle>
                <p className="text-sm text-gray-600">Preencha seus dados para receber o orçamento personalizado</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        required
                        className="mt-1"
                        placeholder="(51) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="mt-1"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Observações</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Descreva seu projeto, local de entrega, prazo necessário, etc."
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedEquipments.length > 0 ? (
                  <>
                    {selectedEquipments.map((equipment) => (
                      <div key={equipment.id} className="flex justify-between text-sm">
                        <span className="truncate pr-2">
                          {equipment.name} ({equipment.quantity}x por {equipment.days} dias)
                        </span>
                        <span className="font-medium">{formatCurrency(calculateSubtotal(equipment))}</span>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">{formatCurrency(calculateTotal())}</span>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      *Valor estimado. Orçamento final pode variar conforme condições específicas.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm text-gray-500">Orçamento Geral</p>
                    <p className="text-xs text-gray-400 mt-1">Receberá proposta personalizada por email</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuotePageWrapper() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <QuotePage />
    </Suspense>
  )
}
