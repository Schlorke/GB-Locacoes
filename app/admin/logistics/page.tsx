'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminCard } from '@/components/admin/admin-card'
import { DeliveryChecklist } from '@/components/admin/delivery-checklist'
import { LogisticsCalendar } from '@/components/admin/logistics-calendar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FilterSelectGroup } from '@/components/ui/filter-select-group'
import { FilterResetButton } from '@/components/ui/filter-reset-button'
import { ViewToggle } from '@/components/ui/view-toggle'
import { Dialog } from '@/components/ui/dialog'
import { ImageUpload } from '@/components/ui/image-upload'
import { motion } from 'framer-motion'
import {
  Truck,
  Calendar,
  MapPin,
  Search,
  Edit,
  CheckCircle,
  XCircle,
  User,
  List,
  Plus,
  Save,
} from 'lucide-react'
import { toast } from 'sonner'

interface Delivery {
  id: string
  rentalId: string
  type: 'DELIVERY' | 'PICKUP'
  status: string
  scheduledAt: string
  completedAt: string | null
  address: {
    street?: string
    number?: string
    city?: string
    state?: string
    zipCode?: string
  }
  distance: number | null
  vehicleId: string | null
  driverId: string | null
  driverName: string | null
  photos: string[]
  checklist: {
    [key: string]: boolean | string
  } | null
  notes: string | null
  rental: {
    id: string
    users: {
      name: string | null
      email: string
      phone: string | null
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
  IN_TRANSIT: {
    label: 'Em Trânsito',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Truck,
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
  FAILED: {
    label: 'Falhou',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
  },
}

const typeConfig: Record<string, string> = {
  DELIVERY: 'Entrega',
  PICKUP: 'Coleta',
}

interface Vehicle {
  id: string
  plate: string
  brand: string | null
  model: string | null
  type: string
  status: string
}

interface Driver {
  id: string
  name: string
  phone: string
  status: string
}

export default function AdminLogisticsPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingDelivery, setEditingDelivery] = useState<{
    vehicleId?: string
    driverId?: string
    driverName?: string
    distance?: number
    photos: string[]
    checklist: Record<string, boolean | string>
    notes?: string
  }>({
    photos: [],
    checklist: {},
  })

  const fetchDeliveries = useCallback(async () => {
    try {
      setLoading(true)
      // Sempre buscar todos os dados - filtros serão aplicados localmente
      const response = await fetch(`/api/admin/logistics`)
      if (!response.ok) throw new Error('Erro ao carregar entregas')

      const data = await response.json()
      setDeliveries(data.deliveries || [])
    } catch (error) {
      console.error('Error fetching deliveries:', error)
      toast.error('Erro', {
        description: 'Erro ao carregar entregas. Tente novamente.',
      })
      setDeliveries([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/vehicles?status=AVAILABLE')
      if (response.ok) {
        const data = await response.json()
        setVehicles(data.vehicles || [])
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }, [])

  const fetchDrivers = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/drivers?status=ACTIVE')
      if (response.ok) {
        const data = await response.json()
        setDrivers(data.drivers || [])
      }
    } catch (error) {
      console.error('Error fetching drivers:', error)
    }
  }, [])

  useEffect(() => {
    fetchDeliveries()
    fetchVehicles()
    fetchDrivers()
  }, [fetchDeliveries, fetchVehicles, fetchDrivers])

  useEffect(() => {
    const filtered = deliveries.filter((delivery) => {
      // Filtro de busca
      const matchesSearch =
        delivery.rental.users.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        delivery.rental.users.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        delivery.id.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro de status
      const matchesStatus =
        statusFilter === 'all' || delivery.status === statusFilter

      // Filtro de tipo
      const matchesType = typeFilter === 'all' || delivery.type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })

    setFilteredDeliveries(filtered)
  }, [deliveries, searchTerm, statusFilter, typeFilter])

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

  const formatAddress = (address: Delivery['address']) => {
    const parts = [
      address.street,
      address.number,
      address.city,
      address.state,
      address.zipCode,
    ].filter(Boolean)
    return parts.length > 0 ? parts.join(', ') : 'Endereço não informado'
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

  const handleEditDelivery = (delivery: Delivery) => {
    setSelectedDelivery(delivery)
    setIsEditing(true)
    setEditingDelivery({
      vehicleId: delivery.vehicleId || undefined,
      driverId: delivery.driverId || undefined,
      driverName: delivery.driverName || undefined,
      distance: delivery.distance ? Number(delivery.distance) : undefined,
      photos: delivery.photos || [],
      checklist: (delivery.checklist as Record<string, boolean | string>) || {},
      notes: delivery.notes || undefined,
    })
  }

  const handleSaveDelivery = async () => {
    if (!selectedDelivery) return

    try {
      const response = await fetch(
        `/api/admin/logistics/${selectedDelivery.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vehicleId: editingDelivery.vehicleId,
            driverId: editingDelivery.driverId,
            driverName: editingDelivery.driverName,
            distance: editingDelivery.distance,
            photos: editingDelivery.photos,
            checklist: editingDelivery.checklist,
            notes: editingDelivery.notes,
          }),
        }
      )

      if (response.ok) {
        toast.success('Entrega/coleta atualizada com sucesso')
        fetchDeliveries()
        setIsEditing(false)
        setSelectedDelivery(null)
      } else {
        throw new Error('Erro ao atualizar')
      }
    } catch (error) {
      console.error('Error updating delivery:', error)
      toast.error('Erro ao atualizar entrega/coleta')
    }
  }

  const handleUpdateStatus = async (deliveryId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/logistics/${deliveryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast.success('Status atualizado com sucesso')
        fetchDeliveries()
      } else {
        throw new Error('Erro ao atualizar status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Erro ao atualizar status')
    }
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
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <AdminPageHeader
            title="Gerenciar Logística"
            subtitle="Entregas e coletas de equipamentos"
            icon={<Truck className="w-8 h-8" />}
            className="flex-1"
          />
        </div>

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
                    placeholder="Buscar por cliente..."
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
                          { value: 'IN_TRANSIT', label: 'Em Trânsito' },
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
                          { value: 'DELIVERY', label: 'Entrega' },
                          { value: 'PICKUP', label: 'Coleta' },
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
                </div>

                {/* View Toggle */}
                <ViewToggle
                  options={[
                    { value: 'table', label: 'Tabela', icon: List },
                    { value: 'calendar', label: 'Calendário', icon: Calendar },
                  ]}
                  value={viewMode}
                  onValueChange={(value) =>
                    setViewMode(value as 'table' | 'calendar')
                  }
                />
                <Button
                  onClick={() => {
                    // TODO: Implementar criação de entrega/coleta
                    toast.info('Funcionalidade em desenvolvimento')
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white border-0"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Entrega/Coleta
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Calendário de Entregas */}
        {viewMode === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <LogisticsCalendar
              deliveries={
                filteredDeliveries as Array<{
                  id: string
                  type: 'DELIVERY' | 'PICKUP'
                  status: string
                  scheduledAt: string
                  address: {
                    street?: string
                    city?: string
                  }
                  rental: {
                    users: {
                      name: string | null
                    }
                  }
                }>
              }
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
          </motion.div>
        )}

        {/* Lista de Entregas */}
        {filteredDeliveries.length > 0 && viewMode === 'table' && (
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
                          Cliente
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Tipo
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Endereço
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Agendada para
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Motorista
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
                      {filteredDeliveries.map((delivery) => (
                        <tr
                          key={delivery.id}
                          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="p-4">
                            <div>
                              <div className="font-medium text-gray-900">
                                {delivery.rental.users.name || 'Sem nome'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {delivery.rental.users.email}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">
                              {typeConfig[delivery.type] || delivery.type}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 max-w-xs">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">
                                {formatAddress(delivery.address)}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              {formatDate(delivery.scheduledAt)}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <User className="w-4 h-4" />
                              {delivery.driverName || 'Não definido'}
                            </div>
                          </td>
                          <td className="p-4">
                            {getStatusBadge(delivery.status)}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditDelivery(delivery)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </Button>
                              {delivery.status === 'SCHEDULED' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleUpdateStatus(
                                      delivery.id,
                                      'IN_TRANSIT'
                                    )
                                  }
                                >
                                  <Truck className="w-4 h-4 mr-2" />
                                  Iniciar
                                </Button>
                              )}
                              {delivery.status === 'IN_TRANSIT' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleUpdateStatus(delivery.id, 'COMPLETED')
                                  }
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Concluir
                                </Button>
                              )}
                            </div>
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

        {/* Mensagem quando não há entregas */}
        {!loading && filteredDeliveries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <Truck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Nenhuma entrega encontrada
                </h3>
                <p className="text-sm text-gray-500">
                  Não há entregas ou coletas cadastradas no sistema
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Dialog de Detalhes */}
        <Dialog.Root
          open={!!selectedDelivery}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedDelivery(null)
              setIsEditing(false)
              setEditingDelivery({
                photos: [],
                checklist: {},
              })
            }
          }}
        >
          <Dialog.Backdrop />
          <Dialog.Portal>
            <Dialog.Popup variant="default" className="max-w-3xl">
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.HeaderIcon>
                    <Truck className="w-5 h-5" />
                  </Dialog.HeaderIcon>
                  <Dialog.Title className="flex items-center gap-2">
                    Detalhes da{' '}
                    {typeConfig[selectedDelivery?.type || ''] ||
                      'Entrega/Coleta'}
                  </Dialog.Title>
                  <Dialog.CloseButton />
                </Dialog.Header>
                <Dialog.Body>
                  <Dialog.BodyViewport>
                    <Dialog.BodyContent>
                      {selectedDelivery && (
                        <div className="space-y-6 mt-4">
                          {isEditing ? (
                            <>
                              {/* Formulário de Edição */}
                              <AdminCard title="Editar Entrega/Coleta">
                                <div className="space-y-4">
                                  {/* Veículo */}
                                  <div className="space-y-2">
                                    <Label>Veículo</Label>
                                    <Select
                                      value={editingDelivery.vehicleId || ''}
                                      onValueChange={(value) =>
                                        setEditingDelivery({
                                          ...editingDelivery,
                                          vehicleId: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione um veículo" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="">Nenhum</SelectItem>
                                        {vehicles.map((vehicle) => (
                                          <SelectItem
                                            key={vehicle.id}
                                            value={vehicle.id}
                                          >
                                            {vehicle.plate} -{' '}
                                            {vehicle.brand || ''}{' '}
                                            {vehicle.model || ''}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Motorista */}
                                  <div className="space-y-2">
                                    <Label>Motorista</Label>
                                    <Select
                                      value={editingDelivery.driverId || ''}
                                      onValueChange={(value) => {
                                        const driver = drivers.find(
                                          (d) => d.id === value
                                        )
                                        setEditingDelivery({
                                          ...editingDelivery,
                                          driverId: value,
                                          driverName: driver?.name,
                                        })
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione um motorista" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="">Nenhum</SelectItem>
                                        {drivers.map((driver) => (
                                          <SelectItem
                                            key={driver.id}
                                            value={driver.id}
                                          >
                                            {driver.name} - {driver.phone}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Distância */}
                                  <div className="space-y-2">
                                    <Label>Distância (km)</Label>
                                    <Input
                                      type="number"
                                      value={editingDelivery.distance || ''}
                                      onChange={(e) =>
                                        setEditingDelivery({
                                          ...editingDelivery,
                                          distance: e.target.value
                                            ? Number(e.target.value)
                                            : undefined,
                                        })
                                      }
                                      placeholder="Digite a distância em km"
                                    />
                                  </div>

                                  {/* Checklist */}
                                  <DeliveryChecklist
                                    checklist={editingDelivery.checklist || {}}
                                    onChecklistChange={(checklist) =>
                                      setEditingDelivery({
                                        ...editingDelivery,
                                        checklist: checklist as Record<
                                          string,
                                          string | boolean
                                        >,
                                      })
                                    }
                                    type={
                                      selectedDelivery.type as
                                        | 'DELIVERY'
                                        | 'PICKUP'
                                    }
                                  />

                                  {/* Fotos */}
                                  <div className="space-y-2">
                                    <Label>Fotos</Label>
                                    <ImageUpload
                                      images={editingDelivery.photos}
                                      onImagesChange={(photos) =>
                                        setEditingDelivery({
                                          ...editingDelivery,
                                          photos,
                                        })
                                      }
                                      maxImages={10}
                                    />
                                  </div>

                                  {/* Observações */}
                                  <div className="space-y-2">
                                    <Label>Observações</Label>
                                    <Textarea
                                      value={editingDelivery.notes || ''}
                                      onChange={(e) =>
                                        setEditingDelivery({
                                          ...editingDelivery,
                                          notes: e.target.value,
                                        })
                                      }
                                      placeholder="Digite observações sobre a entrega/coleta..."
                                      rows={4}
                                    />
                                  </div>

                                  {/* Botões de Ação */}
                                  <div className="flex gap-2 pt-4">
                                    <Button
                                      onClick={handleSaveDelivery}
                                      className="flex-1"
                                    >
                                      <Save className="w-4 h-4 mr-2" />
                                      Salvar
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setIsEditing(false)
                                        setEditingDelivery({
                                          photos: [],
                                          checklist: {},
                                        })
                                      }}
                                    >
                                      Cancelar
                                    </Button>
                                  </div>
                                </div>
                              </AdminCard>
                            </>
                          ) : (
                            <>
                              <AdminCard title="Cliente">
                                <div>
                                  <p className="font-medium text-lg">
                                    {selectedDelivery.rental.users.name ||
                                      'Sem nome'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {selectedDelivery.rental.users.email}
                                  </p>
                                  {selectedDelivery.rental.users.phone && (
                                    <p className="text-sm text-gray-500">
                                      {selectedDelivery.rental.users.phone}
                                    </p>
                                  )}
                                </div>
                              </AdminCard>

                              <AdminCard title="Informações da Entrega/Coleta">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Tipo
                                    </p>
                                    <Badge variant="outline">
                                      {typeConfig[selectedDelivery.type] ||
                                        selectedDelivery.type}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Status
                                    </p>
                                    {getStatusBadge(selectedDelivery.status)}
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Agendada para
                                    </p>
                                    <p className="font-medium">
                                      {formatDate(selectedDelivery.scheduledAt)}
                                    </p>
                                  </div>
                                  {selectedDelivery.completedAt && (
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        Concluída em
                                      </p>
                                      <p className="font-medium">
                                        {formatDate(
                                          selectedDelivery.completedAt
                                        )}
                                      </p>
                                    </div>
                                  )}
                                  {selectedDelivery.driverName && (
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        Motorista
                                      </p>
                                      <p className="font-medium">
                                        {selectedDelivery.driverName}
                                      </p>
                                    </div>
                                  )}
                                  {selectedDelivery.distance && (
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        Distância
                                      </p>
                                      <p className="font-medium">
                                        {selectedDelivery.distance} km
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </AdminCard>

                              <AdminCard title="Endereço">
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                  <p className="text-gray-700">
                                    {formatAddress(selectedDelivery.address)}
                                  </p>
                                </div>
                              </AdminCard>

                              {selectedDelivery.checklist && (
                                <AdminCard title="Checklist">
                                  <div className="space-y-2">
                                    {Object.entries(
                                      selectedDelivery.checklist
                                    ).map(([key, value]) => (
                                      <div
                                        key={key}
                                        className="flex items-center gap-2"
                                      >
                                        {typeof value === 'boolean' ? (
                                          <>
                                            {value ? (
                                              <CheckCircle className="w-4 h-4 text-green-600" />
                                            ) : (
                                              <XCircle className="w-4 h-4 text-red-600" />
                                            )}
                                            <span className="text-sm text-gray-700">
                                              {key}
                                            </span>
                                          </>
                                        ) : (
                                          <span className="text-sm text-gray-700">
                                            <strong>{key}:</strong> {value}
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </AdminCard>
                              )}

                              {selectedDelivery.photos &&
                                selectedDelivery.photos.length > 0 && (
                                  <AdminCard title="Fotos">
                                    <div className="grid grid-cols-2 gap-4">
                                      {selectedDelivery.photos.map(
                                        (photo, index) => (
                                          <img
                                            key={index}
                                            src={photo}
                                            alt={`Foto ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                          />
                                        )
                                      )}
                                    </div>
                                  </AdminCard>
                                )}

                              {selectedDelivery.notes && (
                                <AdminCard title="Observações">
                                  <p className="text-gray-700">
                                    {selectedDelivery.notes}
                                  </p>
                                </AdminCard>
                              )}

                              {/* Botão de Editar */}
                              <div className="flex gap-2">
                                <Button
                                  onClick={() =>
                                    handleEditDelivery(selectedDelivery)
                                  }
                                  className="flex-1"
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Editar
                                </Button>
                                {selectedDelivery.status === 'SCHEDULED' && (
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      handleUpdateStatus(
                                        selectedDelivery.id,
                                        'IN_TRANSIT'
                                      )
                                    }
                                  >
                                    <Truck className="w-4 h-4 mr-2" />
                                    Iniciar Entrega
                                  </Button>
                                )}
                                {selectedDelivery.status === 'IN_TRANSIT' && (
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      handleUpdateStatus(
                                        selectedDelivery.id,
                                        'COMPLETED'
                                      )
                                    }
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Concluir
                                  </Button>
                                )}
                              </div>
                            </>
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
