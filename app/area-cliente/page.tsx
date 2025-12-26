'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  Clock,
  ShoppingCart,
  TrendingUp,
  Plus,
  Package,
  Eye,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  XCircle,
  ArrowRight,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useCartStore, type CartItem } from '@/stores/useCartStore'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getAutoRentalDateRange } from '@/lib/rental-date-utils'
import { getPricingConfig, calculateIntelligentPrice } from '@/lib/pricing'

interface Rental {
  id: string
  startdate: string
  enddate: string
  total: number
  status: string
  createdat?: string | Date | null
  rental_items: Array<{
    id: string
    quantity: number
    totaldays: number
    equipments: {
      id: string
      name: string
      images: string[]
    }
  }>
  payments?: Array<{
    id: string
    amount: number
    status: string
    method: string
  }>
}

interface Activity {
  id: string
  type:
    | 'quote_created'
    | 'quote_approved'
    | 'quote_rejected'
    | 'rental_created'
    | 'rental_completed'
    | 'payment_made'
    | 'rental_updated'
  title: string
  description: string
  timestamp: string
  link?: string
  metadata?: {
    amount?: number
    status?: string
    itemCount?: number
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

export default function AreaClientePage() {
  const { data: session } = useSession()
  const { getItemCount, getTotalPrice, items: cartItems } = useCartStore()
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)
  const [quotesCount, setQuotesCount] = useState(0)
  const [activities, setActivities] = useState<Activity[]>([])
  const [activitiesLoading, setActivitiesLoading] = useState(true)
  const [dismissedActivities, setDismissedActivities] = useState<Set<string>>(
    new Set()
  )
  const requestReferenceDate = useRef(new Date())

  const fetchQuotesCount = useCallback(async () => {
    try {
      // Fetch quotes from the quotes API (authenticated user)
      const response = await fetch('/api/quotes?userId=' + session?.user?.id)
      if (response.ok) {
        const data = await response.json()
        // If it's an array, count it; otherwise try to get count from response
        if (Array.isArray(data)) {
          setQuotesCount(data.length)
        } else if (data.quotes && Array.isArray(data.quotes)) {
          setQuotesCount(data.quotes.length)
        } else if (typeof data.count === 'number') {
          setQuotesCount(data.count)
        }
      }
    } catch (error) {
      console.error('Error fetching quotes count:', error)
      // Don't show error to user, just keep default 0
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (session?.user) {
      fetchRentals()
      fetchQuotesCount()
      fetchActivities()
      // Carregar atividades removidas do localStorage
      const stored = localStorage.getItem('gb-locacoes-dismissed-activities')
      if (stored) {
        try {
          const dismissed = JSON.parse(stored)
          setDismissedActivities(new Set(dismissed))
        } catch {
          // Ignorar erro de parsing
        }
      }
    }
  }, [session, fetchQuotesCount])

  const fetchRentals = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/client/rentals')
      if (!response.ok) throw new Error('Erro ao carregar locações')

      const data = await response.json()
      setRentals(data.rentals || [])
    } catch (error) {
      console.error('Error fetching rentals:', error)
      toast.error('Erro ao carregar locações')
      setRentals([])
    } finally {
      setLoading(false)
    }
  }

  const fetchActivities = async () => {
    try {
      setActivitiesLoading(true)
      const response = await fetch('/api/client/activities?limit=10')
      if (response.ok) {
        const data = await response.json()
        setActivities(data.activities || [])
      }
    } catch (error) {
      console.error('Error fetching activities:', error)
      setActivities([])
    } finally {
      setActivitiesLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    } catch {
      return 'Data inválida'
    }
  }

  const formatDateTime = (dateString: string | Date | null | undefined) => {
    if (!dateString) return ''
    try {
      const date =
        typeof dateString === 'string' ? new Date(dateString) : dateString
      if (isNaN(date.getTime())) return ''
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return ''
    }
  }

  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diffInSeconds < 60) {
        return 'há alguns segundos'
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`
      } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400)
        return `há ${days} ${days === 1 ? 'dia' : 'dias'}`
      } else {
        return formatDate(dateString)
      }
    } catch {
      return 'Data inválida'
    }
  }

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'quote_created':
        return FileText
      case 'quote_approved':
        return CheckCircle
      case 'quote_rejected':
        return XCircle
      case 'rental_created':
        return Package
      case 'rental_completed':
        return CheckCircle
      case 'payment_made':
        return DollarSign
      case 'rental_updated':
        return Clock
      default:
        return Clock
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'quote_created':
        return 'text-blue-600 bg-blue-100'
      case 'quote_approved':
        return 'text-green-600 bg-green-100'
      case 'quote_rejected':
        return 'text-red-600 bg-red-100'
      case 'rental_created':
        return 'text-purple-600 bg-purple-100'
      case 'rental_completed':
        return 'text-green-600 bg-green-100'
      case 'payment_made':
        return 'text-emerald-600 bg-emerald-100'
      case 'rental_updated':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const dismissActivity = (activityId: string) => {
    const newDismissed = new Set(dismissedActivities)
    newDismissed.add(activityId)
    setDismissedActivities(newDismissed)
    // Salvar no localStorage
    localStorage.setItem(
      'gb-locacoes-dismissed-activities',
      JSON.stringify(Array.from(newDismissed))
    )
    toast.success('Atividade removida do histórico')
  }

  // Helper para formatar datas do carrinho (trata Date ou string do localStorage)
  const formatCartDate = useCallback(
    (date: Date | string | undefined): string => {
      if (!date) return ''
      const dateObj = typeof date === 'string' ? new Date(date) : date
      if (isNaN(dateObj.getTime())) return ''
      return format(dateObj, 'dd/MM/yyyy', { locale: ptBR })
    },
    []
  )

  const resolveDateRange = (equipment: CartItem) => {
    if (equipment.startDate && equipment.endDate) {
      const startDate =
        equipment.startDate instanceof Date
          ? equipment.startDate
          : new Date(equipment.startDate)
      const endDate =
        equipment.endDate instanceof Date
          ? equipment.endDate
          : new Date(equipment.endDate)

      return { startDate, endDate, isAuto: false }
    }

    const days = Number(equipment.days) || 1
    const includeWeekends = equipment.includeWeekends ?? false
    const { startDate, endDate } = getAutoRentalDateRange({
      requestDate: requestReferenceDate.current,
      days,
      includeWeekends,
    })

    return { startDate, endDate, isAuto: true }
  }

  const calculateSubtotal = (equipment: CartItem) => {
    const quantity = Number(equipment.quantity) || 1
    const days = Number(equipment.days) || 1
    const intelligentPrice = calculateIntelligentPrice(equipment, days)
    return intelligentPrice * quantity
  }

  const getEquipmentImage = (equipment: CartItem) => {
    if (
      equipment.images &&
      equipment.images.length > 0 &&
      equipment.images[0] &&
      equipment.images[0].trim() !== ''
    ) {
      return equipment.images[0]
    }
    return `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(equipment.equipmentName)}`
  }

  const activeRentals = rentals.filter(
    (r) => r.status === 'ACTIVE' || r.status === 'PENDING'
  )
  const _completedRentals = rentals.filter((r) => r.status === 'COMPLETED')

  return (
    <div
      className="min-h-screen bg-gray-50 pt-[84px] sm:pt-0"
      id="area-cliente-dashboard"
    >
      {/* Hero Section com Identidade Visual Completa */}
      <section
        className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden w-screen -ml-4 sm:w-full sm:ml-0"
        id="dashboard-banner"
      >
        {/* Elementos animados de background removidos nesta seção da área do cliente */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-14 relative z-10">
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold leading-tight">
              Bem-vindo de volta,
              <span className="text-yellow-300 relative block mt-1">
                {session?.user?.name || 'Cliente'}!
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-yellow-300/90 rounded-full"></div>
              </span>
            </h1>
            <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto">
              Gerencie seus orçamentos, acompanhe suas locações e tenha controle
              total sobre seus equipamentos
            </p>
          </motion.div>
        </div>

        {/* Onda SVG no final */}
        <div className="relative w-full overflow-hidden">
          <svg
            className="relative block w-full h-6"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Dashboard Principal - LAYOUT OTIMIZADO */}
      <section className="py-12 md:py-16 lg:py-10 relative -mt-20 md:-mt-24 overflow-visible">
        <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible">
          {/* Stats Grid - 1 coluna em mobile, 3 colunas em desktop */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Card Carrinho - Padrão Histórico */}
            <Link href="/orcamento" className="flex-1 h-full">
              <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between h-full">
                    <div className="flex flex-col justify-center h-full">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Carrinho
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">
                        {getItemCount()}
                      </p>
                      <p className="text-sm text-gray-500">
                        itens selecionados
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                      <ShoppingCart className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card Orçamentos - Padrão Histórico */}
            <Link href="/area-cliente/orcamentos" className="flex-2 h-full">
              <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between h-full">
                    <div className="flex flex-col justify-center h-full">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Orçamentos
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">
                        {quotesCount}
                      </p>
                      <p className="text-sm text-gray-500">solicitações</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card Total - Padrão Histórico */}
            <Link href="/orcamento" className="flex-3 h-full">
              <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between h-full">
                    <div className="flex flex-col justify-center h-full">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Total Estimado
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">
                        R$ {getTotalPrice().toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">no carrinho</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Seções Principais - Layout Proporcional à linha superior */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Meu Carrinho - Layout com Botões no Fundo */}
            <Card className="relative overflow-visible bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full border-0">
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  Meu Carrinho
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 p-6 lg:px-6 pt-0 pb-8 flex flex-col flex-1 overflow-visible">
                {getItemCount() > 0 ? (
                  <div className="flex flex-col flex-1 min-h-0 overflow-visible">
                    {/* Bloco unificado com itens e total */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-md flex-1 flex flex-col min-h-0 overflow-visible">
                      {/* Lista de itens do carrinho - padding para sombras */}
                      <div className="space-y-4 p-5 flex-1 overflow-y-auto min-h-0">
                        {cartItems.map((equipment, index) => {
                          const displayRange = resolveDateRange(equipment)
                          const pricingConfig = getPricingConfig(
                            equipment,
                            equipment.days
                          )
                          const actualPeriodLabel =
                            pricingConfig.period === 'daily'
                              ? 'Diário'
                              : pricingConfig.period === 'weekly'
                                ? 'Semanal'
                                : pricingConfig.period === 'biweekly'
                                  ? 'Quinzenal'
                                  : pricingConfig.period === 'monthly'
                                    ? 'Mensal'
                                    : 'Diário'
                          const finalPrice = calculateSubtotal(equipment)

                          return (
                            <div
                              key={`cart-item-${equipment.equipmentId}-${index}`}
                              className="flex gap-3 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              {/* Thumbnail */}
                              <div className="flex-shrink-0">
                                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src={getEquipmentImage(equipment)}
                                    alt={equipment.equipmentName}
                                    fill
                                    className="object-cover"
                                    sizes="56px"
                                  />
                                </div>
                              </div>

                              {/* Detalhes */}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm leading-tight mb-1">
                                  {equipment.equipmentName}
                                </p>
                                <div className="flex flex-wrap gap-1 mb-1">
                                  <span className="text-xs text-gray-600 font-medium">
                                    Qtd: {equipment.quantity}x
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    ·
                                  </span>
                                  <span className="text-xs text-orange-600 font-medium">
                                    {actualPeriodLabel}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    ·
                                  </span>
                                  <span className="text-xs text-gray-600 font-medium">
                                    {equipment.days} dias
                                  </span>
                                </div>
                                {displayRange && (
                                  <div className="text-xs text-gray-600 mb-1">
                                    {formatCartDate(displayRange.startDate)} até{' '}
                                    {formatCartDate(displayRange.endDate)}
                                    {displayRange.isAuto && (
                                      <span className="text-[10px] text-gray-500">
                                        {' '}
                                        (previsto)
                                      </span>
                                    )}
                                  </div>
                                )}
                                <div className="text-sm font-semibold text-green-600">
                                  {formatCurrency(finalPrice)}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Total estimado - Separador e valor - Fixo na parte inferior */}
                      <div className="border-t-2 border-orange-200 mx-5 pt-3 pb-5 mt-auto">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                            Total Estimado
                          </p>
                          <p className="text-xl md:text-2xl font-bold text-orange-600">
                            {formatCurrency(getTotalPrice())}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Botões fixos na parte inferior */}
                    <div className="flex flex-col sm:flex-row justify-center gap-2 mt-6">
                      <Button
                        size="default"
                        asChild
                        className="w-full sm:flex-1 h-10"
                      >
                        <Link href="/orcamento">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Ver Carrinho
                        </Link>
                      </Button>
                      <Button
                        size="default"
                        variant="outline"
                        asChild
                        className="w-full sm:flex-1 h-10 bg-white text-gray-900 hover:bg-white hover:text-orange-600 border border-gray-200 hover:border-gray-200 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                      >
                        <Link href="/equipamentos">
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Mais
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col flex-1 min-h-0">
                    {/* Área central com ícone e texto */}
                    <div className="flex flex-col flex-1 justify-center items-center text-center px-4 py-8">
                      <div className="space-y-4">
                        <ShoppingCart className="h-12 w-12 md:h-14 md:w-14 text-gray-300 mx-auto" />
                        <p className="text-base md:text-lg font-medium text-gray-500">
                          Seu carrinho está vazio
                        </p>
                      </div>
                    </div>
                    {/* Botão fixo na parte inferior */}
                    <div className="flex justify-center mt-auto">
                      <Button
                        size="default"
                        asChild
                        className="w-full h-10 bg-white text-gray-900 hover:bg-white hover:text-orange-600 border border-gray-200 hover:border-gray-200 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                      >
                        <Link href="/equipamentos">
                          <Plus className="h-4 w-4" />
                          Adicionar Equipamentos
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Minhas Locações - Layout com Lista */}
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-0">
              <div className="absolute inset-0 bg-white"></div>
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                    <Package className="h-5 w-5" />
                  </div>
                  Minhas Locações
                </CardTitle>
              </CardHeader>
              <CardContent className="relative pb-8 z-10 pt-0 flex flex-col flex-1">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Clock className="h-8 w-8 text-gray-300 animate-spin" />
                  </div>
                ) : activeRentals.length > 0 ? (
                  <div className="flex flex-col flex-1 min-h-0">
                    {/* Lista de locações - pode crescer */}
                    <div className="space-y-3 flex-1 min-h-0">
                      {activeRentals.slice(0, 3).map((rental) => {
                        const StatusIcon =
                          statusConfig[rental.status]?.icon || Clock
                        return (
                          <div
                            key={rental.id}
                            className="group p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">
                                  {rental.rental_items[0]?.equipments.name ||
                                    'Equipamento'}
                                  {rental.rental_items.length > 1 &&
                                    ` +${rental.rental_items.length - 1}`}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {formatDate(rental.startdate)} -{' '}
                                  {formatDate(rental.enddate)}
                                </p>
                                {rental.createdat && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    Solicitado às{' '}
                                    {formatDateTime(rental.createdat)}
                                  </p>
                                )}
                              </div>
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-xs',
                                  statusConfig[rental.status]?.color
                                )}
                              >
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig[rental.status]?.label}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-green-600">
                                {formatCurrency(rental.total)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="admin-action-button rentals-view-button opacity-0 group-hover:opacity-100 transition-all hover:shadow-md"
                              >
                                <Link
                                  href={`/area-cliente/historico/${rental.id}`}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver
                                </Link>
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {/* Botão fixo na parte inferior */}
                    <div className="mt-auto pt-4">
                      {activeRentals.length > 3 && (
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/area-cliente/historico">
                            Ver todas as locações ({rentals.length})
                          </Link>
                        </Button>
                      )}
                      {activeRentals.length <= 3 && rentals.length > 3 && (
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/area-cliente/historico">
                            Ver todas as locações ({rentals.length})
                          </Link>
                        </Button>
                      )}
                      {/* Botão sempre visível para acessar o histórico completo */}
                      {activeRentals.length <= 3 && rentals.length <= 3 && (
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/area-cliente/historico">
                            Ver Histórico Completo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col flex-1 min-h-0">
                    <div className="flex flex-col flex-1 justify-center items-center text-center py-8">
                      <div className="space-y-4">
                        <Package className="h-12 w-12 md:h-14 md:w-14 text-gray-300 mx-auto" />
                        <p className="text-base md:text-lg font-medium text-gray-500">
                          Nenhuma locação ativa
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                      <Button size="default" asChild className="w-full h-10">
                        <Link href="/area-cliente/historico">
                          <Clock className="h-4 w-4 mr-2" />
                          Ver Histórico
                        </Link>
                      </Button>
                      <Button
                        size="default"
                        variant="outline"
                        asChild
                        className="w-full h-10"
                      >
                        <Link href="/equipamentos">
                          <Plus className="h-4 w-4 mr-2" />
                          Alugar Equipamentos
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Atividade Recente - Seção Compacta */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  Atividade Recente
                </CardTitle>
                <CardDescription>
                  Suas últimas ações na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="relative pb-8 z-10 pt-0">
                {activitiesLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Clock className="h-8 w-8 text-gray-300 animate-spin" />
                  </div>
                ) : activities.length > 0 ? (
                  <div className="space-y-3">
                    {activities
                      .filter(
                        (activity) => !dismissedActivities.has(activity.id)
                      )
                      .map((activity) => {
                        const Icon = getActivityIcon(activity.type)
                        const colorClass = getActivityColor(activity.type)
                        const ActivityContent = (
                          <div className="group relative p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                            {/* Seta à esquerda do botão close, centralizada verticalmente */}
                            {activity.link && (
                              <ArrowRight className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-orange-600 transition-all duration-300 flex-shrink-0 z-10" />
                            )}
                            {/* Botão de fechar no canto superior direito */}
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                dismissActivity(activity.id)
                              }}
                              className="absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-lg disabled:pointer-events-none disabled:opacity-50 transition-all duration-300 text-slate-400 hover:text-slate-600 hover:bg-white focus:outline-none focus:ring-0 opacity-0 group-hover:opacity-100 z-10"
                              aria-label="Remover atividade"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  'p-2 rounded-lg flex-shrink-0',
                                  colorClass
                                )}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0 pr-12">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <p className="font-semibold text-gray-900 text-sm flex-1">
                                    {activity.title}
                                  </p>
                                  {activity.metadata?.amount && (
                                    <span className="text-sm font-bold text-green-600 flex-shrink-0">
                                      {formatCurrency(activity.metadata.amount)}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  {activity.description}
                                </p>
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-500">
                                    {formatRelativeTime(activity.timestamp)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )

                        return activity.link ? (
                          <Link
                            key={activity.id}
                            href={activity.link}
                            className="block"
                          >
                            {ActivityContent}
                          </Link>
                        ) : (
                          <div key={activity.id}>{ActivityContent}</div>
                        )
                      })}
                  </div>
                ) : (
                  <div className="text-center flex flex-col flex-1 justify-center py-16">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mt-[0.78rem] mb-[0.5rem]" />
                    <p className="text-[18px] font-2x1 text-gray-500">
                      Nenhuma atividade recente
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
