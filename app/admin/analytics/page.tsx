'use client'

import { AdminFilterCard } from '@/components/admin/admin-filter-card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Clock,
  Database,
  Eye,
  Globe,
  Hash,
  RefreshCw,
  Server,
  Shield,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { Suspense, useCallback, useEffect, useState } from 'react'

interface Analytics {
  overview: {
    totalRequests: number
    uniqueEndpoints: number
    avgResponseTime: number
    errorRate: number
  }
  topEndpoints: Array<{
    endpoint: string
    requests: number
    avgTime: number
    errorRate: number
  }>
  recentErrors: Array<{
    endpoint: string
    error: string
    timestamp: string
    count: number
  }>
  userActivity: {
    authenticated: number
    anonymous: number
    adminRequests: number
  }
  timeStats: {
    hour: Record<string, number>
    day: Record<string, number>
  }
  anomalies: Array<{
    type: 'high_error_rate' | 'slow_response' | 'unusual_activity'
    endpoint: string
    message: string
    severity: 'low' | 'medium' | 'high'
    timestamp: string
  }>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showDetails, setShowDetails] = useState<string | null>(null)

  const { toast } = useToast()

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `/api/admin/analytics?period=${selectedPeriod}`
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setAnalytics(data)
      setLastUpdated(new Date())

      if (data.anomalies?.length > 0) {
        toast({
          title: '⚠️ Anomalias Detectadas',
          description: `${data.anomalies.length} anomalia(s) encontrada(s) na API`,
          variant: 'destructive',
        })
      }
    } catch (err) {
      console.error('Erro ao buscar analytics:', err)
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      toast({
        title: 'Erro ao carregar analytics',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [selectedPeriod, toast])

  useEffect(() => {
    fetchAnalytics()

    if (autoRefresh) {
      const interval = setInterval(fetchAnalytics, 30000)
      return () => clearInterval(interval)
    }

    return undefined
  }, [fetchAnalytics, autoRefresh])

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  const formatPercent = (num: number): string => {
    return `${(num * 100).toFixed(1)}%`
  }

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'warning'
      case 'low':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  const getResponseTimeColor = (time: number): string => {
    if (time > 2000) return 'text-red-600'
    if (time > 1000) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getErrorRateColor = (rate: number): string => {
    if (rate > 0.1) return 'text-red-600'
    if (rate > 0.05) return 'text-yellow-600'
    return 'text-green-600'
  }

  if (loading && !analytics) {
    return (
      <Suspense fallback={<div>Carregando...</div>}>
        <div className="space-y-6 p-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Filter Card Skeleton */}
          <Card className="border-border/40">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-24" />
              </div>
            </CardContent>
          </Card>

          {/* Metrics Grid Skeleton */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Grid Skeleton */}
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="border-border/40">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-64 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Suspense>
    )
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              Analytics da API
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitoramento em tempo real da performance e uso da API
            </p>
          </div>
          <Button
            onClick={fetchAnalytics}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`}
            />
            Tentar Novamente
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-medium">
              Erro ao carregar analytics: {error}
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="space-y-6 p-6">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-orange-600" />
          Analytics da API
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="border-blue-200 bg-blue-50">
            <Database className="h-4 w-4" />
            <AlertDescription>
              Nenhum dado de analytics disponível no momento. Os dados
              aparecerão quando houver atividade na API.
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="space-y-6 p-3 sm:p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto">
        {/* Header com animação */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              Analytics da API
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitoramento em tempo real da performance e uso da API
            </p>
            {lastUpdated && (
              <div className="flex items-center gap-4 mt-3">
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Última atualização: {lastUpdated.toLocaleTimeString()}
                </Badge>
                <Badge
                  variant={autoRefresh ? 'default' : 'secondary'}
                  className={cn(
                    'text-xs cursor-pointer',
                    autoRefresh &&
                      'bg-green-100 text-green-800 border-green-300'
                  )}
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchAnalytics}
              disabled={loading}
              variant="outline"
              className="border-orange-200 hover:border-orange-300 hover:bg-orange-50"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`}
              />
              Atualizar
            </Button>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AdminFilterCard
            filters={[
              {
                label: 'Período',
                value: selectedPeriod,
                onValueChange: setSelectedPeriod,
                placeholder: 'Selecionar período',
                options: [
                  { label: 'Últimas 24 horas', value: '1d' },
                  { label: 'Últimos 7 dias', value: '7d' },
                  { label: 'Últimos 30 dias', value: '30d' },
                ],
              },
            ]}
            actionButtons={
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setShowDetails(showDetails ? null : 'overview')
                  }
                  className="border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {showDetails ? 'Ocultar' : 'Detalhes'}
                </Button>
              </div>
            }
          />
        </motion.div>

        {/* Anomalias com animação */}
        <AnimatePresence>
          {analytics.anomalies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                variant="destructive"
                className="border-red-200 bg-red-50/50 backdrop-blur"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {analytics.anomalies.length} anomalia(s) detectada(s) na API
                  </div>
                  <div className="space-y-2">
                    {analytics.anomalies.slice(0, 3).map((anomaly, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-red-100"
                      >
                        <Badge
                          variant={
                            getSeverityColor(anomaly.severity) as
                              | 'default'
                              | 'destructive'
                              | 'outline'
                              | 'secondary'
                          }
                          className="text-xs font-medium"
                        >
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                        <div className="flex-1">
                          <span className="font-medium text-sm">
                            {anomaly.endpoint}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            {anomaly.message}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(anomaly.timestamp).toLocaleTimeString()}
                        </div>
                      </motion.div>
                    ))}
                    {analytics.anomalies.length > 3 && (
                      <div className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowDetails('anomalies')}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Ver todas as {analytics.anomalies.length} anomalias
                        </Button>
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Métricas Principais com animações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              title: 'Total de Requests',
              value: formatNumber(analytics.overview.totalRequests),
              description: `${analytics.overview.uniqueEndpoints} endpoints únicos`,
              icon: Activity,
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
              borderColor: 'border-blue-200',
            },
            {
              title: 'Tempo de Resposta',
              value: `${analytics.overview.avgResponseTime}ms`,
              description: 'Tempo médio de resposta',
              icon: Clock,
              color: getResponseTimeColor(analytics.overview.avgResponseTime),
              bgColor:
                analytics.overview.avgResponseTime > 2000
                  ? 'bg-red-50'
                  : analytics.overview.avgResponseTime > 1000
                    ? 'bg-yellow-50'
                    : 'bg-green-50',
              borderColor:
                analytics.overview.avgResponseTime > 2000
                  ? 'border-red-200'
                  : analytics.overview.avgResponseTime > 1000
                    ? 'border-yellow-200'
                    : 'border-green-200',
            },
            {
              title: 'Taxa de Erro',
              value: formatPercent(analytics.overview.errorRate),
              description: 'Taxa de erro geral',
              icon:
                analytics.overview.errorRate > 0.05 ? TrendingUp : TrendingDown,
              color: getErrorRateColor(analytics.overview.errorRate),
              bgColor:
                analytics.overview.errorRate > 0.1
                  ? 'bg-red-50'
                  : analytics.overview.errorRate > 0.05
                    ? 'bg-yellow-50'
                    : 'bg-green-50',
              borderColor:
                analytics.overview.errorRate > 0.1
                  ? 'border-red-200'
                  : analytics.overview.errorRate > 0.05
                    ? 'border-yellow-200'
                    : 'border-green-200',
            },
            {
              title: 'Usuários Ativos',
              value: formatNumber(
                analytics.userActivity.authenticated +
                  analytics.userActivity.anonymous
              ),
              description: `${analytics.userActivity.authenticated} autenticados, ${analytics.userActivity.adminRequests} admin`,
              icon: Users,
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              borderColor: 'border-purple-200',
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <Card
                className={cn(
                  'relative overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer',
                  metric.borderColor,
                  metric.bgColor
                )}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    {metric.title}
                  </CardTitle>
                  <div className={cn('p-2 rounded-full', metric.bgColor)}>
                    <metric.icon className={cn('h-4 w-4', metric.color)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={cn('text-2xl font-bold', metric.color)}>
                    {metric.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.description}
                  </p>
                </CardContent>
                {/* Accent border */}
                <div
                  className={cn(
                    'absolute bottom-0 left-0 right-0 h-1',
                    metric.bgColor
                  )}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Seção de Dados Detalhados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Top Endpoints */}
          <Card className="border-border/40">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Server className="h-5 w-5 text-orange-600" />
                    Endpoints Mais Utilizados
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Rankings por número de requisições (
                    {selectedPeriod === '1d'
                      ? 'últimas 24h'
                      : selectedPeriod === '7d'
                        ? 'últimos 7 dias'
                        : 'últimos 30 dias'}
                    )
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setShowDetails(
                      showDetails === 'endpoints' ? null : 'endpoints'
                    )
                  }
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.topEndpoints
                  .slice(
                    0,
                    showDetails === 'endpoints'
                      ? analytics.topEndpoints.length
                      : 8
                  )
                  .map((endpoint, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group p-3 rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              #{i + 1}
                            </Badge>
                            <Badge
                              variant={
                                endpoint.endpoint.includes('/admin')
                                  ? 'destructive'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {endpoint.endpoint.includes('/admin')
                                ? 'ADMIN'
                                : 'PUBLIC'}
                            </Badge>
                          </div>
                          <p className="font-mono text-sm font-medium truncate group-hover:text-orange-700 transition-colors">
                            {endpoint.endpoint}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span className="flex items-center gap-1">
                              <Hash className="h-3 w-3 text-blue-500" />
                              <span className="font-medium">
                                {formatNumber(endpoint.requests)}
                              </span>
                              <span className="text-muted-foreground">
                                requests
                              </span>
                            </span>
                            <span
                              className={cn(
                                'flex items-center gap-1',
                                getResponseTimeColor(endpoint.avgTime)
                              )}
                            >
                              <Clock className="h-3 w-3" />
                              <span className="font-medium">
                                {endpoint.avgTime}ms
                              </span>
                            </span>
                            <span
                              className={cn(
                                'flex items-center gap-1',
                                getErrorRateColor(endpoint.errorRate)
                              )}
                            >
                              <AlertTriangle className="h-3 w-3" />
                              <span className="font-medium">
                                {formatPercent(endpoint.errorRate)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Erros Recentes */}
          <Card className="border-border/40">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Erros Recentes
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Últimos erros reportados pela API
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setShowDetails(showDetails === 'errors' ? null : 'errors')
                  }
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {analytics.recentErrors.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 px-4"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-green-700 mb-1">
                    🎉 Excelente! Nenhum erro recente
                  </p>
                  <p className="text-xs text-muted-foreground">
                    A API está funcionando perfeitamente
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {analytics.recentErrors
                    .slice(
                      0,
                      showDetails === 'errors'
                        ? analytics.recentErrors.length
                        : 6
                    )
                    .map((error, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-3 rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-sm font-medium text-red-700">
                            {error.endpoint}
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            {error.count}x
                          </Badge>
                        </div>
                        <p className="text-xs text-red-600 mb-2 font-medium">
                          {error.error}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(error.timestamp).toLocaleString()}
                        </p>
                      </motion.div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Atividade por Horário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-border/40">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-green-600" />
                    Atividade por Horário
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Distribuição de requests ao longo do dia (
                    {selectedPeriod === '1d'
                      ? 'últimas 24h'
                      : selectedPeriod === '7d'
                        ? 'últimos 7 dias'
                        : 'últimos 30 dias'}
                    )
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Activity className="h-3 w-3 mr-1" />
                    {analytics.overview.totalRequests} total
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Legenda */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Menos ativo</span>
                  <span>Mais ativo</span>
                </div>

                {/* Gráfico de barras */}
                <div className="grid grid-cols-12 gap-1 text-xs">
                  {Array.from({ length: 24 }, (_, hour) => {
                    const hourStr = hour.toString().padStart(2, '0')
                    const count = analytics.timeStats.hour[hourStr] || 0
                    const maxCount = Math.max(
                      ...Object.values(analytics.timeStats.hour)
                    )
                    const height = maxCount > 0 ? (count / maxCount) * 100 : 0

                    // Determinar cor baseada na intensidade
                    const intensity = maxCount > 0 ? count / maxCount : 0
                    const barColor =
                      intensity > 0.8
                        ? 'bg-orange-500'
                        : intensity > 0.6
                          ? 'bg-orange-400'
                          : intensity > 0.4
                            ? 'bg-orange-300'
                            : intensity > 0.2
                              ? 'bg-orange-200'
                              : 'bg-gray-200'

                    return (
                      <motion.div
                        key={hour}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: hour * 0.02 }}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="relative w-full h-24 flex items-end">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max(height, 2)}%` }}
                            transition={{
                              delay: hour * 0.02 + 0.2,
                              duration: 0.5,
                            }}
                            className={cn(
                              'w-full rounded-t-sm transition-all duration-200 group-hover:opacity-80',
                              barColor
                            )}
                            title={`${hourStr}:00 - ${formatNumber(count)} requests`}
                          />
                        </div>
                        <span
                          className={cn(
                            'text-xs text-muted-foreground mt-2 transition-colors',
                            'group-hover:text-orange-600 group-hover:font-medium'
                          )}
                        >
                          {hour % 2 === 0 ? hourStr : ''}
                        </span>

                        {/* Tooltip on hover */}
                        <div className="invisible group-hover:visible absolute z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 mt-8 whitespace-nowrap">
                          {hourStr}:00 - {formatNumber(count)} requests
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Estatísticas resumidas */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {Math.max(...Object.values(analytics.timeStats.hour))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Pico máximo
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {Math.round(
                        Object.values(analytics.timeStats.hour).reduce(
                          (a, b) => a + b,
                          0
                        ) / 24
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Média/hora
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {
                        Object.values(analytics.timeStats.hour).filter(
                          (count) => count > 0
                        ).length
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Horas ativas
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
