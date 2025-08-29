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

// Dados dos cards principais para aplicar stagger effect
const mainStatsCards = [
  {
    title: 'Total de Equipamentos',
    value: (stats: DashboardStats | null) => stats?.totalEquipments || 0,
    subtitle: (stats: DashboardStats | null) =>
      `${stats?.availableEquipments || 0} disponíveis`,
    icon: Package,
    gradient: 'from-blue-500 to-blue-600',
    bgColors: 'from-blue-400/12 via-transparent to-black/15',
    bgColors2: 'from-transparent via-blue-500/6 to-blue-700/8',
    textColors: 'text-blue-100',
    subtitleColors: 'text-blue-200',
  },
  {
    title: 'Categorias',
    value: (stats: DashboardStats | null) => stats?.totalCategories || 0,
    subtitle: () => 'Organizadas',
    icon: BarChart3,
    gradient: 'from-green-500 to-green-600',
    bgColors: 'from-green-400/12 via-transparent to-black/15',
    bgColors2: 'from-transparent via-green-500/6 to-green-700/8',
    textColors: 'text-green-100',
    subtitleColors: 'text-green-200',
  },
  {
    title: 'Orçamentos',
    value: (stats: DashboardStats | null) => stats?.totalQuotes || 0,
    subtitle: (stats: DashboardStats | null) =>
      `${stats?.pendingQuotes || 0} pendentes`,
    icon: FileText,
    gradient: 'from-purple-500 to-purple-600',
    bgColors: 'from-purple-400/12 via-transparent to-black/15',
    bgColors2: 'from-transparent via-purple-500/6 to-purple-700/8',
    textColors: 'text-purple-100',
    subtitleColors: 'text-purple-200',
  },
  {
    title: 'Receita Mensal',
    value: (stats: DashboardStats | null) =>
      `R$ ${((stats?.monthlyRevenue || 0) / 100).toFixed(0)}`,
    subtitle: () => 'Este mês',
    icon: DollarSign,
    gradient: 'from-orange-500 to-orange-600',
    bgColors: 'from-orange-400/12 via-transparent to-black/15',
    bgColors2: 'from-transparent via-orange-500/6 to-orange-700/8',
    textColors: 'text-orange-100',
    subtitleColors: 'text-orange-200',
  },
]

// Dados dos cards de status para aplicar stagger effect
const statusStatsCards = [
  {
    title: 'Pendentes',
    value: (stats: DashboardStats | null) => stats?.pendingQuotes || 0,
    icon: Clock,
    borderColor: 'bg-yellow-500',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    valueColor: 'text-yellow-600',
  },
  {
    title: 'Aprovados',
    value: (stats: DashboardStats | null) => stats?.approvedQuotes || 0,
    icon: CheckCircle,
    borderColor: 'bg-green-500',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    valueColor: 'text-green-600',
  },
  {
    title: 'Rejeitados',
    value: (stats: DashboardStats | null) => stats?.rejectedQuotes || 0,
    icon: XCircle,
    borderColor: 'bg-red-500',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    valueColor: 'text-red-600',
  },
  {
    title: 'Concluídos',
    value: (stats: DashboardStats | null) => stats?.completedQuotes || 0,
    icon: CheckCircle,
    borderColor: 'bg-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    valueColor: 'text-blue-600',
  },
]

// Dados dos botões de ação rápida para aplicar stagger effect
const quickActionButtons = [
  {
    title: 'Adicionar Equipamento',
    subtitle: 'Cadastrar novo equipamento no sistema',
    href: '/admin/equipamentos/novo',
    icon: Plus,
    hoverColors: 'hover:bg-blue-50 hover:border-blue-300',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Gerenciar Categorias',
    subtitle: 'Organizar equipamentos por categoria',
    href: '/admin/categorias',
    icon: BarChart3,
    hoverColors: 'hover:bg-green-50 hover:border-green-300',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Ver Orçamentos',
    subtitle: 'Gerenciar solicitações de orçamento',
    href: '/admin/orcamentos',
    icon: FileText,
    hoverColors: 'hover:bg-purple-50 hover:border-purple-300',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    setRecentQuotes([])

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 lg:mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>
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

        {/* Stats Cards - Com stagger effect igual página equipamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainStatsCards.map((card, index) => {
              const IconComponent = card.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.1 + index * 0.08,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className="group"
                >
                  <Card
                    className={`relative overflow-hidden border-0 bg-gradient-to-br ${card.gradient} text-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full hover:scale-[1.02]`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.bgColors}`}
                    ></div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${card.bgColors2}`}
                    ></div>
                    <CardContent className="relative z-10 p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p
                            className={`${card.textColors} text-sm truncate mb-1`}
                          >
                            {card.title}
                          </p>
                          <p className="text-3xl font-bold mb-1">
                            {typeof card.value(stats) === 'string'
                              ? card.value(stats)
                              : card.value(stats)}
                          </p>
                          <p className={`${card.subtitleColors} text-sm`}>
                            {card.subtitle(stats)}
                          </p>
                        </div>
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Status Cards - Com stagger effect igual página equipamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statusStatsCards.map((card, index) => {
              const IconComponent = card.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.2 + index * 0.08,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className="group"
                >
                  <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full hover:scale-[1.02]">
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${card.borderColor}`}
                    ></div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-600 mb-2">
                            {card.title}
                          </p>
                          <p
                            className={`text-2xl font-bold ${card.valueColor}`}
                          >
                            {card.value(stats)}
                          </p>
                        </div>
                        <div
                          className={`w-12 h-12 ${card.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${card.iconColor}`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Ações Rápidas - Com stagger effect igual página equipamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
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
                {quickActionButtons.map((button, index) => {
                  const IconComponent = button.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.25 + index * 0.08,
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                      className="group"
                    >
                      <Button
                        asChild
                        variant="outline"
                        className={`h-auto p-6 w-full bg-transparent ${button.hoverColors} transition-all duration-300 shadow-sm hover:shadow-md border-2 hover:scale-[1.02]`}
                      >
                        <Link
                          href={button.href}
                          className="flex flex-col items-center gap-3"
                        >
                          <div
                            className={`w-16 h-16 ${button.iconBg} rounded-full flex items-center justify-center`}
                          >
                            <IconComponent
                              className={`h-8 w-8 ${button.iconColor}`}
                            />
                          </div>
                          <div className="text-center">
                            <span className="font-semibold text-lg text-gray-900 block mb-1">
                              {button.title}
                            </span>
                            <span className="text-sm text-gray-600">
                              {button.subtitle}
                            </span>
                          </div>
                        </Link>
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orçamentos Recentes - Com stagger effect igual página equipamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
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
                    delay: 0.35,
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
                        <TableHead className="min-w-[200px] font-semibold text-gray-700">
                          Cliente
                        </TableHead>
                        <TableHead className="hidden sm:table-cell min-w-[150px] font-semibold text-gray-700">
                          Empresa
                        </TableHead>
                        <TableHead className="hidden md:table-cell w-[100px] text-center font-semibold text-gray-700">
                          Itens
                        </TableHead>
                        <TableHead className="hidden lg:table-cell w-[120px] font-semibold text-gray-700">
                          Valor
                        </TableHead>
                        <TableHead className="w-[100px] font-semibold text-gray-700">
                          Status
                        </TableHead>
                        <TableHead className="hidden sm:table-cell w-[100px] font-semibold text-gray-700">
                          Data
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(recentQuotes) &&
                        recentQuotes.map((quote, index) => {
                          const StatusIcon =
                            statusConfig[
                              quote.status as keyof typeof statusConfig
                            ]?.icon || AlertTriangle

                          return (
                            <motion.tr
                              key={quote.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.35 + index * 0.08,
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
