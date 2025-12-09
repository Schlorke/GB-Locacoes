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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
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
  Target,
  Percent,
  TrendingDown,
  Lightbulb,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'

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
  quotesTrend?: Array<{
    date: string
    fullDate: string
    count: number
  }>
  equipmentByCategory?: Array<{
    categoryName: string
    count: number
    available: number
    categoryId: string
    bgColor: string
    fontColor: string
  }>
  topEquipments?: Array<{
    id: string
    name: string
    requestCount: number
    category: string
  }>
  utilizationRate?: number
  conversionRate?: number
  averageTicket?: number
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
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Categorias',
    value: (stats: DashboardStats | null) => stats?.totalCategories || 0,
    subtitle: () => 'Organizadas',
    icon: BarChart3,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: 'Orçamentos',
    value: (stats: DashboardStats | null) => stats?.totalQuotes || 0,
    subtitle: (stats: DashboardStats | null) =>
      `${stats?.pendingQuotes || 0} pendentes`,
    icon: FileText,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Receita Mensal',
    value: (stats: DashboardStats | null) => {
      const revenue = Number(stats?.monthlyRevenue || 0)
      return `R$ ${revenue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    },
    subtitle: () => 'Este mês',
    icon: DollarSign,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
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
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    title: 'Gerenciar Categorias',
    subtitle: 'Organizar equipamentos por categoria',
    href: '/admin/categorias',
    icon: BarChart3,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    title: 'Ver Orçamentos',
    subtitle: 'Gerenciar solicitações de orçamento',
    href: '/admin/orcamentos',
    icon: FileText,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Saudação contextual
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  // Cores para gráficos
  const chartColors = {
    orange: '#ea580c',
    orangeLight: '#f97316',
    green: '#22c55e',
    greenDark: '#16a34a',
    yellow: '#eab308',
    yellowDark: '#ca8a04',
    red: '#ef4444',
    redDark: '#dc2626',
    blue: '#3b82f6',
    blueDark: '#2563eb',
    purple: '#8b5cf6',
  }

  // Dados para gráfico de rosca (status) - Usando variações de laranja
  const statusChartData = stats
    ? [
        {
          name: 'Pendentes',
          value: stats.pendingQuotes,
          color: '#fdba74', // orange-300
        },
        {
          name: 'Aprovados',
          value: stats.approvedQuotes,
          color: '#f97316', // orange-500
        },
        {
          name: 'Rejeitados',
          value: stats.rejectedQuotes,
          color: '#9a3412', // orange-800
        },
        {
          name: 'Concluídos',
          value: stats.completedQuotes,
          color: '#ea580c', // orange-600
        },
      ].filter((item) => item.value > 0)
    : []

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
      <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
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
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 pb-24 md:pb-12 max-w-none xl:max-w-6xl mx-auto">
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
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white drop-shadow-sm">
                  Dashboard Executivo
                </h1>
                <Badge className="bg-white/20 text-white border-white/30">
                  {getGreeting()}
                </Badge>
              </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                  <Card className="relative overflow-hidden border border-gray-100 bg-gradient-to-br from-white via-white to-slate-50 text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100/60 via-white to-slate-50/40"></div>
                    <CardContent className="relative z-10 p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-gray-500 truncate mb-1">
                            {card.title}
                          </p>
                          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold my-1 text-gray-900">
                            {typeof card.value(stats) === 'string'
                              ? card.value(stats)
                              : card.value(stats)}
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-gray-600">
                            {card.subtitle(stats)}
                          </p>
                        </div>
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner ${card.iconBg || 'bg-gray-100'}`}
                        >
                          <IconComponent
                            className={`h-6 w-6 sm:h-8 sm:w-8 ${card.iconColor || 'text-orange-600'}`}
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
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-600 mb-2">
                            {card.title}
                          </p>
                          <p
                            className={`text-xl sm:text-2xl font-bold ${card.valueColor}`}
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

        {/* Gráficos de Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Gráfico de Área - Tendência de Orçamentos */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3, ease: 'easeOut' }}
            >
              <Card className="relative h-full overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    Tendência de Orçamentos (7 dias)
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 flex-1">
                  {stats?.quotesTrend && stats.quotesTrend.length > 0 ? (
                    <ChartContainer
                      config={{
                        count: {
                          label: 'Orçamentos',
                          color: chartColors.orange,
                        },
                      }}
                      className="h-[280px] md:h-[320px]"
                    >
                      <AreaChart data={stats.quotesTrend}>
                        <defs>
                          <linearGradient
                            id="colorCount"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={chartColors.orange}
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor={chartColors.orangeLight}
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          allowDecimals={false}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={(value) => [
                                `${value} orçamentos`,
                                'Orçamentos',
                              ]}
                            />
                          }
                        />
                        <Area
                          type="monotone"
                          dataKey="count"
                          stroke={chartColors.orange}
                          strokeWidth={2}
                          fill="url(#colorCount)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  ) : (
                    <div className="h-[280px] md:h-[320px] flex items-center justify-center text-gray-400">
                      Sem dados disponíveis
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Gráfico de Rosca - Distribuição de Status */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.3, ease: 'easeOut' }}
            >
              <Card className="relative h-full overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    Distribuição de Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 flex-1 flex flex-col">
                  {statusChartData.length > 0 ? (
                    <div className="flex flex-col items-center flex-1">
                      <ChartContainer
                        config={statusChartData.reduce(
                          (acc, item) => ({
                            ...acc,
                            [item.name]: {
                              label: item.name,
                              color: item.color,
                            },
                          }),
                          {}
                        )}
                        className="h-[280px] md:h-[320px]"
                      >
                        <PieChart>
                          <Pie
                            data={statusChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {statusChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                formatter={(value) => [
                                  `${value} orçamentos`,
                                  '',
                                ]}
                              />
                            }
                          />
                          <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => value}
                          />
                        </PieChart>
                      </ChartContainer>
                      <div className="mt-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {stats?.totalQuotes || 0}
                        </p>
                        <p className="text-sm text-gray-500">Total</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[280px] md:h-[320px] flex items-center justify-center text-gray-400">
                      Sem dados disponíveis
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Métricas de Saúde do Negócio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Taxa de Utilização da Frota */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3, ease: 'easeOut' }}
            >
              <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                <CardContent className="relative z-10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Taxa de Utilização
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats?.utilizationRate?.toFixed(1) || 0}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(stats?.utilizationRate || 0, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {stats?.availableEquipments || 0} de{' '}
                    {stats?.totalEquipments || 0} disponíveis
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Taxa de Conversão */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.3, ease: 'easeOut' }}
            >
              <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                <CardContent className="relative z-10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Taxa de Conversão
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats?.conversionRate?.toFixed(1) || 0}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Percent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(stats?.conversionRate || 0, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {(stats?.approvedQuotes || 0) +
                      (stats?.completedQuotes || 0)}{' '}
                    de {stats?.totalQuotes || 0} orçamentos
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ticket Médio */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3, ease: 'easeOut' }}
            >
              <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                <CardContent className="relative z-10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Ticket Médio</p>
                      <p className="text-2xl font-bold text-gray-900">
                        R${' '}
                        {stats?.averageTicket?.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) || '0,00'}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="w-full h-2.5 mb-2"></div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Valor médio por orçamento</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Top Equipamentos Mais Solicitados */}
        {stats?.topEquipments && stats.topEquipments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mb-8"
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  Equipamentos Mais Solicitados
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {stats.topEquipments.map((equipment, index) => {
                    const maxCount = stats.topEquipments?.[0]?.requestCount || 1
                    const percentage = (equipment.requestCount / maxCount) * 100

                    return (
                      <motion.div
                        key={equipment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.55 + index * 0.1,
                          duration: 0.3,
                        }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {equipment.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {equipment.category}
                            </p>
                          </div>
                          <div className="ml-4 text-right">
                            <p className="font-bold text-gray-900">
                              {equipment.requestCount}
                            </p>
                            <p className="text-xs text-gray-500">
                              solicitações
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Distribuição por Categoria */}
        {stats?.equipmentByCategory && stats.equipmentByCategory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  Distribuição por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <ChartContainer
                  config={stats.equipmentByCategory.reduce(
                    (acc, item) => ({
                      ...acc,
                      [item.categoryName]: {
                        label: item.categoryName,
                        color: item.bgColor || chartColors.blue,
                      },
                    }),
                    {}
                  )}
                  className="h-[400px]"
                >
                  <BarChart data={stats.equipmentByCategory} layout="vertical">
                    <XAxis type="number" />
                    <YAxis
                      dataKey="categoryName"
                      type="category"
                      width={120}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => [
                            `${value} equipamentos`,
                            name,
                          ]}
                        />
                      }
                    />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {stats.equipmentByCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.bgColor || chartColors.blue}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Insights e Oportunidades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mb-8"
        >
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-orange-100/30"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                Insights e Oportunidades
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {stats?.pendingQuotes && stats.pendingQuotes > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65, duration: 0.3 }}
                    className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-yellow-900">
                        {stats.pendingQuotes} orçamento
                        {stats.pendingQuotes > 1 ? 's' : ''} pendente
                        {stats.pendingQuotes > 1 ? 's' : ''} aguardando análise
                      </p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Revise e processe os orçamentos pendentes para melhorar
                        a taxa de conversão.
                      </p>
                    </div>
                  </motion.div>
                )}
                {stats?.conversionRate &&
                  stats.conversionRate < 50 &&
                  stats.totalQuotes > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                      className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <TrendingDown className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900">
                          Taxa de conversão abaixo do ideal
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          Considere revisar os critérios de aprovação ou
                          melhorar a comunicação com os clientes.
                        </p>
                      </div>
                    </motion.div>
                  )}
                {stats?.utilizationRate &&
                  stats.utilizationRate < 60 &&
                  stats.totalEquipments > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.75, duration: 0.3 }}
                      className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                    >
                      <Activity className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-green-900">
                          Oportunidade de otimização de estoque
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          Alguns equipamentos podem estar ociosos. Considere
                          ajustar o mix de produtos ou estratégias de marketing.
                        </p>
                      </div>
                    </motion.div>
                  )}
                {(!stats?.pendingQuotes || stats.pendingQuotes === 0) &&
                  stats?.conversionRate &&
                  stats.conversionRate >= 50 &&
                  stats?.utilizationRate &&
                  stats.utilizationRate >= 60 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.65, duration: 0.3 }}
                      className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-green-900">
                          Sistema operando em excelência
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          Todas as métricas estão dentro dos parâmetros ideais.
                          Continue monitorando para manter o desempenho.
                        </p>
                      </div>
                    </motion.div>
                  )}
              </div>
            </CardContent>
          </Card>
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
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
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
                        className="h-40 p-6 w-full bg-white hover:bg-white hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl border-0 hover:scale-[1.02] group"
                      >
                        <Link
                          href={button.href}
                          className="flex flex-col items-center justify-center gap-3 h-full"
                        >
                          <div
                            className={`w-12 h-12 ${button.iconBg} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent
                              className={`h-6 w-6 ${button.iconColor}`}
                            />
                          </div>
                          <div className="text-center">
                            <span className="font-semibold text-lg text-gray-900 group-hover:text-orange-500 block mb-1 break-words transition-colors duration-300">
                              {button.title}
                            </span>
                            <span className="text-sm text-gray-600 group-hover:text-orange-400 break-words transition-colors duration-300">
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
              <div className="flex flex-col gap-4">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  Orçamentos Recentes
                </CardTitle>
                <div className="flex justify-center sm:justify-end">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-white border-gray-200 hover:bg-white hover:border-gray-300 hover:text-orange-500"
                  >
                    <Link href="/admin/orcamentos">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Todos
                    </Link>
                  </Button>
                </div>
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
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    Nenhum orçamento recente
                  </h3>
                  <p className="text-sm md:text-base text-gray-500">
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
