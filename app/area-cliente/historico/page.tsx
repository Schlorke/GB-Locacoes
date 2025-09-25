'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  History,
  Search,
  Calendar,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
} from 'lucide-react'

interface RentalHistory {
  id: string
  equipmentName: string
  quantity: number
  days: number
  totalPrice: number
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  startDate?: string
  endDate?: string
  description?: string
}

export default function HistoricoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Dados mockados - em produção viriam da API
  const [rentals] = useState<RentalHistory[]>([
    {
      id: '1',
      equipmentName: 'Betoneira 400L',
      quantity: 1,
      days: 7,
      totalPrice: 350.0,
      status: 'completed',
      createdAt: '2024-01-15',
      startDate: '2024-01-16',
      endDate: '2024-01-23',
      description: 'Locação para obra residencial',
    },
    {
      id: '2',
      equipmentName: 'Martelo Demolidor',
      quantity: 2,
      days: 3,
      totalPrice: 180.0,
      status: 'in_progress',
      createdAt: '2024-01-20',
      startDate: '2024-01-21',
      description: 'Demolição de parede',
    },
    {
      id: '3',
      equipmentName: 'Gerador 5KVA',
      quantity: 1,
      days: 15,
      totalPrice: 450.0,
      status: 'approved',
      createdAt: '2024-01-22',
      startDate: '2024-01-25',
      description: 'Backup de energia para evento',
    },
    {
      id: '4',
      equipmentName: 'Andaime 2x2m',
      quantity: 4,
      days: 10,
      totalPrice: 800.0,
      status: 'cancelled',
      createdAt: '2024-01-18',
      description: 'Cancelado pelo cliente',
    },
  ])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pendente',
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
        }
      case 'approved':
        return {
          label: 'Aprovado',
          color: 'bg-blue-100 text-blue-800',
          icon: CheckCircle,
        }
      case 'in_progress':
        return {
          label: 'Em Andamento',
          color: 'bg-orange-100 text-orange-800',
          icon: Package,
        }
      case 'completed':
        return {
          label: 'Concluído',
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
        }
      case 'cancelled':
        return {
          label: 'Cancelado',
          color: 'bg-red-100 text-red-800',
          icon: XCircle,
        }
      default:
        return {
          label: 'Desconhecido',
          color: 'bg-gray-100 text-gray-800',
          icon: AlertCircle,
        }
    }
  }

  const filteredRentals = rentals.filter((rental) => {
    const matchesSearch = rental.equipmentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || rental.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Histórico de Locações
          </h1>
          <p className="text-slate-600">
            Acompanhe todas as suas solicitações de orçamento
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por equipamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Filtrar por status"
              >
                <option value="all">Todos os status</option>
                <option value="pending">Pendente</option>
                <option value="approved">Aprovado</option>
                <option value="in_progress">Em Andamento</option>
                <option value="completed">Concluído</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rentals List */}
      <div className="space-y-4">
        {filteredRentals.map((rental) => {
          const statusInfo = getStatusInfo(rental.status)
          const StatusIcon = statusInfo.icon

          return (
            <Card key={rental.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="h-5 w-5 text-slate-500" />
                      <h3 className="text-lg font-semibold text-slate-900">
                        {rental.equipmentName}
                      </h3>
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                      <div>
                        <span className="font-medium">Quantidade:</span>{' '}
                        {rental.quantity}
                      </div>
                      <div>
                        <span className="font-medium">Período:</span>{' '}
                        {rental.days} dias
                      </div>
                      <div>
                        <span className="font-medium">Valor Total:</span> R${' '}
                        {rental.totalPrice.toFixed(2)}
                      </div>
                    </div>

                    {rental.description && (
                      <p className="text-sm text-slate-600 mt-2">
                        {rental.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Criado em:{' '}
                        {new Date(rental.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      {rental.startDate && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Início:{' '}
                          {new Date(rental.startDate).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                      )}
                      {rental.endDate && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Fim:{' '}
                          {new Date(rental.endDate).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalhes
                    </Button>
                    {rental.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredRentals.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <History className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Nenhuma locação encontrada
            </h3>
            <p className="text-slate-600 mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Você ainda não possui histórico de locações'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button>Solicitar Primeiro Orçamento</Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
