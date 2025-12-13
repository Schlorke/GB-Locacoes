'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminCard } from '@/components/admin/admin-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FilterSelectGroup } from '@/components/ui/filter-select-group'
import { FilterResetButton } from '@/components/ui/filter-reset-button'
import { ViewToggle } from '@/components/ui/view-toggle'
import { Dialog } from '@/components/ui/dialog'
import { motion } from 'framer-motion'
import {
  Wrench,
  Search,
  Edit,
  CheckCircle,
  Clock,
  XCircle,
  LayoutGrid,
  List,
  AlertTriangle,
  CalendarPlus,
} from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'

interface Maintenance {
  id: string
  equipmentId: string
  type: string
  scheduledAt: string
  completedAt: string | null
  cost: number | null
  laborCost: number | null
  partsCost: number | null
  description: string | null
  notes: string | null
  technician: string | null
  status: string
  equipment: {
    id: string
    name: string
    images: string[]
    category?: {
      id: string
      name: string
    }
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
  SCHEDULED: {
    label: 'Agendada',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Calendar,
  },
  IN_PROGRESS: {
    label: 'Em Andamento',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
  },
  COMPLETED: {
    label: 'Concluída',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
  },
  CANCELLED: {
    label: 'Cancelada',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
  },
}

const typeConfig: Record<string, string> = {
  PREVENTIVE: 'Preventiva',
  CORRECTIVE: 'Corretiva',
  INSPECTION: 'Inspeção',
}

export default function AdminMaintenancePage() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([])
  const [filteredMaintenances, setFilteredMaintenances] = useState<
    Maintenance[]
  >([])
  const [loading, setLoading] = useState(true)
  const [selectedMaintenance, setSelectedMaintenance] =
    useState<Maintenance | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
  const [overdueAlerts, setOverdueAlerts] = useState<
    Array<{
      id: string
      equipmentId: string
      equipmentName: string
      scheduledAt: Date
      daysOverdue: number
      type: string
    }>
  >([])

  const fetchMaintenances = useCallback(async () => {
    try {
      setLoading(true)
      // Buscar manutenções e alertas vencidos
      const [maintenancesResponse, scheduledResponse] = await Promise.all([
        fetch(`/api/admin/maintenance`),
        fetch(`/api/admin/maintenance/scheduled?includeOverdue=true`),
      ])

      if (!maintenancesResponse.ok)
        throw new Error('Erro ao carregar manutenções')
      if (!scheduledResponse.ok)
        throw new Error('Erro ao carregar manutenções agendadas')

      const maintenancesData = await maintenancesResponse.json()
      const scheduledData = await scheduledResponse.json()

      setMaintenances(maintenancesData.maintenances || [])
      setOverdueAlerts(
        scheduledData.overdueAlerts?.map(
          (alert: {
            id: string
            equipmentId: string
            equipmentName: string
            scheduledAt: string
            daysOverdue: number
            type: string
          }) => ({
            ...alert,
            scheduledAt: new Date(alert.scheduledAt),
          })
        ) || []
      )
    } catch (error) {
      console.error('Error fetching maintenances:', error)
      toast.error('Erro', {
        description: 'Erro ao carregar manutenções. Tente novamente.',
      })
      setMaintenances([])
      setOverdueAlerts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMaintenances()
  }, [fetchMaintenances])

  useEffect(() => {
    const filtered = maintenances.filter((maintenance) => {
      // Filtro de busca
      const matchesSearch =
        maintenance.equipment.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        maintenance.technician
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        maintenance.id.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro de status
      const matchesStatus =
        statusFilter === 'all' || maintenance.status === statusFilter

      // Filtro de tipo
      const matchesType =
        typeFilter === 'all' || maintenance.type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })

    setFilteredMaintenances(filtered)
  }, [maintenances, searchTerm, statusFilter, typeFilter])

  const formatCurrency = (value: number | null) => {
    if (!value) return 'R$ 0,00'
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
    const config = statusConfig[status] || statusConfig.SCHEDULED
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
          title="Gerenciar Manutenções"
          subtitle="Agenda e histórico de manutenções de equipamentos"
          icon={<Wrench className="w-8 h-8" />}
          className="mb-8"
        />

        {/* Alertas de Manutenções Vencidas */}
        {overdueAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      {overdueAlerts.length} Manutenção(ões) Vencida(s)
                    </h3>
                    <ul className="space-y-1 text-sm text-red-800">
                      {overdueAlerts.slice(0, 5).map((alert) => (
                        <li key={alert.id}>
                          {alert.equipmentName} - Vencida há {alert.daysOverdue}{' '}
                          dia(s)
                        </li>
                      ))}
                      {overdueAlerts.length > 5 && (
                        <li className="font-medium">
                          +{overdueAlerts.length - 5} mais...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="relative overflow-visible border-0 shadow-xl bg-white backdrop-blur-sm">
            <CardContent className="relative z-10 p-4 md:p-6">
              <div className="flex flex-col md:flex-col lg:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por equipamento ou técnico..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex flex-col md:flex-col lg:flex-row items-center gap-3 w-full md:w-full lg:w-auto">
                  <FilterSelectGroup
                    filters={[
                      {
                        label: 'Status',
                        value: statusFilter,
                        onValueChange: setStatusFilter,
                        placeholder: 'Filtrar por status',
                        options: [
                          { value: 'all', label: 'Todos' },
                          { value: 'SCHEDULED', label: 'Agendada' },
                          { value: 'IN_PROGRESS', label: 'Em Andamento' },
                          { value: 'COMPLETED', label: 'Concluída' },
                          { value: 'CANCELLED', label: 'Cancelada' },
                        ],
                      },
                      {
                        label: 'Tipo',
                        value: typeFilter,
                        onValueChange: setTypeFilter,
                        placeholder: 'Filtrar por tipo',
                        options: [
                          { value: 'all', label: 'Todos' },
                          { value: 'PREVENTIVE', label: 'Preventiva' },
                          { value: 'CORRECTIVE', label: 'Corretiva' },
                          { value: 'INSPECTION', label: 'Inspeção' },
                        ],
                      },
                    ]}
                    gap="sm"
                  />
                  <FilterResetButton
                    onClick={() => {
                      setStatusFilter('all')
                      setTypeFilter('all')
                      setSearchTerm('')
                    }}
                    title="Resetar filtros"
                    size="md"
                  />
                  <ViewToggle
                    options={[
                      { value: 'list', label: 'Lista', icon: List },
                      {
                        value: 'calendar',
                        label: 'Calendário',
                        icon: LayoutGrid,
                      },
                    ]}
                    value={viewMode}
                    onValueChange={(value) =>
                      setViewMode(value as 'list' | 'calendar')
                    }
                  />
                  <Button
                    variant="outline"
                    className="bg-orange-600 text-white hover:bg-orange-700 hover:text-white border-orange-600"
                    onClick={() => {
                      // TODO: Abrir modal para agendar preventiva
                      toast.info('Funcionalidade em desenvolvimento')
                    }}
                  >
                    <CalendarPlus className="w-4 h-4 mr-2" />
                    Agendar Preventiva
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Calendário de Manutenções */}
        {viewMode === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <AdminCard title="Calendário de Manutenções">
              <div className="space-y-6">
                <Calendar
                  mode="single"
                  month={selectedMonth}
                  onMonthChange={setSelectedMonth}
                  modifiers={{
                    scheduled: filteredMaintenances
                      .filter((m) => m.status === 'SCHEDULED')
                      .map((m) => new Date(m.scheduledAt)),
                    inProgress: filteredMaintenances
                      .filter((m) => m.status === 'IN_PROGRESS')
                      .map((m) => new Date(m.scheduledAt)),
                    completed: filteredMaintenances
                      .filter((m) => m.status === 'COMPLETED')
                      .map((m) =>
                        m.completedAt ? new Date(m.completedAt) : null
                      )
                      .filter((d): d is Date => d !== null),
                  }}
                  modifiersClassNames={{
                    scheduled: 'bg-blue-500 text-white rounded-full',
                    inProgress: 'bg-yellow-500 text-white rounded-full',
                    completed: 'bg-green-500 text-white rounded-full',
                  }}
                  className="rounded-md border"
                />
                <div className="flex flex-wrap gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-700">Agendada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-700">Em Andamento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-700">Concluída</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">
                    Manutenções do Mês
                  </h4>
                  {filteredMaintenances
                    .filter((m) => {
                      const scheduledDate = new Date(m.scheduledAt)
                      return (
                        scheduledDate.getMonth() === selectedMonth.getMonth() &&
                        scheduledDate.getFullYear() ===
                          selectedMonth.getFullYear()
                      )
                    })
                    .map((maintenance) => (
                      <div
                        key={maintenance.id}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {maintenance.equipment.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {typeConfig[maintenance.type]} -{' '}
                              {formatDate(maintenance.scheduledAt)}
                            </p>
                            {maintenance.technician && (
                              <p className="text-xs text-gray-500 mt-1">
                                Técnico: {maintenance.technician}
                              </p>
                            )}
                          </div>
                          {getStatusBadge(maintenance.status)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </AdminCard>
          </motion.div>
        )}

        {/* Lista de Manutenções */}
        {viewMode === 'list' && filteredMaintenances.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <CardContent className="relative z-10 p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Equipamento
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Tipo
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Agendada para
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Técnico
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Custo
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
                      {filteredMaintenances.map((maintenance) => (
                        <tr
                          key={maintenance.id}
                          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="font-medium text-gray-900">
                              {maintenance.equipment.name}
                            </div>
                            {maintenance.equipment.category && (
                              <div className="text-sm text-gray-500">
                                {maintenance.equipment.category.name}
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">
                              {typeConfig[maintenance.type] || maintenance.type}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              {formatDate(maintenance.scheduledAt)}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-gray-700">
                              {maintenance.technician || 'Não definido'}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-green-600">
                              {formatCurrency(maintenance.cost)}
                            </span>
                          </td>
                          <td className="p-4">
                            {getStatusBadge(maintenance.status)}
                          </td>
                          <td className="p-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setSelectedMaintenance(maintenance)
                              }
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Mensagem quando não há manutenções */}
        {!loading &&
          viewMode === 'list' &&
          filteredMaintenances.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <Wrench className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Nenhuma manutenção encontrada
                  </h3>
                  <p className="text-sm text-gray-500">
                    Não há manutenções cadastradas no sistema
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

        {/* Dialog de Detalhes */}
        <Dialog.Root
          open={!!selectedMaintenance}
          onOpenChange={(open) => !open && setSelectedMaintenance(null)}
        >
          <Dialog.Backdrop />
          <Dialog.Portal>
            <Dialog.Popup variant="default" className="max-w-3xl">
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.HeaderIcon>
                    <Wrench className="w-5 h-5" />
                  </Dialog.HeaderIcon>
                  <Dialog.Title className="flex items-center gap-2">
                    Detalhes da Manutenção
                  </Dialog.Title>
                  <Dialog.CloseButton />
                </Dialog.Header>
                <Dialog.Body>
                  <Dialog.BodyViewport>
                    <Dialog.BodyContent>
                      {selectedMaintenance && (
                        <div className="space-y-6 mt-4">
                          <AdminCard title="Equipamento">
                            <div>
                              <p className="font-medium text-lg">
                                {selectedMaintenance.equipment.name}
                              </p>
                              {selectedMaintenance.equipment.category && (
                                <p className="text-sm text-gray-500">
                                  {selectedMaintenance.equipment.category.name}
                                </p>
                              )}
                            </div>
                          </AdminCard>

                          <AdminCard title="Informações da Manutenção">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Tipo</p>
                                <p className="font-medium">
                                  {typeConfig[selectedMaintenance.type] ||
                                    selectedMaintenance.type}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Status</p>
                                {getStatusBadge(selectedMaintenance.status)}
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Agendada para
                                </p>
                                <p className="font-medium">
                                  {formatDate(selectedMaintenance.scheduledAt)}
                                </p>
                              </div>
                              {selectedMaintenance.completedAt && (
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Concluída em
                                  </p>
                                  <p className="font-medium">
                                    {formatDate(
                                      selectedMaintenance.completedAt
                                    )}
                                  </p>
                                </div>
                              )}
                              <div>
                                <p className="text-sm text-gray-500">Técnico</p>
                                <p className="font-medium">
                                  {selectedMaintenance.technician ||
                                    'Não definido'}
                                </p>
                              </div>
                            </div>
                          </AdminCard>

                          {selectedMaintenance.description && (
                            <AdminCard title="Descrição">
                              <p className="text-gray-700">
                                {selectedMaintenance.description}
                              </p>
                            </AdminCard>
                          )}

                          <AdminCard title="Custos">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Mão de Obra
                                </p>
                                <p className="font-medium text-lg">
                                  {formatCurrency(
                                    selectedMaintenance.laborCost
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Peças</p>
                                <p className="font-medium text-lg">
                                  {formatCurrency(
                                    selectedMaintenance.partsCost
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="font-medium text-lg text-green-600">
                                  {formatCurrency(selectedMaintenance.cost)}
                                </p>
                              </div>
                            </div>
                          </AdminCard>

                          {selectedMaintenance.notes && (
                            <AdminCard title="Notas">
                              <p className="text-gray-700">
                                {selectedMaintenance.notes}
                              </p>
                            </AdminCard>
                          )}
                        </div>
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
