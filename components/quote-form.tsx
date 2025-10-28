'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { convertFormDataToWhatsApp, openWhatsAppQuote } from '@/lib/whatsapp'

import {
  ArrowLeft,
  ArrowRight,
  Building,
  Calendar,
  Check,
  Mail,
  MessageSquare,
  Package,
  Phone,
} from 'lucide-react'

// Schema de validação otimizado
const QuoteFormSchema = z.object({
  // Etapa 1: Informações pessoais
  customerName: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100),
  customerEmail: z.string().email('Digite um email válido'),
  customerPhone: z
    .string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .max(15),
  customerCompany: z.string().optional(),

  // Etapa 2: Equipamento e período
  equipmentName: z.string().optional(),
  equipmentId: z.string().optional(),
  rentalDays: z
    .number()
    .min(1, 'Período mínimo: 1 dia')
    .max(365, 'Período máximo: 365 dias'),

  // Etapa 3: Detalhes adicionais
  message: z.string().optional(),
  urgency: z.enum(['baixa', 'media', 'alta']),
})

type QuoteFormData = z.infer<typeof QuoteFormSchema>

interface QuoteFormProps {
  prefilledEquipment?: {
    id: string
    name: string
  }
  variant?: 'modal' | 'page' | 'inline'
  onSuccess?: (_data: QuoteFormData) => void
  onCancel?: () => void
}

export default function QuoteForm({
  prefilledEquipment,
  variant = 'page',
  onSuccess,
  onCancel,
}: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  // Removido: estado de isSubmitting não utilizado
  const totalSteps = 3

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(QuoteFormSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerCompany: '',
      equipmentName: prefilledEquipment?.name || '',
      equipmentId: prefilledEquipment?.id || '',
      rentalDays: 7,
      message: '',
      urgency: 'media',
    },
    mode: 'onChange',
  })

  const watchedData = watch()

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isStepValid = await trigger(fieldsToValidate)

    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getFieldsForStep = (step: number): (keyof QuoteFormData)[] => {
    switch (step) {
      case 1:
        return ['customerName', 'customerEmail', 'customerPhone']
      case 2:
        return ['rentalDays']
      case 3:
        return []
      default:
        return []
    }
  }

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const response = await fetch('/api/orcamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          customerCompany: data.customerCompany || null,
          message: data.message || null,
          items: data.equipmentId
            ? [
                {
                  equipmentId: data.equipmentId,
                  quantity: 1,
                  days: data.rentalDays,
                },
              ]
            : [],
          urgency: data.urgency,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: 'Orçamento Solicitado! 🎉',
          description: 'Entraremos em contato em até 2 horas úteis.',
        })

        if (onSuccess) {
          onSuccess(data)
        }

        // Reset form
        setCurrentStep(1)
      } else {
        throw new Error(result.message || 'Erro ao enviar orçamento')
      }
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error)
      toast({
        title: 'Erro ao Enviar',
        description:
          error instanceof Error
            ? error.message
            : 'Tente novamente em alguns instantes.',
        variant: 'destructive',
      })
    } finally {
      // fim envio (estado visual removido)
    }
  }

  const handleWhatsAppSubmit = () => {
    const data = watchedData

    // Validação: campos obrigatórios
    if (
      !data.customerName.trim() ||
      !data.customerEmail.trim() ||
      !data.customerPhone.trim()
    ) {
      toast({
        title: 'Erro de Validação',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }

    try {
      // Converter dados para formato WhatsApp
      const whatsappData = convertFormDataToWhatsApp(
        {
          name: data.customerName,
          phone: data.customerPhone,
          email: data.customerEmail,
          message: data.message || undefined,
        },
        data.equipmentId && data.equipmentName
          ? [
              {
                name: data.equipmentName,
                quantity: 1,
                days: data.rentalDays,
                pricePerDay: 0, // Será calculado pelo sistema
                finalPrice: 0, // Será calculado pelo sistema
                id: data.equipmentId,
              },
            ]
          : []
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

  const stepTitles = ['Seus Dados', 'Equipamento & Período', 'Detalhes Finais']

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <Phone className="w-5 h-5" />
      case 2:
        return <Package className="w-5 h-5" />
      case 3:
        return <MessageSquare className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <Card
      className={
        variant === 'modal' ? 'w-full max-w-2xl' : 'w-full max-w-4xl mx-auto'
      }
    >
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            {getStepIcon(currentStep)}
            Solicitar Orçamento
          </CardTitle>
          {variant === 'modal' && onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-white hover:bg-white/20"
            >
              ×
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            {stepTitles.map((title, index) => (
              <span
                key={index}
                className={`${
                  currentStep > index + 1
                    ? 'text-green-200'
                    : currentStep === index + 1
                      ? 'text-white font-semibold'
                      : 'text-orange-200'
                }`}
              >
                {currentStep > index + 1 && (
                  <Check className="w-4 h-4 inline mr-1" />
                )}
                {title}
              </span>
            ))}
          </div>
          <div className="w-full bg-orange-400/30 rounded-full h-2">
            <motion.div
              className="bg-white h-2 rounded-full"
              initial={{ width: '33%' }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} suppressHydrationWarning>
          <AnimatePresence mode="wait">
            {/* Etapa 1: Informações Pessoais */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="customerName"
                      className="flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Nome Completo *
                    </Label>
                    <Controller
                      name="customerName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="customerName"
                          placeholder="Seu nome completo"
                          className={
                            errors.customerName ? 'border-red-500' : ''
                          }
                        />
                      )}
                    />
                    {errors.customerName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="customerPhone"
                      className="flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Telefone/WhatsApp *
                    </Label>
                    <Controller
                      name="customerPhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="customerPhone"
                          type="tel"
                          placeholder="(51) 99999-9999"
                          className={
                            errors.customerPhone ? 'border-red-500' : ''
                          }
                        />
                      )}
                    />
                    {errors.customerPhone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.customerPhone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="customerEmail"
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    E-mail *
                  </Label>
                  <Controller
                    name="customerEmail"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="customerEmail"
                        type="email"
                        placeholder="contato@locacoesgb.com.br"
                        className={errors.customerEmail ? 'border-red-500' : ''}
                      />
                    )}
                  />
                  {errors.customerEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customerEmail.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="customerCompany"
                    className="flex items-center gap-2"
                  >
                    <Building className="w-4 h-4" />
                    Empresa (opcional)
                  </Label>
                  <Controller
                    name="customerCompany"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="customerCompany"
                        placeholder="Nome da sua empresa"
                      />
                    )}
                  />
                </div>
              </motion.div>
            )}

            {/* Etapa 2: Equipamento e Período */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {prefilledEquipment ? (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-700 mb-2">
                      Equipamento selecionado:
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800"
                    >
                      {prefilledEquipment.name}
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <Label
                      htmlFor="equipmentName"
                      className="flex items-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      Equipamento de Interesse
                    </Label>
                    <Controller
                      name="equipmentName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="equipmentName"
                          placeholder="Ex: Betoneira, Andaime Suspenso, etc."
                        />
                      )}
                    />
                  </div>
                )}

                <div>
                  <Label
                    htmlFor="rentalDays"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Período de Locação (dias) *
                  </Label>
                  <Controller
                    name="rentalDays"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        max="365"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className={errors.rentalDays ? 'border-red-500' : ''}
                      />
                    )}
                  />
                  {errors.rentalDays && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.rentalDays.message}
                    </p>
                  )}

                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[7, 15, 30].map((days) => (
                      <Button
                        key={days}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setValue('rentalDays', days)}
                        className={
                          watchedData.rentalDays === days
                            ? 'bg-orange-100 border-orange-300'
                            : ''
                        }
                      >
                        {days} dias
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    Urgência do Projeto
                  </Label>
                  <Controller
                    name="urgency"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          {
                            value: 'baixa',
                            label: 'Baixa',
                            color: 'bg-green-100 text-green-800',
                          },
                          {
                            value: 'media',
                            label: 'Média',
                            color: 'bg-yellow-100 text-yellow-800',
                          },
                          {
                            value: 'alta',
                            label: 'Alta',
                            color: 'bg-red-100 text-red-800',
                          },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant="outline"
                            onClick={() => onChange(option.value)}
                            className={
                              value === option.value ? option.color : ''
                            }
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </motion.div>
            )}

            {/* Etapa 3: Detalhes Finais */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Informações Adicionais (opcional)
                  </Label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        id="message"
                        placeholder="Detalhes específicos do projeto, endereço de entrega, horário preferencial..."
                        rows={4}
                      />
                    )}
                  />
                </div>

                {/* Resumo do Orçamento */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold mb-3">Resumo do Orçamento</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Nome:</span>
                      <span className="font-medium">
                        {watchedData.customerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipamento:</span>
                      <span className="font-medium">
                        {watchedData.equipmentName ||
                          prefilledEquipment?.name ||
                          'A definir'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Período:</span>
                      <span className="font-medium">
                        {watchedData.rentalDays} dias
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Urgência:</span>
                      <span className="font-medium capitalize">
                        {watchedData.urgency}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={previousStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
              >
                Próximo
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleWhatsAppSubmit}
                disabled={!isValid}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 w-full hover:scale-105 transition-transform duration-200"
                size="lg"
              >
                <Check className="w-4 h-4" />
                Solicitar Orçamento
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
