'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminCard } from '@/components/admin/admin-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FilterSelectGroup } from '@/components/ui/filter-select-group'
import { FilterResetButton } from '@/components/ui/filter-reset-button'
import type React from 'react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  Edit,
  Truck,
  FileText,
  Phone,
  Calendar,
  Eye,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
  users: {
    id: string
    name: string | null
    email: string
    phone: string | null
  }
  rental_items: Array<{
    id: string
    quantity: number
    totaldays: number
    totalprice: number
    equipments: {
      id: string
      name: string
      images: string[]
    }
  }>
  quote?: {
    id: string
    name: string
    email: string
  }
  payments?: Array<{
    id: string
    amount: number
    status: string
    method: string
    paidAt: string | null
  }>
}

const statusConfig: Record<
  string,
  {
    label: string
    color: string
    icon: React.ComponentType<{ className?: string }>
    gradient: string
  }
> = {
  PENDING: {
    label: 'Pendente',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    gradient: 'from-yellow-400 to-orange-500',
  },
  ACTIVE: {
    label: 'Ativa',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: CheckCircle,
    gradient: 'from-blue-400 to-cyan-500',
  },
  COMPLETED: {
    label: 'Concluída',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    gradient: 'from-green-400 to-emerald-500',
  },
  CANCELLED: {
    label: 'Cancelada',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
    gradient: 'from-red-400 to-rose-500',
  },
  OVERDUE: {
    label: 'Atrasada',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: AlertTriangle,
    gradient: 'from-orange-400 to-red-500',
  },
  PENDING_RETURN: {
    label: 'Aguardando Devolução',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Clock,
    gradient: 'from-purple-400 to-pink-500',
  },
}

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('PENDING')
  const [periodFilter, setPeriodFilter] = useState<string>('all')

  const fetchRentals = useCallback(async () => {
    try {
      setLoading(true)
      // Sempre buscar TODAS as locações, sem filtro de status
      const response = await fetch('/api/admin/rentals')
      if (!response.ok) throw new Error('Erro ao carregar locações')

      const data = await response.json()
      setRentals(data.rentals || [])
    } catch (error) {
      console.error('Error fetching rentals:', error)
      toast.error('Erro', {
        description: 'Erro ao carregar locações. Tente novamente.',
      })
      setRentals([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRentals()
  }, [fetchRentals])

  useEffect(() => {
    if (!Array.isArray(rentals)) {
      setFilteredRentals([])
      return
    }

    const filtered = rentals.filter((rental) => {
      const matchesSearch =
        rental.users.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.users.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.users.phone?.includes(searchTerm) ||
        rental.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === 'all' || rental.status === statusFilter

      let matchesPeriod = true
      if (periodFilter !== 'all') {
        const now = new Date()
        const startDate = new Date(rental.startdate)

        switch (periodFilter) {
          case 'today':
            matchesPeriod = startDate.toDateString() === now.toDateString()
            break
          case 'week': {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            matchesPeriod = startDate >= weekAgo
            break
          }
          case 'month': {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            matchesPeriod = startDate >= monthAgo
            break
          }
        }
      }

      return matchesSearch && matchesStatus && matchesPeriod
    })

    setFilteredRentals(filtered)
  }, [rentals, searchTerm, statusFilter, periodFilter])

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
        className={`${config.color} flex items-center gap-1.5 font-medium`}
      >
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </Badge>
    )
  }

  // Agrupar por status para pipeline
  // Normalizar status (pode vir como string ou enum)
  const rentalsByStatus = {
    PENDING: filteredRentals.filter(
      (r) => (r.status?.toUpperCase() || r.status) === 'PENDING'
    ),
    ACTIVE: filteredRentals.filter(
      (r) => (r.status?.toUpperCase() || r.status) === 'ACTIVE'
    ),
    OVERDUE: filteredRentals.filter(
      (r) => (r.status?.toUpperCase() || r.status) === 'OVERDUE'
    ),
    PENDING_RETURN: filteredRentals.filter(
      (r) => (r.status?.toUpperCase() || r.status) === 'PENDING_RETURN'
    ),
    COMPLETED: filteredRentals.filter(
      (r) => (r.status?.toUpperCase() || r.status) === 'COMPLETED'
    ),
    CANCELLED: filteredRentals.filter(
      (r) => (r.status?.toUpperCase() || r.status) === 'CANCELLED'
    ),
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 pb-24 md:pb-12 max-w-7xl mx-auto">
        <AdminPageHeader
          title="Gerenciar Locações"
          subtitle="Visualize e gerencie todas as locações de equipamentos"
          icon={<Package className="w-8 h-8" />}
          className="mb-8"
        />

        {/* Menu de Navegação por Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="relative overflow-visible border-0 shadow-xl bg-white backdrop-blur-sm">
            <CardContent className="relative z-10 p-4 md:p-6">
              <div className="flex flex-col gap-4">
                {/* Título */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Filtrar por Status
                    </h2>
                    <p className="text-sm text-gray-600">
                      Clique em um status para visualizar as locações
                    </p>
                  </div>
                </div>

                {/* Grid de Botões de Status */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {Object.entries(statusConfig).map(([status, config]) => {
                    if (!config) return null
                    const Icon = config.icon
                    const statusRentals =
                      rentalsByStatus[status as keyof typeof rentalsByStatus] ||
                      []
                    const isActive = statusFilter === status

                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setStatusFilter(
                            status === statusFilter ? 'all' : status
                          )
                        }}
                        className={cn(
                          'group flex flex-col items-center justify-center gap-2 p-6 md:p-4 rounded-lg border transition-all duration-300 relative',
                          'bg-transparent hover:bg-background border-gray-200 shadow-md hover:shadow-lg',
                          isActive && 'shadow-lg'
                        )}
                        title={`Ver locações ${config.label.toLowerCase()}`}
                        aria-label={`Filtrar por ${config.label}`}
                      >
                        {/* Badge com contador */}
                        {statusRentals.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="absolute top-2 right-2 text-xs"
                          >
                            {statusRentals.length}
                          </Badge>
                        )}

                        {/* Ícone */}
                        <div
                          className={cn(
                            'p-2 rounded-lg bg-gradient-to-br transition-all duration-300',
                            config.gradient,
                            isActive && 'scale-110'
                          )}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        {/* Label */}
                        <span
                          className={cn(
                            'text-sm md:text-xs font-medium text-center leading-tight transition-all duration-300',
                            isActive
                              ? 'text-orange-600 font-semibold'
                              : 'text-gray-700 group-hover:text-orange-600'
                          )}
                        >
                          {config.label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Filtros - Busca e Dropdowns */}
                <div className="flex flex-col xl:flex-row gap-3 items-center justify-between pt-4 border-t border-gray-200">
                  {/* Left Side - Search and Filters */}
                  <div className="flex flex-col md:flex-row gap-3 flex-1 w-full items-center">
                    {/* Search Input */}
                    <div className="relative flex-1 w-full md:w-auto">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar por cliente, email, telefone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 border-gray-200 focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0 transition-all duration-200"
                        style={{
                          boxShadow:
                            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        }}
                      />
                    </div>

                    {/* Filters Row */}
                    <div className="w-full md:w-auto">
                      <div className="flex items-center gap-3">
                        <FilterSelectGroup
                          filters={[
                            {
                              label: 'Período',
                              value: periodFilter,
                              onValueChange: setPeriodFilter,
                              placeholder: 'Filtrar por período',
                              options: [
                                { value: 'all', label: 'Todos os períodos' },
                                { value: 'today', label: 'Hoje' },
                                { value: 'week', label: 'Última semana' },
                                { value: 'month', label: 'Último mês' },
                              ],
                            },
                          ]}
                          gap="sm"
                        />
                        <FilterResetButton
                          onClick={() => {
                            setPeriodFilter('all')
                            setSearchTerm('')
                          }}
                          title="Resetar filtros"
                          size="md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lista de Locações Filtradas */}
        {filteredRentals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <CardContent className="relative z-10 p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Cliente
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Equipamentos
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Período
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Valor Total
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {filteredRentals.map((rental, index) => (
                          <motion.tr
                            key={rental.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                                  {rental.users.name?.charAt(0).toUpperCase() ||
                                    '?'}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {rental.users.name || 'Sem nome'}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {rental.users.email}
                                  </div>
                                  {rental.users.phone && (
                                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                      <Phone className="w-3 h-3" />
                                      {rental.users.phone}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium">
                                  {rental.rental_items.length} equipamento(s)
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(rental.startdate)}
                                </div>
                                <div className="text-gray-500 ml-4">
                                  até {formatDate(rental.enddate)}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-lg text-green-600">
                                {formatCurrency(rental.total)}
                              </span>
                            </td>
                            <td className="p-4">
                              {getStatusBadge(rental.status)}
                            </td>
                            <td className="p-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedRental(rental)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Detalhes
                              </Button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Mensagem quando não há locações */}
        {!loading && filteredRentals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Card className="bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Nenhuma locação encontrada
                </h3>
                <p className="text-sm text-gray-500">
                  {statusFilter !== 'all'
                    ? `Não há locações com status "${statusConfig[statusFilter]?.label || statusFilter}"`
                    : 'Não há locações cadastradas no sistema'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Dialog de Detalhes */}
        <Dialog.Root
          open={!!selectedRental}
          onOpenChange={(open) => !open && setSelectedRental(null)}
        >
          <Dialog.Backdrop />
          <Dialog.Portal>
            <Dialog.Popup variant="default" className="max-w-3xl">
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.HeaderIcon>
                    <Package className="w-5 h-5" />
                  </Dialog.HeaderIcon>
                  <Dialog.Title className="flex items-center gap-2">
                    Detalhes da Locação
                  </Dialog.Title>
                  <Dialog.CloseButton />
                </Dialog.Header>
                <Dialog.Body>
                  <Dialog.BodyViewport>
                    <Dialog.BodyContent>
                      {selectedRental && (
                        <>
                          <div className="space-y-6 mt-4">
                            {/* Informações do Cliente */}
                            <AdminCard title="Cliente">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Nome</p>
                                  <p className="font-medium">
                                    {selectedRental.users.name || 'N/A'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Email</p>
                                  <p className="font-medium">
                                    {selectedRental.users.email}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Telefone
                                  </p>
                                  <p className="font-medium">
                                    {selectedRental.users.phone || 'N/A'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Status
                                  </p>
                                  {getStatusBadge(selectedRental.status)}
                                </div>
                              </div>
                            </AdminCard>

                            {/* Período */}
                            <AdminCard title="Período de Locação">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Data de Início
                                  </p>
                                  <p className="font-medium">
                                    {formatDate(selectedRental.startdate)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Data de Término
                                  </p>
                                  <p className="font-medium">
                                    {formatDate(selectedRental.enddate)}
                                  </p>
                                </div>
                                {selectedRental.extensionDays && (
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Prorrogação
                                    </p>
                                    <p className="font-medium">
                                      {selectedRental.extensionDays} dias
                                    </p>
                                  </div>
                                )}
                                {selectedRental.lateFee && (
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Multa por Atraso
                                    </p>
                                    <p className="font-medium text-red-600">
                                      {formatCurrency(selectedRental.lateFee)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </AdminCard>

                            {/* Equipamentos */}
                            <AdminCard title="Equipamentos">
                              <div className="space-y-3">
                                {selectedRental.rental_items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <p className="font-medium">
                                          {item.equipments.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          Quantidade: {item.quantity} | Dias:{' '}
                                          {item.totaldays}
                                        </p>
                                      </div>
                                      <p className="font-semibold text-orange-600">
                                        {formatCurrency(item.totalprice)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AdminCard>

                            {/* Pagamentos */}
                            {selectedRental.payments &&
                              selectedRental.payments.length > 0 && (
                                <AdminCard title="Pagamentos">
                                  <div className="space-y-2">
                                    {selectedRental.payments.map((payment) => (
                                      <div
                                        key={payment.id}
                                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                      >
                                        <div>
                                          <p className="font-medium">
                                            {formatCurrency(payment.amount)}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {payment.method} - {payment.status}
                                          </p>
                                        </div>
                                        {payment.paidAt && (
                                          <p className="text-xs text-gray-500">
                                            {formatDate(payment.paidAt)}
                                          </p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </AdminCard>
                              )}

                            {/* Total */}
                            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-gray-700">
                                  Total
                                </span>
                                <span className="text-2xl font-bold text-orange-600">
                                  {formatCurrency(selectedRental.total)}
                                </span>
                              </div>
                            </div>

                            {/* Ações */}
                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1">
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <FileText className="w-4 h-4 mr-2" />
                                Contrato
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Truck className="w-4 h-4 mr-2" />
                                Logística
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </Dialog.BodyContent>
                  </Dialog.BodyViewport>
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}
