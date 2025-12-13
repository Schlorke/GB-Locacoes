'use client'

import { useState, useEffect, useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Gauge,
  Hash,
  CheckCircle,
  Clock,
  Wrench,
  XCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface EquipmentUnit {
  id: string
  uniqueCode: string
  status: string
  hourMeter: number | null
  odometer: number | null
  serialNumber: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

interface EquipmentUnitsManagerProps {
  equipmentId: string
}

const statusConfig: Record<
  string,
  {
    label: string
    color: string
    icon: React.ComponentType<{ className?: string }>
  }
> = {
  AVAILABLE: {
    label: 'Disponível',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
  },
  RESERVED: {
    label: 'Reservado',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
  },
  RENTED: {
    label: 'Locado',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Package,
  },
  MAINTENANCE: {
    label: 'Manutenção',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: Wrench,
  },
  RETIRED: {
    label: 'Baixado',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: XCircle,
  },
}

export function EquipmentUnitsManager({
  equipmentId,
}: EquipmentUnitsManagerProps) {
  const [units, setUnits] = useState<EquipmentUnit[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<EquipmentUnit | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Form state
  const [uniqueCode, setUniqueCode] = useState('')
  const [status, setStatus] = useState('AVAILABLE')
  const [hourMeter, setHourMeter] = useState('')
  const [odometer, setOdometer] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [notes, setNotes] = useState('')

  const fetchUnits = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/admin/equipment-units?equipmentId=${equipmentId}`
      )
      if (response.ok) {
        const data = await response.json()
        setUnits(data)
      } else {
        toast.error('Erro ao carregar unidades')
      }
    } catch (error) {
      console.error('Erro ao buscar unidades:', error)
      toast.error('Erro ao buscar unidades')
    } finally {
      setLoading(false)
    }
  }, [equipmentId])

  useEffect(() => {
    fetchUnits()
  }, [fetchUnits])

  const handleCreate = () => {
    setSelectedUnit(null)
    setIsEditing(false)
    setUniqueCode('')
    setStatus('AVAILABLE')
    setHourMeter('')
    setOdometer('')
    setSerialNumber('')
    setNotes('')
    setIsDialogOpen(true)
  }

  const handleEdit = (unit: EquipmentUnit) => {
    setSelectedUnit(unit)
    setIsEditing(true)
    setUniqueCode(unit.uniqueCode)
    setStatus(unit.status)
    setHourMeter(unit.hourMeter?.toString() || '')
    setOdometer(unit.odometer?.toString() || '')
    setSerialNumber(unit.serialNumber || '')
    setNotes(unit.notes || '')
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!uniqueCode.trim()) {
      toast.error('Código único é obrigatório')
      return
    }

    try {
      const data: {
        uniqueCode: string
        status: string
        hourMeter?: number
        odometer?: number
        serialNumber?: string
        notes?: string
      } = {
        uniqueCode: uniqueCode.trim(),
        status,
      }

      if (hourMeter) {
        const hm = parseFloat(hourMeter)
        if (!isNaN(hm) && hm >= 0) {
          data.hourMeter = hm
        }
      }

      if (odometer) {
        const od = parseFloat(odometer)
        if (!isNaN(od) && od >= 0) {
          data.odometer = od
        }
      }

      if (serialNumber.trim()) {
        data.serialNumber = serialNumber.trim()
      }

      if (notes.trim()) {
        data.notes = notes.trim()
      }

      let response: Response

      if (isEditing && selectedUnit) {
        // Update
        response = await fetch(
          `/api/admin/equipment-units/${selectedUnit.id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        )
      } else {
        // Create
        response = await fetch('/api/admin/equipment-units', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            equipmentId,
          }),
        })
      }

      if (response.ok) {
        toast.success(
          isEditing
            ? 'Unidade atualizada com sucesso!'
            : 'Unidade criada com sucesso!'
        )
        setIsDialogOpen(false)
        fetchUnits()
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Erro ao salvar unidade')
      }
    } catch (error) {
      console.error('Erro ao salvar unidade:', error)
      toast.error('Erro ao salvar unidade')
    }
  }

  const handleDelete = async (unitId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta unidade?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/equipment-units/${unitId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Unidade deletada com sucesso!')
        fetchUnits()
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Erro ao deletar unidade')
      }
    } catch (error) {
      console.error('Erro ao deletar unidade:', error)
      toast.error('Erro ao deletar unidade')
    }
  }

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status] ?? statusConfig.AVAILABLE
    if (!config) return null
    const Icon = config.icon

    return (
      <Badge
        variant="outline"
        className={`${config.color} border flex items-center gap-1.5`}
      >
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Package className="h-4 w-4 sm:h-5 sm:w-5" />
              Unidades Físicas ({units.length})
            </CardTitle>
            <Button onClick={handleCreate} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nova Unidade
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {units.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500 mb-4">
                Nenhuma unidade física cadastrada
              </p>
              <Button onClick={handleCreate} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeira Unidade
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {units.map((unit) => (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold">{unit.uniqueCode}</span>
                        {getStatusBadge(unit.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {unit.hourMeter !== null && (
                          <div className="flex items-center gap-2">
                            <Gauge className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">
                              Horímetro:{' '}
                              <strong>{unit.hourMeter.toFixed(1)}h</strong>
                            </span>
                          </div>
                        )}
                        {unit.odometer !== null && (
                          <div className="flex items-center gap-2">
                            <Gauge className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">
                              Odômetro:{' '}
                              <strong>{unit.odometer.toFixed(0)}km</strong>
                            </span>
                          </div>
                        )}
                        {unit.serialNumber && (
                          <div className="col-span-2 text-gray-600">
                            <span className="font-medium">Série:</span>{' '}
                            {unit.serialNumber}
                          </div>
                        )}
                        {unit.notes && (
                          <div className="col-span-2 text-gray-600">
                            <span className="font-medium">Notas:</span>{' '}
                            {unit.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(unit)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(unit.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog para criar/editar unidade */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setIsDialogOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-50 w-full max-w-md bg-white rounded-lg shadow-xl p-6 space-y-4"
          >
            <h2 className="text-xl font-bold">
              {isEditing ? 'Editar Unidade' : 'Nova Unidade'}
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="uniqueCode">Código Único *</Label>
                <Input
                  id="uniqueCode"
                  value={uniqueCode}
                  onChange={(e) => setUniqueCode(e.target.value)}
                  placeholder="Ex: BET-001, COMP-042"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([key, config]) => {
                      const Icon = config.icon
                      return (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {config.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourMeter">Horímetro (horas)</Label>
                  <Input
                    id="hourMeter"
                    type="number"
                    min="0"
                    step="0.1"
                    value={hourMeter}
                    onChange={(e) => setHourMeter(e.target.value)}
                    placeholder="0.0"
                  />
                </div>

                <div>
                  <Label htmlFor="odometer">Odômetro (km)</Label>
                  <Input
                    id="odometer"
                    type="number"
                    min="0"
                    step="1"
                    value={odometer}
                    onChange={(e) => setOdometer(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="serialNumber">Número de Série</Label>
                <Input
                  id="serialNumber"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="Opcional"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Observações sobre esta unidade..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                {isEditing ? 'Salvar' : 'Criar'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
