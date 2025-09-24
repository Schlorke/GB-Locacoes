'use client'

import type React from 'react'
import { useCartStore, type CartItem } from '@/stores/useCartStore'
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
  const { items: selectedEquipments, addItem, removeItem, clearCart } = useCartStore()
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
      const material = materialsData.find((m) => m.id === materialId)
      if (material && !selectedEquipments.find((eq) => eq.equipmentId === materialId.toString())) {
        const cartItem: CartItem = {
          equipmentId: materialId.toString(),
          equipmentName: material.name,
          pricePerDay: material.price,
          quantity: 1,
          days: 1,
        }
        addItem(cartItem)
      }
    },
    [selectedEquipments, materialsData, addItem]
  )

  const updateMaterial = useCallback(
    (materialId: number, field: 'quantity' | 'days', value: number) => {
      const equipmentId = materialId.toString()
      if (field === 'quantity') {
        useCartStore.getState().updateItemQuantity(equipmentId, Math.max(1, value))
      } else if (field === 'days') {
        useCartStore.getState().updateItemDays(equipmentId, Math.max(1, value))
      }
    },
    []
  )

  const removeMaterial = useCallback((materialId: number) => {
    removeItem(materialId.toString())
  }, [removeItem])

  const calculateTotal = useCallback(() => {
    return selectedEquipments.reduce((total, equipment) => {
      return total + (equipment.pricePerDay * equipment.quantity * equipment.days)
    }, 0)
  }, [selectedEquipments])

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
      if (selectedEquipments.length === 0) {
        // Idealmente, usar toast aqui
        alert('Selecione ao menos um material.')
        return
      }
      setIsSubmitting(true)
      try {
        // Aqui você faria a chamada para sua API de criação de orçamento
        // Ex: await fetch('/api/quotes', { method: 'POST', body: JSON.stringify({ formData, selectedEquipments }) });
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulação
        console.warn('Form submitted:', {
          formData,
          selectedEquipments,
          total: calculateTotal(),
        })
        // Idealmente, usar toast aqui
        alert('Orçamento enviado com sucesso! Entraremos em contato em breve.')
        // Limpar formulário ou redirecionar
        clearCart()
        // setFormData(initialFormDataState); // Resetar se necessário
      } catch (error) {
        console.error('Error submitting form:', error)
        // Idealmente, usar toast aqui
        alert('Erro ao enviar orçamento. Tente novamente.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, selectedEquipments, calculateTotal, clearCart]
  )

  return {
    selectedMaterials: selectedEquipments,
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
