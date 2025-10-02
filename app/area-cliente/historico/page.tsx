'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SearchBar } from '@/components/ui/search-bar'
import {
  Calendar,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen bg-gray-50 pt-[84px] sm:pt-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden w-screen -ml-4 sm:w-full sm:ml-0">
        {/* Elementos animados de background removidos nesta seção da área do cliente */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold leading-tight">
              Histórico de Locações
            </h1>
            <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto">
              Acompanhe todas as suas solicitações de orçamento e locações
            </p>
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
          {/* Search Bar */}
          <motion.div
            className="mb-8 relative z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                    { value: 'all', label: 'Todos os status' },
                    { value: 'pending', label: 'Pendente' },
                    { value: 'approved', label: 'Aprovado' },
                    { value: 'in_progress', label: 'Em Andamento' },
                    { value: 'completed', label: 'Concluído' },
                    { value: 'cancelled', label: 'Cancelado' },
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
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredRentals.map((rental, index) => {
              const statusInfo = getStatusInfo(rental.status)
              const StatusIcon = statusInfo.icon

              return (
                <motion.div
                  key={rental.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group z-0 border-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
                    <CardContent className="p-6 relative z-0">
                      <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white">
                              <Package className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {rental.equipmentName}
                            </h3>
                            <Badge
                              className={`${statusInfo.color} px-3 py-1 rounded-full font-medium hover:shadow-none status-badge-hover`}
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusInfo.label}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span className="font-medium">Quantidade:</span>
                              <span className="font-bold text-gray-900">
                                {rental.quantity}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="font-medium">Período:</span>
                              <span className="font-bold text-gray-900">
                                {rental.days} dias
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="font-medium">Valor Total:</span>
                              <span className="font-bold text-gray-900">
                                R$ {rental.totalPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {rental.description && (
                            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-xl">
                              {rental.description}
                            </p>
                          )}

                          <div className="flex items-center gap-6 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span className="font-medium">Criado em:</span>
                              <span>
                                {new Date(rental.createdAt).toLocaleDateString(
                                  'pt-BR'
                                )}
                              </span>
                            </div>
                            {rental.startDate && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium">Início:</span>
                                <span>
                                  {new Date(
                                    rental.startDate
                                  ).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                            )}
                            {rental.endDate && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium">Fim:</span>
                                <span>
                                  {new Date(rental.endDate).toLocaleDateString(
                                    'pt-BR'
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap gap-3 mt-3 md:mt-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 min-w-0 inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group border border-gray-200"
                          >
                            <Eye className="h-4 w-4" />
                            Ver Detalhes
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          {rental.status === 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 min-w-0 inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-white text-red-600 hover:text-red-700 font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group border-2 border-red-200"
                            >
                              Cancelar
                            </Button>
                          )}
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
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl z-0 border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
                <CardContent className="text-center py-16 relative z-0">
                  <div className="p-6 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Package className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Nenhuma locação encontrada
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Tente ajustar os filtros de busca'
                      : 'Você ainda não possui histórico de locações'}
                  </p>
                  {!searchTerm && statusFilter === 'all' && (
                    <Button
                      size="default"
                      className="inline-flex items-center gap-2 px-6 group rounded-lg"
                    >
                      Solicitar Primeiro Orçamento
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
