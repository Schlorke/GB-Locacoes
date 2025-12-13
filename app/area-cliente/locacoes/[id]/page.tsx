'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import {
  Package,
  Calendar,
  DollarSign,
  MapPin,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Download,
  Phone,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { RentalTimeline } from '@/components/client/rental-timeline'

interface Rental {
  id: string
  startdate: string
  enddate: string
  total: number
  status: string
  lateFee?: number
  extensionDays?: number
  checkInAt?: string
  checkOutAt?: string
  notes?: string
  rental_items: Array<{
    id: string
    quantity: number
    totaldays: number
    totalprice: number
    equipments: {
      id: string
      name: string
      images: string[]
      category?: {
        name: string
      }
    }
  }>
  payments?: Array<{
    id: string
    amount: number
    status: string
    method: string
    dueDate: string
    paidAt: string | null
  }>
  deliveries?: Array<{
    id: string
    type: string
    status: string
    scheduledAt: string
    completedAt: string | null
    address: {
      street?: string
      city?: string
      state?: string
    }
  }>
  quote?: {
    id: string
    name: string
    email: string
  }
}

const statusConfig: Record<
  string,
  {
    label: string
    color: string
    icon: React.ComponentType<{ className?: string }>
  }
> = {
  PENDING: {
    label: 'Pendente',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock,
  },
  ACTIVE: {
    label: 'Ativa',
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle,
  },
  COMPLETED: {
    label: 'Concluída',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
  },
  OVERDUE: {
    label: 'Atrasada',
    color: 'bg-red-100 text-red-800',
    icon: AlertTriangle,
  },
}

export default function RentalDetailsPage() {
  const { data: _session } = useSession()
  const params = useParams()
  const router = useRouter()
  const [rental, setRental] = useState<Rental | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchRental = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/client/rentals/${params.id}`)
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Locação não encontrada')
          router.push('/area-cliente/locacoes')
          return
        }
        throw new Error('Erro ao carregar locação')
      }

      const data = await response.json()
      setRental(data.rental)
    } catch (error) {
      console.error('Error fetching rental:', error)
      toast.error('Erro ao carregar locação')
      router.push('/area-cliente/locacoes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchRental()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Não definido'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'Data inválida'
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return 'Data inválida'
    }
  }

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status] || statusConfig.PENDING
    if (!config) return null
    const Icon = config.icon

    return (
      <Badge
        variant="outline"
        className={cn('flex items-center gap-1.5 font-medium', config.color)}
      >
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!rental) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Locação não encontrada
            </h3>
            <Button asChild className="mt-4">
              <Link href="/area-cliente">Voltar para Área do Cliente</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[84px] sm:pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/area-cliente')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Detalhes da Locação
              </h1>
              <p className="text-gray-600 mt-2">ID: {rental.id}</p>
            </div>
            {getStatusBadge(rental.status)}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Equipamentos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Equipamentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rental.rental_items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {item.equipments.name}
                            </p>
                            {item.equipments.category && (
                              <p className="text-sm text-gray-500">
                                {item.equipments.category.name}
                              </p>
                            )}
                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                              <span>Quantidade: {item.quantity}</span>
                              <span>Dias: {item.totaldays}</span>
                            </div>
                          </div>
                          <p className="font-bold text-lg text-orange-600">
                            {formatCurrency(item.totalprice)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Período */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Período de Locação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Data de Início
                      </p>
                      <p className="font-medium">
                        {formatDate(rental.startdate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Data de Término
                      </p>
                      <p className="font-medium">
                        {formatDate(rental.enddate)}
                      </p>
                    </div>
                    {rental.extensionDays && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Prorrogação
                        </p>
                        <p className="font-medium">
                          {rental.extensionDays} dias adicionais
                        </p>
                      </div>
                    )}
                    {rental.lateFee && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Multa por Atraso
                        </p>
                        <p className="font-medium text-red-600">
                          {formatCurrency(rental.lateFee)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Entregas e Coletas */}
            {rental.deliveries && rental.deliveries.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Entregas e Coletas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rental.deliveries.map((delivery) => (
                        <div
                          key={delivery.id}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Badge variant="outline">
                                {delivery.type === 'DELIVERY'
                                  ? 'Entrega'
                                  : 'Coleta'}
                              </Badge>
                              <p className="text-sm text-gray-500 mt-2">
                                {formatDate(delivery.scheduledAt)}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                delivery.status === 'COMPLETED'
                                  ? 'bg-green-100 text-green-800'
                                  : delivery.status === 'IN_TRANSIT'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-blue-100 text-blue-800'
                              }
                            >
                              {delivery.status}
                            </Badge>
                          </div>
                          {delivery.address && (
                            <div className="flex items-start gap-2 mt-2">
                              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                              <p className="text-sm text-gray-700">
                                {delivery.address.street || ''}
                                {delivery.address.city &&
                                  `, ${delivery.address.city}`}
                                {delivery.address.state &&
                                  ` - ${delivery.address.state}`}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Linha do Tempo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Linha do Tempo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RentalTimeline
                    events={[
                      {
                        id: '1',
                        type: 'quote',
                        title: 'Orçamento Criado',
                        description:
                          'Orçamento foi criado e está aguardando aprovação',
                        date: rental.quote?.id || rental.startdate,
                        completed: true,
                      },
                      {
                        id: '2',
                        type: 'approved',
                        title: 'Orçamento Aprovado',
                        description:
                          'Orçamento foi aprovado e convertido em locação',
                        date: rental.startdate,
                        completed: rental.status !== 'PENDING',
                      },
                      ...(rental.deliveries?.map((delivery, idx) => ({
                        id: `delivery-${idx}`,
                        type: (delivery.type === 'DELIVERY'
                          ? 'delivery'
                          : 'return') as 'delivery' | 'return',
                        title:
                          delivery.type === 'DELIVERY'
                            ? 'Entrega Agendada'
                            : 'Coleta Agendada',
                        description:
                          delivery.type === 'DELIVERY'
                            ? 'Equipamentos serão entregues no endereço informado'
                            : 'Equipamentos serão coletados no endereço informado',
                        date: delivery.scheduledAt,
                        completed: delivery.status === 'COMPLETED',
                      })) || []),
                      {
                        id: '3',
                        type: 'active' as const,
                        title: 'Locação Ativa',
                        description: 'Locação está em andamento',
                        date: rental.startdate,
                        completed:
                          rental.status === 'ACTIVE' ||
                          rental.status === 'COMPLETED',
                      },
                      ...(rental.payments?.map((payment, idx) => ({
                        id: `payment-${idx}`,
                        type: 'payment' as const,
                        title: `Pagamento - ${payment.method}`,
                        description: `Valor de ${formatCurrency(payment.amount)}`,
                        date: payment.dueDate,
                        completed: payment.status === 'PAID',
                      })) || []),
                      {
                        id: '4',
                        type: 'completed' as const,
                        title: 'Locação Concluída',
                        description: 'Locação foi finalizada com sucesso',
                        date: rental.enddate,
                        completed: rental.status === 'COMPLETED',
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Pagamentos */}
            {rental.payments && rental.payments.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Pagamentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {rental.payments.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(payment.amount)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {payment.method} - {payment.status}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Vencimento: {formatDate(payment.dueDate)}
                            </p>
                          </div>
                          {payment.paidAt && (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800"
                            >
                              Pago em {formatDate(payment.paidAt)}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resumo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Resumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(rental.total)}
                    </p>
                  </div>
                  {rental.lateFee && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Multa</p>
                      <p className="text-lg font-semibold text-red-600">
                        {formatCurrency(rental.lateFee)}
                      </p>
                    </div>
                  )}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-1">Total a Pagar</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(rental.total + (rental.lateFee || 0))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ações */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(rental.status === 'ACTIVE' ||
                    rental.status === 'OVERDUE') && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={async () => {
                        try {
                          const response = await fetch(
                            `/api/client/rentals/${rental.id}/extend`,
                            {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ extensionDays: 7 }),
                            }
                          )
                          if (response.ok) {
                            toast.success('Prorrogação solicitada com sucesso')
                            fetchRental()
                          } else {
                            toast.error('Erro ao solicitar prorrogação')
                          }
                        } catch (_error) {
                          toast.error('Erro ao solicitar prorrogação')
                        }
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Solicitar Prorrogação
                    </Button>
                  )}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`tel:+5551999999999`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Entrar em Contato
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Contrato
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
