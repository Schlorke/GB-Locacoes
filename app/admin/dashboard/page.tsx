'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  BarChart3,
  Package,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  Loader2,
  AlertTriangle,
  DollarSign,
  Calendar,
  Building,
  User,
  Activity,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface DashboardStats {
  totalEquipments: number
  availableEquipments: number
  totalCategories: number
  totalQuotes: number
  pendingQuotes: number
  approvedQuotes: number
  rejectedQuotes: number
  completedQuotes: number
  totalRevenue: number
  monthlyRevenue: number
}

interface RecentQuote {
  id: string
  customerName: string
  customerEmail: string
  customerCompany?: string
  totalAmount?: number
  status: string
  createdAt: string
  itemsCount: number
}

const statusConfig = {
  pending: {
    label: 'Pendente',
    color:
      'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200',
    icon: Clock,
  },
  approved: {
    label: 'Aprovado',
    color:
      'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200',
    icon: CheckCircle,
  },
  rejected: {
    label: 'Rejeitado',
    color:
      'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200',
    icon: XCircle,
  },
  completed: {
    label: 'Concluído',
    color:
      'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200',
    icon: CheckCircle,
  },
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    setRecentQuotes([]) // Reset para garantir array vazio

    try {
      const [statsResponse, quotesResponse] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch('/api/admin/quotes?limit=5'),
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData || null)
      }

      if (quotesResponse.ok) {
        const quotesData = await quotesResponse.json()

        // Garantir que sempre temos um array
        let quotes: RecentQuote[] = []

        if (Array.isArray(quotesData)) {
          quotes = quotesData
        } else if (
          quotesData &&
          quotesData.quotes &&
          Array.isArray(quotesData.quotes)
        ) {
          quotes = quotesData.quotes
        } else {
          console.warn('Quotes data is not in expected format:', quotesData)
          quotes = []
        }

        // Garantir que o slice funcione corretamente
        const safeQuotes = Array.isArray(quotes) ? quotes : []
        const finalQuotes = safeQuotes.slice(0, 5)

        setRecentQuotes(finalQuotes)
      } else {
        console.warn('Failed to fetch quotes:', quotesResponse.status)
        setRecentQuotes([])
      }
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
      toast.error('Erro ao carregar dados do dashboard')
      // Garantir que sempre temos um estado válido
      setRecentQuotes([])
      setStats(null)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 max-w-none xl:max-w-6xl mx-auto">
        {/* Header Estilizado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 lg:mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            {/* Clean depth layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                Dashboard Administrativo
              </h1>
              <p className="text-orange-50 mb-4 font-medium">
                Visão geral completa do sistema de locação de equipamentos
              </p>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <Activity className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  Sistema em tempo real
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - Estilizados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card Equipamentos */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/12 via-transparent to-black/15"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/6 to-blue-700/8"></div>
                <CardContent className="relative z-10 p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-blue-100 text-sm truncate mb-1">
                        Total de Equipamentos
                      </p>
                      <p className="text-3xl font-bold mb-1">
                        {stats?.totalEquipments || 0}
                      </p>
                      <p className="text-blue-200 text-sm">
                        {stats?.availableEquipments || 0} disponíveis
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card Categorias */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.18,
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/12 via-transparent to-black/15"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-green-500/6 to-green-700/8"></div>
                <CardContent className="relative z-10 p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-green-100 text-sm truncate mb-1">
                        Categorias
                      </p>
                      <p className="text-3xl font-bold mb-1">
                        {stats?.totalCategories || 0}
                      </p>
                      <p className="text-green-200 text-sm">
                        Organizadas
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card Orçamentos */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.26,
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/12 via-transparent to-black/15"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/6 to-purple-700/8"></div>
                <CardContent className="relative z-10 p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-purple-100 text-sm truncate mb-1">
                        Orçamentos
                      </p>
                      <p className="text-3xl font-bold mb-1">
                        {stats?.totalQuotes || 0}
                      </p>
                      <p className="text-purple-200 text-sm">
                        {stats?.pendingQuotes || 0} pendentes
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card Receita */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.34,
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>
                <CardContent className="relative z-10 p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-orange-100 text-sm truncate mb-1">
                        Receita Mensal
                      </p>
                      <p className="text-3xl font-bold mb-1">
                        R$ {((stats?.monthlyRevenue || 0) / 100).toFixed(0)}
                      </p>
                      <p className="text-orange-200 text-sm">
                        Este mês
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Status dos Orçamentos - Estilizados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pendentes */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.42,
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 mb-2">Pendentes</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {stats?.pendingQuotes || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Aprovados */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 mb-2">Aprovados</p>
                      <p className="text-2xl font-bold text-green-600">
                        {stats?.approvedQuotes || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rejeitados */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.58,
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 mb-2">Rejeitados</p>
                      <p className="text-2xl font-bold text-red-600">
                        {stats?.rejectedQuotes || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Concluídos */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.66,
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 mb-2">Concluídos</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats?.completedQuotes || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Ações Rápidas - Estilizadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.74 }}
          className="mb-8"
        >
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Adicionar Equipamento */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.74,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-6 w-full bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md border-2"
                  >
                    <Link
                      href="/admin/equipamentos/novo"
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Plus className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-center">
                        <span className="font-semibold text-lg text-gray-900 block mb-1">
                          Adicionar Equipamento
                        </span>
                        <span className="text-sm text-gray-600">
                          Cadastrar novo equipamento no sistema
                        </span>
                      </div>
                    </Link>
                  </Button>
                </motion.div>

                {/* Gerenciar Categorias */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.82,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-6 w-full bg-transparent hover:bg-green-50 hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md border-2"
                  >
                    <Link
                      href="/admin/categorias"
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="text-center">
                        <span className="font-semibold text-lg text-gray-900 block mb-1">
                          Gerenciar Categorias
                        </span>
                        <span className="text-sm text-gray-600">
                          Organizar equipamentos por categoria
                        </span>
                      </div>
                    </Link>
                  </Button>
                </motion.div>

                {/* Ver Orçamentos */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.9,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-6 w-full bg-transparent hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md border-2"
                  >
                    <Link
                      href="/admin/orcamentos"
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                        <FileText className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="text-center">
                        <span className="font-semibold text-lg text-gray-900 block mb-1">
                          Ver Orçamentos
                        </span>
                        <span className="text-sm text-gray-600">
                          Gerenciar solicitações de orçamento
                        </span>
                      </div>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orçamentos Recentes - Estilizados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.98 }}
          className="mb-8"
        >
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <CardHeader className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  Orçamentos Recentes
                </CardTitle>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-11 px-6 bg-transparent hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                >
                  <Link href="/admin/orcamentos">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Todos
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              {!Array.isArray(recentQuotes) || recentQuotes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.98,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Nenhum orçamento recente
                  </h3>
                  <p className="text-gray-500">
                    Os orçamentos solicitados aparecerão aqui
                  </p>
                </motion.div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200">
                        <TableHead className="min-w-[200px] font-semibold text-gray-700">Cliente</TableHead>
                        <TableHead className="hidden sm:table-cell min-w-[150px] font-semibold text-gray-700">
                          Empresa
                        </TableHead>
                        <TableHead className="hidden md:table-cell w-[100px] text-center font-semibold text-gray-700">
                          Itens
                        </TableHead>
                        <TableHead className="hidden lg:table-cell w-[120px] font-semibold text-gray-700">
                          Valor
                        </TableHead>
                        <TableHead className="w-[100px] font-semibold text-gray-700">Status</TableHead>
                        <TableHead className="hidden sm:table-cell w-[100px] font-semibold text-gray-700">
                          Data
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(recentQuotes) &&
                        recentQuotes.map((quote, index) => {
                          const StatusIcon =
                            statusConfig[quote.status as keyof typeof statusConfig]
                              ?.icon || AlertTriangle

                          return (
                            <motion.tr
                              key={quote.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.98 + (index * 0.08),
                                duration: 0.3,
                                ease: 'easeOut',
                              }}
                              className="hover:bg-gray-50 transition-colors duration-200"
                            >
                              <TableCell className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-gray-900 truncate">
                                      {quote.customerName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                      {quote.customerEmail}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell p-4">
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                  <span className="text-sm text-gray-700 truncate">
                                    {quote.customerCompany || '-'}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell text-center p-4">
                                <span className="font-semibold text-gray-900 text-sm">
                                  {quote.itemsCount}
                                </span>
                              </TableCell>
                              <TableCell className="hidden lg:table-cell p-4">
                                <span className="font-bold text-green-600 text-sm">
                                  {quote.totalAmount
                                    ? `R$ ${quote.totalAmount.toFixed(2)}`
                                    : '-'}
                                </span>
                              </TableCell>
                              <TableCell className="p-4">
                                <Badge
                                  className={`${statusConfig[quote.status as keyof typeof statusConfig]?.color} flex items-center gap-2 w-fit text-xs font-medium px-3 py-1`}
                                >
                                  <StatusIcon className="h-3 w-3" />
                                  <span className="hidden sm:inline">
                                    {
                                      statusConfig[
                                        quote.status as keyof typeof statusConfig
                                      ]?.label
                                    }
                                  </span>
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell p-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(quote.createdAt).toLocaleDateString(
                                    'pt-BR'
                                  )}
                                </div>
                              </TableCell>
                            </motion.tr>
                          )
                        })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
