'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ClientAreaBadge } from '@/components/ui/client-area-badge'
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
  contract?: {
    id: string
    pdfUrl: string | null
    status: string
    signedAt: string | null
    zapSignId: string | null
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
    color: 'bg-orange-100 text-orange-800',
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

  const fetchRental = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/client/rentals/${params.id}`)
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Locação não encontrada')
          router.push('/area-cliente/historico')
          return
        }
        throw new Error('Erro ao carregar locação')
      }

      const data = await response.json()
      setRental(data.rental)
    } catch (error) {
      console.error('Error fetching rental:', error)
      toast.error('Erro ao carregar locação')
      router.push('/area-cliente/historico')
    } finally {
      setLoading(false)
    }
  }, [params.id, router])

  useEffect(() => {
    if (params.id) {
      fetchRental()
    }
  }, [params.id, fetchRental])

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

  const formatDateShort = (dateString: string | null | undefined) => {
    if (!dateString) return 'Não definido'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'Data inválida'
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    } catch {
      return 'Data inválida'
    }
  }

  const getStatusInfo = (status: string) => {
    return (
      statusConfig[status] || {
        label: 'Desconhecido',
        color: 'bg-gray-100 text-gray-800',
        icon: Clock,
      }
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
        <Card className="max-w-md rounded-2xl shadow-xl border-0">
          <CardContent className="p-12 text-center">
            <div className="p-6 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
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

  const statusInfo = getStatusInfo(rental.status)
  const StatusIcon = statusInfo.icon
  const equipmentNames = rental.rental_items
    .map((item) => item.equipments.name)
    .join(', ')

  return (
    <div className="min-h-screen bg-gray-50 pt-[84px] sm:pt-0">
      {/* Hero Section com Identidade Visual Completa */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden w-screen -ml-4 sm:w-full sm:ml-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="ghost"
              onClick={() => router.push('/area-cliente/historico')}
              className="mb-4 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Histórico
            </Button>
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold leading-tight">
                Detalhes da Locação
              </h1>
              <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                {equipmentNames}
              </p>
              <div className="flex justify-center">
                <ClientAreaBadge
                  className={`${statusInfo.color} px-4 py-2 rounded-full font-medium text-sm`}
                >
                  <StatusIcon className="h-4 w-4 mr-2" />
                  {statusInfo.label}
                </ClientAreaBadge>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Onda SVG no final */}
        <div className="relative w-full overflow-hidden">
          <svg
            className="relative block w-full h-12"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-gray-50"
            />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="-mt-20 lg:py-10 md:-mt-24 md:py-16 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Equipamentos */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
                  <CardHeader className="relative z-10 pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                      <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                        <Package className="h-5 w-5" />
                      </div>
                      Equipamentos
                    </CardTitle>
                    <CardDescription>
                      {rental.rental_items.length} item(s) na locação
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-0 space-y-4">
                    {rental.rental_items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
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
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span>Qtd: {item.quantity}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>{item.totaldays} dias</span>
                              </div>
                            </div>
                          </div>
                          <p className="font-bold text-lg text-orange-600">
                            {formatCurrency(item.totalprice)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Período */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
                  <CardHeader className="relative z-10 pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                        <Calendar className="h-5 w-5" />
                      </div>
                      Período de Locação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all duration-300">
                        <p className="text-sm text-gray-500 mb-1">
                          Data de Início
                        </p>
                        <p className="font-medium text-gray-900">
                          {formatDateShort(rental.startdate)}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all duration-300">
                        <p className="text-sm text-gray-500 mb-1">
                          Data de Término
                        </p>
                        <p className="font-medium text-gray-900">
                          {formatDateShort(rental.enddate)}
                        </p>
                      </div>
                      {rental.extensionDays && (
                        <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                          <p className="text-sm text-yellow-700 mb-1">
                            Prorrogação
                          </p>
                          <p className="font-medium text-yellow-900">
                            {rental.extensionDays} dias adicionais
                          </p>
                        </div>
                      )}
                      {rental.lateFee && (
                        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                          <p className="text-sm text-red-700 mb-1">
                            Multa por Atraso
                          </p>
                          <p className="font-medium text-red-900">
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
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-50"></div>
                    <CardHeader className="relative z-10 pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                          <Truck className="h-5 w-5" />
                        </div>
                        Entregas e Coletas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10 pt-0 space-y-4">
                      {rental.deliveries.map((delivery) => (
                        <div
                          key={delivery.id}
                          className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <ClientAreaBadge
                                className={
                                  delivery.type === 'DELIVERY'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-purple-100 text-purple-800'
                                }
                              >
                                {delivery.type === 'DELIVERY'
                                  ? 'Entrega'
                                  : 'Coleta'}
                              </ClientAreaBadge>
                              <p className="text-sm text-gray-500 mt-2">
                                {formatDate(delivery.scheduledAt)}
                              </p>
                            </div>
                            <ClientAreaBadge
                              className={
                                delivery.status === 'COMPLETED'
                                  ? 'bg-green-100 text-green-800'
                                  : delivery.status === 'IN_TRANSIT'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-blue-100 text-blue-800'
                              }
                            >
                              {delivery.status === 'COMPLETED'
                                ? 'Concluído'
                                : delivery.status === 'IN_TRANSIT'
                                  ? 'Em Trânsito'
                                  : 'Agendado'}
                            </ClientAreaBadge>
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
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Linha do Tempo */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
                  <CardHeader className="relative z-10 pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                      <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg text-white">
                        <Clock className="h-5 w-5" />
                      </div>
                      Linha do Tempo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-0">
                    <RentalTimeline
                      steps={[
                        {
                          id: '1',
                          label: 'Orçamento Criado',
                          status: 'completed',
                          description:
                            'Orçamento foi criado e está aguardando aprovação',
                          date: rental.quote?.id
                            ? new Date(rental.quote.id)
                            : new Date(rental.startdate),
                        },
                        {
                          id: '2',
                          label: 'Orçamento Aprovado',
                          status:
                            rental.status !== 'PENDING'
                              ? 'completed'
                              : 'pending',
                          description:
                            'Orçamento foi aprovado e convertido em locação',
                          date: new Date(rental.startdate),
                        },
                        ...(rental.deliveries?.map((delivery, idx) => ({
                          id: `delivery-${idx}`,
                          label:
                            delivery.type === 'DELIVERY'
                              ? 'Entrega Agendada'
                              : 'Coleta Agendada',
                          status: (delivery.status === 'COMPLETED'
                            ? 'completed'
                            : delivery.status === 'IN_TRANSIT'
                              ? 'current'
                              : 'pending') as
                            | 'completed'
                            | 'current'
                            | 'pending',
                          description:
                            delivery.type === 'DELIVERY'
                              ? 'Equipamentos serão entregues no endereço informado'
                              : 'Equipamentos serão coletados no endereço informado',
                          date: new Date(delivery.scheduledAt),
                        })) || []),
                        {
                          id: '3',
                          label: 'Locação Ativa',
                          status: (rental.status === 'ACTIVE'
                            ? 'current'
                            : rental.status === 'COMPLETED'
                              ? 'completed'
                              : 'pending') as
                            | 'completed'
                            | 'current'
                            | 'pending',
                          description: 'Locação está em andamento',
                          date: new Date(rental.startdate),
                        },
                        ...(rental.payments?.map((payment, idx) => ({
                          id: `payment-${idx}`,
                          label: `Pagamento - ${payment.method}`,
                          status: (payment.status === 'PAID'
                            ? 'completed'
                            : 'pending') as 'completed' | 'current' | 'pending',
                          description: `Valor de ${formatCurrency(payment.amount)}`,
                          date: new Date(payment.dueDate),
                        })) || []),
                        {
                          id: '4',
                          label: 'Locação Concluída',
                          status:
                            rental.status === 'COMPLETED'
                              ? 'completed'
                              : 'pending',
                          description: 'Locação foi finalizada com sucesso',
                          date: new Date(rental.enddate),
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Pagamentos */}
              {rental.payments && rental.payments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50"></div>
                    <CardHeader className="relative z-10 pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                        <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        Pagamentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10 pt-0 space-y-3">
                      {rental.payments.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(payment.amount)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {payment.method}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Vencimento: {formatDateShort(payment.dueDate)}
                            </p>
                          </div>
                          <ClientAreaBadge
                            className={
                              payment.paidAt
                                ? 'bg-green-100 text-green-800'
                                : 'bg-orange-100 text-orange-800'
                            }
                          >
                            {payment.paidAt ? 'Pago' : 'Pendente'}
                          </ClientAreaBadge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Resumo */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50"></div>
                  <CardHeader className="relative z-10 pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      Resumo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-0 space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                      <p className="text-sm text-gray-500 mb-1">Total</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(rental.total)}
                      </p>
                    </div>
                    {rental.lateFee && (
                      <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                        <p className="text-sm text-red-700 mb-1">Multa</p>
                        <p className="text-lg font-semibold text-red-900">
                          {formatCurrency(rental.lateFee)}
                        </p>
                      </div>
                    )}
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                      <p className="text-sm text-orange-700 mb-1">
                        Total a Pagar
                      </p>
                      <p className="text-2xl font-bold text-orange-600">
                        {formatCurrency(rental.total + (rental.lateFee || 0))}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Ações */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
                  <CardHeader className="relative z-10 pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Ações
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-0 space-y-3">
                    {(rental.status === 'ACTIVE' ||
                      rental.status === 'OVERDUE') && (
                      <>
                        <Button
                          variant="outline"
                          className="w-full bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
                          onClick={async () => {
                            const days = prompt(
                              'Quantos dias deseja prorrogar? (máximo 30 dias)',
                              '7'
                            )
                            if (!days) return

                            const extensionDays = parseInt(days, 10)
                            if (
                              isNaN(extensionDays) ||
                              extensionDays < 1 ||
                              extensionDays > 30
                            ) {
                              toast.error(
                                'Por favor, insira um número válido entre 1 e 30'
                              )
                              return
                            }

                            try {
                              const response = await fetch(
                                `/api/client/rentals/${rental.id}/extend`,
                                {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({ extensionDays }),
                                }
                              )
                              if (response.ok) {
                                const data = await response.json()
                                toast.success(
                                  `Prorrogação de ${extensionDays} dias solicitada com sucesso. Taxa adicional: ${formatCurrency(data.extensionFee || 0)}`
                                )
                                fetchRental()
                              } else {
                                const error = await response.json()
                                toast.error(
                                  error.error || 'Erro ao solicitar prorrogação'
                                )
                              }
                            } catch {
                              toast.error('Erro ao solicitar prorrogação')
                            }
                          }}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Solicitar Prorrogação
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
                          onClick={async () => {
                            if (
                              !confirm(
                                'Deseja solicitar a coleta do equipamento? Nossa equipe entrará em contato para agendar.'
                              )
                            ) {
                              return
                            }

                            try {
                              const response = await fetch(
                                `/api/client/rentals/${rental.id}/request-pickup`,
                                {
                                  method: 'POST',
                                }
                              )
                              if (response.ok) {
                                toast.success(
                                  'Solicitação de coleta enviada. Nossa equipe entrará em contato em breve.'
                                )
                                fetchRental()
                              } else {
                                const error = await response.json()
                                toast.error(
                                  error.error || 'Erro ao solicitar coleta'
                                )
                              }
                            } catch {
                              toast.error('Erro ao solicitar coleta')
                            }
                          }}
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Solicitar Coleta
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      className="w-full bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
                      asChild
                    >
                      <Link href={`tel:+5551999999999`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Entrar em Contato
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
                      onClick={async () => {
                        try {
                          const response = await fetch(
                            `/api/contracts/${rental.id}/download`
                          )
                          if (response.ok) {
                            // Se for HTML, criar blob e fazer download
                            const blob = await response.blob()
                            const url = window.URL.createObjectURL(blob)
                            const a = document.createElement('a')
                            a.href = url
                            a.download = `contrato-${rental.id}.html`
                            document.body.appendChild(a)
                            a.click()
                            window.URL.revokeObjectURL(url)
                            document.body.removeChild(a)
                            toast.success('Contrato baixado com sucesso')
                          } else if (
                            response.status === 302 ||
                            response.redirected
                          ) {
                            // Se for redirecionamento para PDF, abrir em nova aba
                            window.open(response.url, '_blank')
                          } else {
                            toast.error('Erro ao baixar contrato')
                          }
                        } catch {
                          toast.error('Erro ao baixar contrato')
                        }
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Contrato
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
