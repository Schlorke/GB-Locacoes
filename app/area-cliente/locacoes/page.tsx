'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ClientAreaBadge } from '@/components/ui/client-area-badge'
import { SearchBar } from '@/components/ui/search-bar'
import { motion } from 'framer-motion'
import {
  Package,
  Calendar,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Plus,
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Rental {
  id: string
  startdate: string
  enddate: string
  total: number
  status: string
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
}

const statusConfig: Record<
  string,
  {
    label: string
    color: string
    icon: React.ComponentType<{ className?: string }>
    statusKey: string
  }
> = {
  PENDING: {
    label: 'Pendente',
    color: 'bg-orange-100 text-orange-800',
    icon: Clock,
    statusKey: 'pending',
  },
  ACTIVE: {
    label: 'Ativa',
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle,
    statusKey: 'active',
  },
  COMPLETED: {
    label: 'Concluída',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    statusKey: 'completed',
  },
  OVERDUE: {
    label: 'Atrasada',
    color: 'bg-red-100 text-red-800',
    icon: AlertTriangle,
    statusKey: 'overdue',
  },
}

export default function ClientRentalsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    if (session?.user) {
      fetchRentals()
    } else {
      setLoading(false)
    }
  }, [session])

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

  const getStatusInfo = (status: string) => {
    return (
      statusConfig[status] || {
        label: 'Desconhecido',
        color: 'bg-gray-100 text-gray-800',
        icon: Clock,
        statusKey: 'unknown',
      }
    )
  }

  const filteredRentals = rentals.filter((rental) => {
    // Search filter - check if any equipment name matches
    const matchesSearch =
      searchTerm === '' ||
      rental.rental_items.some((item) =>
        item.equipments.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

    // Status filter
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'pending' && rental.status === 'PENDING') ||
      (statusFilter === 'active' && rental.status === 'ACTIVE') ||
      (statusFilter === 'completed' && rental.status === 'COMPLETED') ||
      (statusFilter === 'overdue' && rental.status === 'OVERDUE')

    return matchesSearch && matchesStatus
  })

  const activeCount = rentals.filter((r) => r.status === 'ACTIVE').length
  const completedCount = rentals.filter((r) => r.status === 'COMPLETED').length
  const pendingCount = rentals.filter((r) => r.status === 'PENDING').length

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
              onClick={() => router.push('/area-cliente')}
              className="mb-4 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold leading-tight">
                Minhas Locações
              </h1>
              <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto">
                Gerencie todas as suas locações de equipamentos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats badges no hero */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-white font-medium">
                Ativas: {activeCount}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white font-medium">
                Concluídas: {completedCount}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-white font-medium">
                Pendentes: {pendingCount}
              </span>
            </div>
          </div>
        </motion.div>

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
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Search Bar */}
          <motion.div
            className="mb-8 relative z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar
              searchPlaceholder="Buscar por equipamento..."
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              filters={[
                {
                  label: 'Status',
                  value: statusFilter,
                  onValueChange: setStatusFilter,
                  placeholder: 'Filtrar por status',
                  options: [
                    { value: 'all', label: 'Todas as locações' },
                    { value: 'active', label: 'Ativas' },
                    { value: 'pending', label: 'Pendentes' },
                    { value: 'completed', label: 'Concluídas' },
                    { value: 'overdue', label: 'Atrasadas' },
                  ],
                },
              ]}
            />
          </motion.div>

          {/* Rentals List */}
          <motion.div
            className="mt-8 space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {filteredRentals.map((rental, index) => {
              const statusInfo = getStatusInfo(rental.status)
              const StatusIcon = statusInfo.icon
              const totalQuantity = rental.rental_items.reduce(
                (sum, item) => sum + item.quantity,
                0
              )
              const totalDays = rental.rental_items[0]?.totaldays || 0
              const equipmentNames = rental.rental_items
                .map((item) => item.equipments.name)
                .join(', ')

              return (
                <motion.div
                  key={rental.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group z-0 border-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
                    <CardContent className="p-6 sm:p-6 relative z-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Header com ícone, título e badge */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white flex-shrink-0">
                                <Package className="h-5 w-5" />
                              </div>
                              <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex-1 min-w-0">
                                {equipmentNames}
                              </h3>
                            </div>
                            <ClientAreaBadge
                              className={`${statusInfo.color} px-3 py-1 rounded-full font-medium self-start sm:self-center flex-shrink-0`}
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusInfo.label}
                            </ClientAreaBadge>
                          </div>

                          {/* Grid de informações responsivo */}
                          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-3 sm:gap-3 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                              <span className="font-medium">Quantidade:</span>
                              <span className="font-bold text-gray-900">
                                {totalQuantity}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <span className="font-medium">Período:</span>
                              <span className="font-bold text-gray-900">
                                {totalDays} dias
                              </span>
                            </div>
                            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                              <span className="font-medium">Valor Total:</span>
                              <span className="font-bold text-gray-900">
                                {formatCurrency(rental.total)}
                              </span>
                            </div>
                          </div>

                          {/* Seção de datas responsiva */}
                          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium">Início:</span>
                              <span className="font-medium text-gray-700">
                                {formatDate(rental.startdate)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium">Fim:</span>
                              <span className="font-medium text-gray-700">
                                {formatDate(rental.enddate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Botões de ação responsivos */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0 lg:ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto sm:flex-1 min-w-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group border border-gray-200"
                            asChild
                          >
                            <Link href={`/area-cliente/locacoes/${rental.id}`}>
                              <Eye className="h-4 w-4" />
                              Ver Detalhes
                              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {filteredRentals.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl z-0 border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
                <CardContent className="text-center py-16 relative z-0">
                  <div className="p-6 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Package className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3">
                    Nenhuma locação encontrada
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm sm:text-lg">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Tente ajustar os filtros de busca'
                      : 'Você ainda não possui locações cadastradas'}
                  </p>
                  {!searchTerm && statusFilter === 'all' && (
                    <Button
                      size="default"
                      className="inline-flex items-center gap-2 px-6 group rounded-lg"
                      asChild
                    >
                      <Link href="/equipamentos">
                        <Plus className="h-4 w-4" />
                        Alugar Equipamentos
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
