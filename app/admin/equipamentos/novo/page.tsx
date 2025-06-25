"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CurrencyInput } from "@/components/ui/currency-input"
import { ImageUpload } from "@/components/ui/image-upload"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Save, PlusCircle, Trash2 } from "lucide-react"
import Link from "next/link"

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
}

export default function NovoEquipamento() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    pricePerDay: 0,
    categoryId: "",
    images: [],
    isAvailable: true,
    specifications: {},
  })
  const [specKey, setSpecKey] = useState("")
  const [specValue, setSpecValue] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error)
      toast({
        title: "Erro",
        description: "Falha ao carregar categorias.",
        variant: "destructive",
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
      setSpecKey("")
      setSpecValue("")
    } else {
      toast({
        title: "Atenção",
        description: "Preencha a chave e o valor da especificação.",
        variant: "default",
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

    if (!formData.name || !formData.description || !formData.categoryId || formData.pricePerDay <= 0) {
      toast({
        title: "Erro de Validação",
        description: "Preencha todos os campos obrigatórios (*). O preço deve ser maior que zero.",
        variant: "destructive",
      })
      return
    }

    if (formData.images.length === 0) {
      toast({
        title: "Erro de Validação",
        description: "Adicione pelo menos uma imagem do equipamento.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/equipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Equipamento criado com sucesso.",
        })
        router.push("/admin/equipamentos")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao criar equipamento")
      }
    } catch (error) {
      console.error("Erro ao criar equipamento:", error)
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao criar o equipamento.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/equipamentos">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Novo Equipamento</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nome do Equipamento *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Betoneira 400L"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, categoryId: value }))}
                  required
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva as características e usos do equipamento..."
                rows={4}
                required
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pricePerDay">Preço por Dia (R$) *</Label>
                <CurrencyInput
                  id="pricePerDay"
                  value={formData.pricePerDay}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, pricePerDay: value || 0 }))}
                  required
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-3 pt-6">
                <Switch
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isAvailable: checked }))}
                />
                <Label htmlFor="isAvailable" className="cursor-pointer">
                  Equipamento disponível para locação
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagens do Equipamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => setFormData((prev) => ({ ...prev, images }))}
              maxImages={5}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Especificações Técnicas (Opcional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(formData.specifications || {}).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <span className="font-medium">{key}:</span> {String(value)}
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveSpecification(key)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row items-end gap-2">
              <div className="flex-grow w-full sm:w-auto">
                <Label htmlFor="specKey">Nome da Especificação</Label>
                <Input
                  id="specKey"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  placeholder="Ex: Peso"
                  className="mt-1"
                />
              </div>
              <div className="flex-grow w-full sm:w-auto">
                <Label htmlFor="specValue">Valor</Label>
                <Input
                  id="specValue"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  placeholder="Ex: 150kg"
                  className="mt-1"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddSpecification}
                className="w-full sm:w-auto mt-2 sm:mt-0"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Button variant="outline" type="button" asChild className="w-full sm:w-auto">
            <Link href="/admin/equipamentos">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Salvando..." : "Salvar Equipamento"}
          </Button>
        </div>
      </form>
    </div>
  )
}
