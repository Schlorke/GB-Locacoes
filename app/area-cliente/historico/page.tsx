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
  ArrowRight,
  Filter,
  TrendingUp,
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden">
        {/* Elementos animados de background */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              Histórico de Locações
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
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
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total de Locações
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {rentals.length}
                    </p>
                    <p className="text-sm text-gray-500">solicitações</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <History className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Valor Total
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      R${' '}
                      {rentals
                        .reduce((sum, rental) => sum + rental.totalPrice, 0)
                        .toFixed(0)}
                    </p>
                    <p className="text-sm text-gray-500">em locações</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Em Andamento
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {rentals.filter((r) => r.status === 'in_progress').length}
                    </p>
                    <p className="text-sm text-gray-500">ativas</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Package className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-50"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Buscar por equipamento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-12 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl">
                      <Filter className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Filtros:
                      </span>
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-12"
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
          </motion.div>

          {/* Rentals List */}
          <motion.div
            className="mt-8 space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
                  <Card className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                              <Package className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {rental.equipmentName}
                            </h3>
                            <Badge
                              className={`${statusInfo.color} px-3 py-1 rounded-full font-medium`}
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

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 hover:text-orange-600 font-medium rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group border-2 border-gray-200 hover:border-orange-300"
                          >
                            <Eye className="h-4 w-4" />
                            Ver Detalhes
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          {rental.status === 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 font-medium rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group border-2 border-red-200 hover:border-red-300"
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
              <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
                <CardContent className="text-center py-16 relative z-10">
                  <div className="p-6 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <History className="h-12 w-12 text-gray-400" />
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
                    <Button className="inline-flex items-center gap-2 px-6 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group">
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
