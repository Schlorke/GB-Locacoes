'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import {
  Package,
  Calendar,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
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

export default function ClientRentalsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    if (session?.user) {
      fetchRentals()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, statusFilter])

  const fetchRentals = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }

      const response = await fetch(`/api/client/rentals?${params.toString()}`)
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

  const filteredRentals =
    statusFilter === 'all'
      ? rentals
      : rentals.filter((r) => r.status === statusFilter)

  const activeRentals = rentals.filter((r) => r.status === 'ACTIVE')
  const completedRentals = rentals.filter((r) => r.status === 'COMPLETED')
  const pendingRentals = rentals.filter((r) => r.status === 'PENDING')

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
          <h1 className="text-3xl font-bold text-gray-900">Minhas Locações</h1>
          <p className="text-gray-600 mt-2">
            Gerencie todas as suas locações de equipamentos
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ativas</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {activeRentals.length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Concluídas</p>
                  <p className="text-3xl font-bold text-green-600">
                    {completedRentals.length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pendentes</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {pendingRentals.length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  Todas ({rentals.length})
                </Button>
                <Button
                  variant={statusFilter === 'ACTIVE' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('ACTIVE')}
                >
                  Ativas ({activeRentals.length})
                </Button>
                <Button
                  variant={statusFilter === 'PENDING' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('PENDING')}
                >
                  Pendentes ({pendingRentals.length})
                </Button>
                <Button
                  variant={statusFilter === 'COMPLETED' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('COMPLETED')}
                >
                  Concluídas ({completedRentals.length})
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lista de Locações */}
        {filteredRentals.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {filteredRentals.map((rental, index) => (
              <motion.div
                key={rental.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
                            <Package className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {rental.rental_items[0]?.equipments.name ||
                                'Equipamento'}
                              {rental.rental_items.length > 1 &&
                                ` +${rental.rental_items.length - 1} outros`}
                            </h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(rental.startdate)} -{' '}
                                {formatDate(rental.enddate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Package className="w-4 h-4" />
                                {rental.rental_items.length} item(s)
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-2xl font-bold text-green-600">
                              {formatCurrency(rental.total)}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(rental.status)}
                            <Button asChild>
                              <Link
                                href={`/area-cliente/locacoes/${rental.id}`}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Detalhes
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Nenhuma locação encontrada
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {statusFilter !== 'all'
                    ? `Não há locações com status "${statusConfig[statusFilter]?.label || statusFilter}"`
                    : 'Você ainda não possui locações cadastradas'}
                </p>
                <Button asChild>
                  <Link href="/equipamentos">Alugar Equipamentos</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
