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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  Calendar,
  Search,
  FileText,
  Download,
  FileSpreadsheet,
} from 'lucide-react'
import { toast } from 'sonner'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { cn } from '@/lib/utils'

interface Receivable {
  id: string
  amount: number
  status: string
  method: string
  dueDate: string
  paidAt: string | null
  rental?: {
    id: string
    users: {
      name: string | null
      email: string
    }
  }
  quote?: {
    id: string
    user: {
      name: string | null
      email: string
    }
  }
}

interface FinancialMetrics {
  totalReceivables: number
  overdueAmount: number
  monthlyRevenue: number
  yearlyRevenue: number
  paymentsByStatus: Array<{
    status: string
    _sum: { amount: number | null }
    _count: { id: number }
  }>
  paymentsByMethod: Array<{
    method: string
    _sum: { amount: number | null }
    _count: { id: number }
  }>
}

export default function AdminFinancialPage() {
  const [receivables, setReceivables] = useState<Receivable[]>([])
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [reportLoading, setReportLoading] = useState(false)

  const fetchFinancialData = useCallback(async () => {
    try {
      setLoading(true)
      // Sempre buscar todos os dados - filtros serão aplicados localmente
      const response = await fetch(`/api/admin/financial`)
      if (!response.ok) throw new Error('Erro ao carregar dados financeiros')

      const data = await response.json()
      setReceivables(data.receivables || [])
      setMetrics(data.metrics || null)
    } catch (error) {
      console.error('Error fetching financial data:', error)
      toast.error('Erro', {
        description: 'Erro ao carregar dados financeiros. Tente novamente.',
      })
      setReceivables([])
      setMetrics(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFinancialData()
  }, [fetchFinancialData])

  const formatCurrency = (value: number) => {
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
      })
    } catch {
      return 'Data inválida'
    }
  }

  const handleExportReport = async (format: 'pdf' | 'excel') => {
    try {
      setReportLoading(true)
      const params = new URLSearchParams({
        format,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(dateFilter !== 'all' && { dateFilter }),
      })

      const response = await fetch(`/api/admin/financial/reports?${params}`)
      if (!response.ok) throw new Error('Erro ao gerar relatório')

      const data = await response.json()

      if (format === 'pdf') {
        // Para PDF, criar um HTML e converter (simplificado)
        // Em produção, usar biblioteca como jsPDF ou puppeteer
        const htmlContent = generateReportHTML(data)
        const blob = new Blob([htmlContent], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `relatorio-financeiro-${new Date().toISOString().split('T')[0]}.html`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('Relatório HTML gerado (converta para PDF manualmente)')
      } else {
        // Para Excel, criar CSV (simplificado)
        // Em produção, usar biblioteca como xlsx
        const csvContent = generateReportCSV(data)
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `relatorio-financeiro-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('Relatório CSV gerado')
      }
    } catch (error) {
      console.error('Error exporting report:', error)
      toast.error('Erro ao gerar relatório')
    } finally {
      setReportLoading(false)
    }
  }

  const generateReportHTML = (data: unknown) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Relatório Financeiro</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #ea580c; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f5f5f5; }
        </style>
      </head>
      <body>
        <h1>Relatório Financeiro</h1>
        <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body>
      </html>
    `
  }

  const generateReportCSV = (data: unknown) => {
    // Converter dados para CSV (simplificado)
    if (typeof data === 'object' && data !== null && 'byPeriod' in data) {
      const byPeriod = (
        data as {
          byPeriod: Array<{
            amount: number
            method: string
            paidAt: string
            client: string
          }>
        }
      ).byPeriod
      const headers = ['Data', 'Cliente', 'Valor', 'Método']
      const rows = byPeriod.map((item) => [
        item.paidAt,
        item.client,
        item.amount.toString(),
        item.method,
      ])
      return [headers, ...rows].map((row) => row.join(',')).join('\n')
    }
    return 'Dados não disponíveis'
  }

  const filteredReceivables = receivables.filter((receivable) => {
    // Filtro de busca
    const matchesSearch =
      receivable.rental?.users.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      receivable.rental?.users.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      receivable.quote?.user.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      receivable.quote?.user.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      receivable.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de status
    const matchesStatus =
      statusFilter === 'all' || receivable.status === statusFilter

    // Filtro de data
    let matchesDate = true
    if (dateFilter !== 'all') {
      const dueDate = new Date(receivable.dueDate)
      const now = new Date()
      if (dateFilter === 'month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        matchesDate = dueDate >= monthStart
      } else if (dateFilter === 'year') {
        const yearStart = new Date(now.getFullYear(), 0, 1)
        matchesDate = dueDate >= yearStart
      }
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const chartColors = {
    orange: '#ea580c',
    green: '#22c55e',
    red: '#ef4444',
    blue: '#3b82f6',
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
          title="Dashboard Financeiro"
          subtitle="Contas a receber e métricas financeiras"
          icon={<DollarSign className="w-8 h-8" />}
          infoBadge={{
            icon: <DollarSign className="w-5 h-5 text-orange-50" />,
            text: `${receivables.length} contas a receber`,
          }}
          className="mb-8"
        />

        {/* Métricas Principais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdminCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total a Receber</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(metrics?.totalReceivables || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Em Atraso</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(metrics?.overdueAmount || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Receita Mensal</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(metrics?.monthlyRevenue || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Receita Anual</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(metrics?.yearlyRevenue || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </AdminCard>
          </div>
        </motion.div>

        {/* Gráficos */}
        {metrics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pagamentos por Status */}
              {metrics.paymentsByStatus &&
                metrics.paymentsByStatus.length > 0 && (
                  <AdminCard title="Pagamentos por Status">
                    <ChartContainer
                      config={metrics.paymentsByStatus.reduce(
                        (acc, item) => ({
                          ...acc,
                          [item.status]: {
                            label: item.status,
                            color:
                              item.status === 'PAID'
                                ? chartColors.green
                                : chartColors.orange,
                          },
                        }),
                        {}
                      )}
                      className="h-[300px]"
                    >
                      <BarChart data={metrics.paymentsByStatus}>
                        <XAxis dataKey="status" />
                        <YAxis />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={(value) =>
                                formatCurrency(Number(value))
                              }
                            />
                          }
                        />
                        <Bar
                          dataKey="_sum.amount"
                          radius={[8, 8, 0, 0]}
                          fill={chartColors.orange}
                        />
                      </BarChart>
                    </ChartContainer>
                  </AdminCard>
                )}

              {/* Pagamentos por Método */}
              {metrics.paymentsByMethod &&
                metrics.paymentsByMethod.length > 0 && (
                  <AdminCard title="Pagamentos por Método">
                    <ChartContainer
                      config={metrics.paymentsByMethod.reduce(
                        (acc, item) => ({
                          ...acc,
                          [item.method]: {
                            label: item.method,
                            color: chartColors.blue,
                          },
                        }),
                        {}
                      )}
                      className="h-[300px]"
                    >
                      <BarChart data={metrics.paymentsByMethod}>
                        <XAxis dataKey="method" />
                        <YAxis />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={(value) =>
                                formatCurrency(Number(value))
                              }
                            />
                          }
                        />
                        <Bar
                          dataKey="_sum.amount"
                          radius={[8, 8, 0, 0]}
                          fill={chartColors.blue}
                        />
                      </BarChart>
                    </ChartContainer>
                  </AdminCard>
                )}
            </div>
          </motion.div>
        )}

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
                          { value: 'PENDING', label: 'Pendente' },
                          { value: 'OVERDUE', label: 'Atrasado' },
                          { value: 'PAID', label: 'Pago' },
                        ],
                      },
                      {
                        label: 'Período',
                        value: dateFilter,
                        onValueChange: setDateFilter,
                        placeholder: 'Filtrar por período',
                        options: [
                          { value: 'all', label: 'Todos' },
                          { value: 'month', label: 'Este mês' },
                          { value: 'year', label: 'Este ano' },
                        ],
                      },
                    ]}
                    gap="sm"
                  />
                  <FilterResetButton
                    onClick={() => {
                      setStatusFilter('all')
                      setDateFilter('all')
                      setSearchTerm('')
                    }}
                    title="Resetar filtros"
                    size="md"
                  />
                </div>

                {/* Botões de Exportação */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleExportReport('pdf')}
                    disabled={reportLoading}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exportar PDF
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleExportReport('excel')}
                    disabled={reportLoading}
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Exportar Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lista de Contas a Receber */}
        {filteredReceivables.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <AdminCard title="Contas a Receber">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Cliente
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Valor
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Método
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Vencimento
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReceivables.map((receivable) => (
                      <tr
                        key={receivable.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {receivable.rental?.users.name ||
                                receivable.quote?.user.name ||
                                'N/A'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {receivable.rental?.users.email ||
                                receivable.quote?.user.email}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-lg text-green-600">
                            {formatCurrency(receivable.amount)}
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{receivable.method}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={cn(
                              receivable.status === 'PAID' &&
                                'bg-green-100 text-green-800',
                              receivable.status === 'OVERDUE' &&
                                'bg-red-100 text-red-800',
                              receivable.status === 'PENDING' &&
                                'bg-yellow-100 text-yellow-800'
                            )}
                          >
                            {receivable.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {formatDate(receivable.dueDate)}
                          </div>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            Detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AdminCard>
          </motion.div>
        )}

        {/* Mensagem quando não há contas */}
        {!loading && filteredReceivables.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Nenhuma conta a receber encontrada
                </h3>
                <p className="text-sm text-gray-500">
                  Não há contas a receber com os filtros selecionados
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
