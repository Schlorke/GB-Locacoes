'use client'

import type React from 'react'

import { useCallback, useState } from 'react'

// Supondo que 'materials' venha de props ou context, ou seja buscado aqui
export interface Material {
  id: number
  name: string
  price: number
}

const initialMaterials: Material[] = [
  // Exemplo:
  // { id: 1, name: 'Andaime', price: 100 },
]

export interface SelectedMaterial {
  id: number
  quantity: number
  days: number
}

export interface FormData {
  name: string
  email: string
  phone: string
  company: string
  address: string
  startDate: string
  endDate: string
  deliveryType: string
  message: string
}

export function useQuoteForm(materialsData = initialMaterials) {
  const [selectedMaterials, setSelectedMaterials] = useState<
    SelectedMaterial[]
  >([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    startDate: '',
    endDate: '',
    deliveryType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addMaterial = useCallback(
    (materialId: number) => {
      if (!selectedMaterials.find((m) => m.id === materialId)) {
        setSelectedMaterials((prev) => [
          ...prev,
          { id: materialId, quantity: 1, days: 1 },
        ])
      }
    },
    [selectedMaterials]
  )

  const updateMaterial = useCallback(
    (materialId: number, field: 'quantity' | 'days', value: number) => {
      setSelectedMaterials((prev) =>
        prev.map((m) =>
          m.id === materialId ? { ...m, [field]: Math.max(1, value) } : m
        )
      )
    },
    []
  )

  const removeMaterial = useCallback((materialId: number) => {
    setSelectedMaterials((prev) => prev.filter((m) => m.id !== materialId))
  }, [])

  const calculateTotal = useCallback(() => {
    return selectedMaterials.reduce((total, selected) => {
      const material = materialsData.find((m) => m.id === selected.id)
      return (
        total +
        (material ? material.price * selected.quantity * selected.days : 0)
      )
    }, 0)
  }, [selectedMaterials, materialsData])

  const handleFormInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const handleSelectChange = useCallback(
    (name: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (selectedMaterials.length === 0) {
        // Idealmente, usar toast aqui
        alert('Selecione ao menos um material.')
        return
      }
      setIsSubmitting(true)
      try {
        // Aqui você faria a chamada para sua API de criação de orçamento
        // Ex: await fetch('/api/quotes', { method: 'POST', body: JSON.stringify({ formData, selectedMaterials }) });
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulação
        console.warn('Form submitted:', {
          formData,
          selectedMaterials,
          total: calculateTotal(),
        })
        // Idealmente, usar toast aqui
        alert('Orçamento enviado com sucesso! Entraremos em contato em breve.')
        // Limpar formulário ou redirecionar
        setSelectedMaterials([])
        // setFormData(initialFormDataState); // Resetar se necessário
      } catch (error) {
        console.error('Error submitting form:', error)
        // Idealmente, usar toast aqui
        alert('Erro ao enviar orçamento. Tente novamente.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, selectedMaterials, calculateTotal]
  )

  return {
    selectedMaterials,
    formData,
    isSubmitting,
    addMaterial,
    updateMaterial,
    removeMaterial,
    calculateTotal,
    handleFormInputChange,
    handleSelectChange,
    handleSubmit,
    materialsData, // Exportar para o select de materiais
  }
}
