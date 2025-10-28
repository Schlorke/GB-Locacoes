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
  equipment: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    equipment: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        toast({
          title: 'Sucesso!',
          description: data.message,
        })

        // Limpar formulário
        setFormData({
          name: '',
          email: '',
          phone: '',
          equipment: '',
          message: '',
        })
      } else {
        throw new Error(data.message || 'Erro ao enviar mensagem')
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      toast({
        title: 'Erro',
        description:
          error instanceof Error
            ? error.message
            : 'Erro ao enviar mensagem. Tente novamente.',
        variant: 'destructive',
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
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="(51) 99999-9999"
            required
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
          placeholder="contato@locacoesgb.com.br"
          required
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
          className="block w-fit mx-auto hover:scale-105 transition-transform duration-200"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
