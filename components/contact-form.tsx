'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  equipment: string
  cpf: string
  cnpj: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    equipment: '',
    cpf: '',
    cnpj: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Input mask handlers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    let formatted = value
    if (value.length > 0) {
      formatted = `(${value.substring(0, 2)}`
      if (value.length > 2) {
        formatted += `) ${value.substring(2, 7)}`
      }
      if (value.length > 7) {
        formatted += `-${value.substring(7, 11)}`
      }
    }
    setFormData((prev) => ({ ...prev, phone: formatted }))
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    let formatted = value
    if (value.length > 0) {
      formatted = value.substring(0, 3)
      if (value.length > 3) {
        formatted += `.${value.substring(3, 6)}`
      }
      if (value.length > 6) {
        formatted += `.${value.substring(6, 9)}`
      }
      if (value.length > 9) {
        formatted += `-${value.substring(9, 11)}`
      }
    }
    setFormData((prev) => ({ ...prev, cpf: formatted }))
  }

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    let formatted = value
    if (value.length > 0) {
      formatted = value.substring(0, 2)
      if (value.length > 2) {
        formatted += `.${value.substring(2, 5)}`
      }
      if (value.length > 5) {
        formatted += `.${value.substring(5, 8)}`
      }
      if (value.length > 8) {
        formatted += `/${value.substring(8, 12)}`
      }
      if (value.length > 12) {
        formatted += `-${value.substring(12, 14)}`
      }
    }
    setFormData((prev) => ({ ...prev, cnpj: formatted }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // Limpar formulário
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          equipment: '',
          cpf: '',
          cnpj: '',
          message: '',
        })

        // Toast com informações detalhadas
        toast.success('Orçamento Enviado com Sucesso! 🎉', {
          description:
            'Entraremos em contato em até 2 horas úteis. Você receberá uma cópia no seu email.',
          duration: 8000,
        })
      } else {
        throw new Error(data.message || 'Erro ao enviar mensagem')
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      toast.error('Erro', {
        description:
          error instanceof Error
            ? error.message
            : 'Erro ao enviar mensagem. Tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      suppressHydrationWarning
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Seu nome completo"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="(51) 99999-9999"
            required
            maxLength={15}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">E-mail *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="seu@email.com"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="company">Empresa/Construtora</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: e.target.value }))
          }
          placeholder="Nome da empresa (opcional)"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="equipment">Equipamento de Interesse</Label>
        <Input
          id="equipment"
          value={formData.equipment}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, equipment: e.target.value }))
          }
          placeholder="Ex: Betoneira, Andaime, etc."
          className="mt-1"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={handleCPFChange}
            placeholder="000.000.000-00"
            maxLength={14}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            value={formData.cnpj}
            onChange={handleCNPJChange}
            placeholder="00.000.000/0000-00"
            maxLength={18}
            className="mt-1"
          />
        </div>
      </div>
      <p className="text-sm text-gray-500 -mt-2">
        * Informe pelo menos o CPF ou CNPJ
      </p>

      <div>
        <Label htmlFor="message">Mensagem *</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Descreva seu projeto e necessidades..."
          rows={6}
          required
          className="mt-1"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          className="w-fit mx-auto hover:scale-105 transition-transform duration-200 flex items-center gap-2"
          size="lg"
          disabled={isSubmitting}
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
    </form>
  )
}
