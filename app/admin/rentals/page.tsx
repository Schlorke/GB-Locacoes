'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminCard } from '@/components/admin/admin-card'
import {
  AdvancedCalendar,
  type CalendarEvent,
} from '@/components/admin/advanced-calendar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FilterSelectGroup } from '@/components/ui/filter-select-group'
import { FilterResetButton } from '@/components/ui/filter-reset-button'
import { ViewToggle } from '@/components/ui/view-toggle'
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
  List,
  Building,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { parseISO } from 'date-fns'

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
  createdat?: string
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
    company?: string
    status?: string // Status do orçamento para filtrar rejeitados
  }
  payments?: Array<{
    id: string
    amount: number
    status: string
    method: string
    paidAt: string | null
  }>
  contract?: {
    id: string
    status: string
    signedAt?: string | null
    pdfUrl?: string | null
  }
  [key: string]: unknown // Index signature para compatibilidade com KanbanItem
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
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: Clock,
    gradient: 'from-orange-400 to-orange-500',
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
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: AlertTriangle,
    gradient: 'from-yellow-400 to-orange-300',
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
  const [contractLoading, setContractLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  // ⚠️ CRÍTICO: Filtro padrão deve ser 'PENDING' para exibir pendentes por padrão
  // Similar ao comportamento da primeira seção em /admin/settings
  // NUNCA alterar para 'all' sem consultar o usuário
  const [statusFilter, setStatusFilter] = useState<string>('PENDING')
  const [periodFilter, setPeriodFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table')

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
      // Excluir locações de orçamentos rejeitados (fallback do filtro da API)
      if (rental.quote?.status === 'REJECTED') {
        return false
      }

      // Excluir locações canceladas (a menos que o filtro seja explicitamente 'CANCELLED')
      if (rental.status === 'CANCELLED' && statusFilter !== 'CANCELLED') {
        return false
      }

      const matchesSearch =
        rental.users.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.users.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.users.phone?.includes(searchTerm) ||
        rental.quote?.company
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
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

  const handleGenerateContract = async (rentalId: string) => {
    try {
      setContractLoading(true)
      const response = await fetch(`/api/admin/rentals/${rentalId}/contract`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Erro ao gerar contrato')
      }
      const data = await response.json()
      toast.success('Contrato gerado com sucesso')
      setSelectedRental((prev) =>
        prev ? { ...prev, contract: data.contract } : prev
      )
      fetchRentals()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao gerar contrato')
    } finally {
      setContractLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status] || statusConfig.PENDING
    if (!config) return null
    const Icon = config.icon

    return (
      <Badge
        variant="outline"
        className={`${config.color} flex items-center gap-1.5 font-medium border-b-0`}
        style={{ borderBottom: 'none' }}
      >
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </Badge>
    )
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
          infoBadge={{
            icon: <Package className="w-5 h-5 text-orange-50" />,
            text: `${Array.isArray(filteredRentals) ? filteredRentals.length : rentals.length} locações encontradas`,
          }}
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
                    // Contagem total de itens deste status (sem filtros adicionais)
                    const totalStatusRentals = rentals.filter(
                      (r) => (r.status?.toUpperCase() || r.status) === status
                    )
                    const isActive = statusFilter === status

                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          // Botões de status funcionam como abas:
                          // clicar novamente no status ativo NÃO deve desativar a página.
                          // Mantém sempre uma seção ativa, alinhado com /admin/settings.
                          if (statusFilter !== status) {
                            setStatusFilter(status)
                          }
                        }}
                        className={cn(
                          'group flex flex-col items-center justify-center gap-2 px-6 py-4 md:px-4 rounded-lg border transition-all duration-300 relative',
                          'bg-transparent hover:bg-background border-gray-200 shadow-md hover:shadow-lg',
                          isActive && 'shadow-lg'
                        )}
                        title={`Ver locações ${config.label.toLowerCase()}`}
                        aria-label={`Filtrar por ${config.label}`}
                      >
                        {/* Badge com contador - sempre visível quando houver itens */}
                        {totalStatusRentals.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="absolute top-2 right-2 text-xs"
                          >
                            {totalStatusRentals.length}
                          </Badge>
                        )}

                        {/* Ícone */}
                        <div
                          className={cn(
                            'p-2 rounded-lg bg-gradient-to-br transition-all duration-300 flex items-center justify-center',
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
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  {/* Primeira linha - Search and Filters */}
                  <div className="flex flex-col md:flex-row gap-3 flex-1 w-full items-center">
                    {/* Search Input */}
                    <div className="relative flex-1 w-full md:w-auto">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar por cliente, email, telefone, empresa..."
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

                  {/* Segunda linha - View Toggle */}
                  <div className="flex items-center justify-center w-full">
                    <ViewToggle
                      options={[
                        { value: 'table', label: 'Tabela', icon: List },
                        {
                          value: 'calendar',
                          label: 'Calendário',
                          icon: Calendar,
                        },
                      ]}
                      value={viewMode}
                      onValueChange={(value) =>
                        setViewMode(value as 'table' | 'calendar')
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Calendário Avançado de Locações */}
        {viewMode === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <AdminCard title="Calendário de Locações" variant="flat">
              <AdvancedCalendar
                events={filteredRentals.map((rental): CalendarEvent => {
                  const equipmentNames = rental.rental_items
                    .map((item) => item.equipments.name)
                    .join(', ')
                  const clientName = rental.users.name || 'Cliente'
                  const isPending = rental.status === 'PENDING'
                  const createdAt = rental.createdat
                    ? parseISO(rental.createdat)
                    : undefined

                  // Para pendentes, usar apenas o momento da solicitação (não o período solicitado)
                  // Para outros status, usar o período de locação (quando o equipamento está sendo usado)
                  const start =
                    isPending && createdAt
                      ? createdAt
                      : parseISO(rental.startdate)
                  const end =
                    isPending && createdAt
                      ? createdAt
                      : parseISO(rental.enddate)

                  // Cores baseadas no status
                  const statusColors: Record<string, string> = {
                    PENDING: '#F97316', // Laranja (orange-500) - padrão universal
                    ACTIVE: '#3B82F6', // Azul
                    COMPLETED: '#10B981', // Verde
                    CANCELLED: '#EF4444', // Vermelho
                    OVERDUE: '#FBBF24', // Amarelo meio laranja (yellow-400/amber-400)
                    PENDING_RETURN: '#8B5CF6', // Roxo
                  }

                  return {
                    id: rental.id,
                    title: `${clientName} - ${equipmentNames}`,
                    start,
                    end,
                    resourceId: rental.status,
                    color: statusColors[rental.status] || '#6B7280',
                    type: 'rental',
                    status: rental.status,
                    // Para solicitações pendentes, usar altura auto e posicionar pelo horário de criação
                    isPendingRequest: isPending,
                    createdAt: isPending ? createdAt : undefined,
                    metadata: {
                      clientName: rental.users.name,
                      clientEmail: rental.users.email,
                      clientPhone: rental.users.phone,
                      equipmentCount: rental.rental_items.length,
                      total: rental.total,
                      equipmentNames,
                    },
                  }
                })}
                resources={Object.entries(statusConfig).map(
                  ([status, config]) => ({
                    id: status,
                    name: config.label,
                  })
                )}
                onEventClick={(event) => {
                  const rental = filteredRentals.find((r) => r.id === event.id)
                  if (rental) {
                    setSelectedRental(rental)
                  }
                }}
                defaultViewMode="weekly"
              />
            </AdminCard>
          </motion.div>
        )}

        {/* Lista de Locações Filtradas - Tabela */}
        {filteredRentals.length > 0 && viewMode === 'table' && (
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
                            className="border-b border-gray-50 hover:bg-orange-50 transition-colors group"
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
                                  {rental.quote?.company && (
                                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                      <Building className="w-3 h-3" />
                                      {rental.quote.company}
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
                                className="admin-action-button rentals-view-button opacity-0 group-hover:opacity-100 transition-all"
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
        {!loading &&
          viewMode !== 'calendar' &&
          filteredRentals.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <Card className="bg-white shadow-lg border-0">
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

        {/* Mensagem quando não há locações no calendário */}
        {!loading &&
          viewMode === 'calendar' &&
          filteredRentals.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Nenhuma locação encontrada
                  </h3>
                  <p className="text-sm text-gray-500">
                    {statusFilter !== 'all'
                      ? `Não há locações com status "${statusConfig[statusFilter]?.label || statusFilter}" para exibir no calendário`
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

                            {/* Check-in/Check-out */}
                            {(selectedRental.status === 'PENDING' ||
                              selectedRental.status === 'ACTIVE') && (
                              <AdminCard title="Check-in/Check-out">
                                <div className="space-y-4">
                                  {!selectedRental.checkInAt && (
                                    <Button
                                      className="w-full"
                                      onClick={async () => {
                                        try {
                                          const response = await fetch(
                                            `/api/admin/rentals/${selectedRental.id}`,
                                            {
                                              method: 'PATCH',
                                              headers: {
                                                'Content-Type':
                                                  'application/json',
                                              },
                                              body: JSON.stringify({
                                                checkInAt:
                                                  new Date().toISOString(),
                                                status: 'ACTIVE',
                                              }),
                                            }
                                          )
                                          if (response.ok) {
                                            toast.success(
                                              'Check-in realizado com sucesso'
                                            )
                                            fetchRentals()
                                            setSelectedRental(null)
                                          } else {
                                            toast.error(
                                              'Erro ao realizar check-in'
                                            )
                                          }
                                        } catch (_error) {
                                          toast.error(
                                            'Erro ao realizar check-in'
                                          )
                                        }
                                      }}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Realizar Check-in
                                    </Button>
                                  )}
                                  {selectedRental.checkInAt &&
                                    !selectedRental.checkOutAt && (
                                      <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={async () => {
                                          try {
                                            const response = await fetch(
                                              `/api/admin/rentals/${selectedRental.id}`,
                                              {
                                                method: 'PATCH',
                                                headers: {
                                                  'Content-Type':
                                                    'application/json',
                                                },
                                                body: JSON.stringify({
                                                  checkOutAt:
                                                    new Date().toISOString(),
                                                  status: 'COMPLETED',
                                                }),
                                              }
                                            )
                                            if (response.ok) {
                                              toast.success(
                                                'Check-out realizado com sucesso'
                                              )
                                              fetchRentals()
                                              setSelectedRental(null)
                                            } else {
                                              toast.error(
                                                'Erro ao realizar check-out'
                                              )
                                            }
                                          } catch (_error) {
                                            toast.error(
                                              'Erro ao realizar check-out'
                                            )
                                          }
                                        }}
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Realizar Check-out
                                      </Button>
                                    )}
                                  {selectedRental.checkInAt && (
                                    <p className="text-sm text-gray-600">
                                      Check-in:{' '}
                                      {formatDate(selectedRental.checkInAt)}
                                    </p>
                                  )}
                                  {selectedRental.checkOutAt && (
                                    <p className="text-sm text-gray-600">
                                      Check-out:{' '}
                                      {formatDate(selectedRental.checkOutAt)}
                                    </p>
                                  )}
                                </div>
                              </AdminCard>
                            )}

                            {/* Contrato */}
                            <AdminCard title="Contrato">
                              <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Status
                                    </p>
                                    <p className="font-medium">
                                      {selectedRental.contract?.status ||
                                        'Não gerado'}
                                    </p>
                                    {selectedRental.contract?.signedAt && (
                                      <p className="text-xs text-gray-500">
                                        Assinado em:{' '}
                                        {formatDate(
                                          selectedRental.contract.signedAt
                                        )}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      handleGenerateContract(selectedRental.id)
                                    }
                                    disabled={contractLoading}
                                  >
                                    <FileText className="w-4 h-4 mr-2" />
                                    {selectedRental.contract
                                      ? 'Atualizar contrato'
                                      : 'Gerar contrato'}
                                  </Button>
                                </div>
                                {selectedRental.contract?.pdfUrl && (
                                  <a
                                    href={selectedRental.contract.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-blue-600 underline"
                                  >
                                    Abrir PDF
                                  </a>
                                )}
                              </div>
                            </AdminCard>

                            {/* Ações */}
                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1">
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() =>
                                  handleGenerateContract(selectedRental.id)
                                }
                                disabled={contractLoading}
                              >
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
