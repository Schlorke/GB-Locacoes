'use client'

import { AdminFilterCard } from '@/components/admin/admin-filter-card'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { KanbanPipeline } from '@/components/admin/kanban-pipeline'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Dialog } from '@/components/ui/dialog'
import { ViewToggle } from '@/components/ui/view-toggle'
import { toast } from 'sonner'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Hash,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Truck,
  User,
  XCircle,
  LayoutGrid,
  Table,
  Trash2,
  DollarSign,
  AlertTriangle,
  Edit,
  Download,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'

interface Quote {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  equipments: Array<{
    id: string
    name: string
    quantity: number
    dailyPrice: number
  }>
  startDate: string
  endDate: string
  totalPrice: number
  status: 'pending' | 'approved' | 'rejected'
  message?: string
  deliveryType?: 'DELIVERY' | 'PICKUP' | null
  deliveryAddress?: {
    street?: string
    number?: string
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    zipCode?: string
  } | null
  deliveryFee?: number | null
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  createdAt: string
  updatedAt: string
  originalTotal?: number
  finalTotal?: number | null
  priceAdjustmentReason?: string | null
  priceAdjustedAt?: string | null
  priceAdjustedBy?: string | null
  lateFee?: number | null
  lateFeeApproved?: boolean
  lateFeeApprovedAt?: string | null
  lateFeeApprovedBy?: string | null
  validUntil?: string | null
  items?: Array<{
    id: string
    quantity: number
    days: number
    startDate?: string | null
    endDate?: string | null
    includeWeekends?: boolean
    appliedDiscount?: number | null
    appliedPeriod?: string | null
    useDirectValue?: boolean
    directValue?: number | null
    pricePerDay?: number
    total?: number
    equipment?: {
      id: string
      name: string
    }
  }>
  [key: string]: unknown // Index signature para compatibilidade com KanbanItem
}

const statusConfig: Record<
  string,
  {
    key: string
    label: string
    color: string
    icon: typeof Clock
    gradient: string
  }
> = {
  pending: {
    key: 'pending',
    label: 'Pendente',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    gradient: 'from-yellow-400 to-orange-500',
  },
  approved: {
    key: 'approved',
    label: 'Aprovado',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    gradient: 'from-green-400 to-emerald-500',
  },
  rejected: {
    key: 'rejected',
    label: 'Rejeitado',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
    gradient: 'from-red-400 to-rose-500',
  },
}

function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [periodFilter, setPeriodFilter] = useState<string>('all')
  const [valueFilter, setValueFilter] = useState<string>('all')
  const [isUpdating, setIsUpdating] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('kanban')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showPriceAdjustmentDialog, setShowPriceAdjustmentDialog] =
    useState(false)
  const [showLateFeeDialog, setShowLateFeeDialog] = useState(false)
  const [nestedDialogOpen, setNestedDialogOpen] = useState(false)
  const [priceAdjustmentValue, setPriceAdjustmentValue] = useState('')
  const [priceAdjustmentReason, setPriceAdjustmentReason] = useState('')
  const [isAdjustingPrice, setIsAdjustingPrice] = useState(false)
  const [isCalculatingLateFee, setIsCalculatingLateFee] = useState(false)
  const [calculatedLateFee, setCalculatedLateFee] = useState<{
    lateFee: number
    daysLate: number
  } | null>(null)

  // Controle de animação determinística para tabela (evita flick/flash e garante
  // entrada/saída escalonadas ao aplicar filtros).
  const [tableQuotes, setTableQuotes] = useState<Quote[]>([])
  const pendingTableQuotesRef = useRef<Quote[] | null>(null)
  const didInitTableQuotesRef = useRef(false)

  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/quotes')
      const data = await response.json()

      // Verificação defensiva para garantir que data é um array
      const quotesArray = Array.isArray(data) ? data : data?.quotes || []

      setQuotes(quotesArray)
    } catch (error) {
      console.error('Error fetching quotes:', error)
      toast.error('Erro', {
        description: 'Erro ao carregar orçamentos. Tente novamente.',
      })
      setQuotes([])
    } finally {
      setLoading(false)
    }
  }, [])

  const filterQuotes = useCallback(() => {
    if (!Array.isArray(quotes)) {
      setFilteredQuotes([])
      return
    }

    const filtered = quotes.filter((quote) => {
      const matchesSearch =
        quote.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.phone?.includes(searchTerm)

      const matchesStatus =
        statusFilter === 'all' || quote.status === statusFilter

      // Filtro por período
      let matchesPeriod = true
      if (periodFilter !== 'all') {
        const now = new Date()
        // Usar startDate se disponível, senão usar createdAt
        const referenceDate = quote.startDate
          ? new Date(quote.startDate)
          : new Date(quote.createdAt)

        switch (periodFilter) {
          case 'today': {
            matchesPeriod = referenceDate.toDateString() === now.toDateString()
            break
          }
          case 'week': {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            matchesPeriod = referenceDate >= weekAgo
            break
          }
          case 'month': {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            matchesPeriod = referenceDate >= monthAgo
            break
          }
        }
      }

      // Filtro por valor
      let matchesValue = true
      if (valueFilter !== 'all') {
        const totalPrice = quote.totalPrice || 0
        switch (valueFilter) {
          case 'low':
            matchesValue = totalPrice < 500
            break
          case 'medium':
            matchesValue = totalPrice >= 500 && totalPrice < 2000
            break
          case 'high':
            matchesValue = totalPrice >= 2000
            break
        }
      }

      return matchesSearch && matchesStatus && matchesPeriod && matchesValue
    })

    setFilteredQuotes(filtered)
  }, [quotes, searchTerm, statusFilter, periodFilter, valueFilter])

  useEffect(() => {
    fetchQuotes()
  }, [fetchQuotes])

  useEffect(() => {
    filterQuotes()
  }, [
    quotes,
    searchTerm,
    statusFilter,
    periodFilter,
    valueFilter,
    filterQuotes,
  ])

  // Quando os filtros mudam, a lista filtrada muda imediatamente; porém, para a
  // UX desejada (linhas saindo uma a uma e entrando uma a uma), precisamos:
  // 1) disparar exit das linhas atuais
  // 2) esperar `onExitComplete`
  // 3) montar a nova lista (enter com stagger)
  useEffect(() => {
    if (!didInitTableQuotesRef.current) {
      setTableQuotes(Array.isArray(filteredQuotes) ? filteredQuotes : [])
      didInitTableQuotesRef.current = true
      return
    }

    const next = Array.isArray(filteredQuotes) ? filteredQuotes : []
    const prev = tableQuotes

    // Se não havia nada renderizado, apenas renderiza o novo conjunto.
    if (prev.length === 0) {
      setTableQuotes(next)
      return
    }

    pendingTableQuotesRef.current = next
    // Esvaziar dispara exit animations no AnimatePresence.
    setTableQuotes([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredQuotes])

  useEffect(() => {
    setNestedDialogOpen(
      showDeleteDialog || showPriceAdjustmentDialog || showLateFeeDialog
    )
  }, [showDeleteDialog, showPriceAdjustmentDialog, showLateFeeDialog])

  useEffect(() => {
    if (!selectedQuote) {
      setShowDeleteDialog(false)
      setShowPriceAdjustmentDialog(false)
      setShowLateFeeDialog(false)
      setCalculatedLateFee(null)
      setPriceAdjustmentValue('')
      setPriceAdjustmentReason('')
    }
  }, [selectedQuote])

  const updateQuoteStatus = async (
    quoteId: string,
    newStatus: 'approved' | 'rejected'
  ) => {
    try {
      setIsUpdating(true)
      // Converter para maiúsculas conforme esperado pela API (enum QuoteStatus)
      const statusUpperCase = newStatus.toUpperCase() as 'APPROVED' | 'REJECTED'
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: statusUpperCase }),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar status')
      }

      await fetchQuotes()
      setSelectedQuote(null)

      toast.success('Sucesso!', {
        description: `Orçamento ${newStatus === 'approved' ? 'aprovado' : 'rejeitado'} com sucesso!`,
      })
    } catch (error) {
      console.error('Error updating quote:', error)
      toast.error('Erro', {
        description: 'Erro ao atualizar status do orçamento.',
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const deleteQuote = async (quoteId: string) => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir orçamento')
      }

      await fetchQuotes()
      setSelectedQuote(null)
      setShowDeleteDialog(false)

      toast.success('Sucesso!', {
        description: 'Orçamento excluído permanentemente.',
      })
    } catch (error) {
      console.error('Error deleting quote:', error)
      toast.error('Erro', {
        description: 'Erro ao excluir orçamento. Tente novamente.',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const adjustQuotePrice = async (quoteId: string) => {
    if (!priceAdjustmentReason.trim()) {
      toast.error('Erro de Validação', {
        description: 'Justificativa é obrigatória ao editar o valor final.',
      })
      return
    }

    const finalValue = Number.parseFloat(priceAdjustmentValue)
    if (isNaN(finalValue) || finalValue < 0) {
      toast.error('Erro de Validação', {
        description:
          'Valor final deve ser um número válido maior ou igual a zero.',
      })
      return
    }

    try {
      setIsAdjustingPrice(true)
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          finalTotal: finalValue,
          priceAdjustmentReason: priceAdjustmentReason.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao ajustar valor')
      }

      await fetchQuotes()
      // Atualizar quote selecionado
      const updatedQuote = await response.json()
      setSelectedQuote(updatedQuote as Quote)
      setShowPriceAdjustmentDialog(false)
      setPriceAdjustmentValue('')
      setPriceAdjustmentReason('')

      toast.success('Sucesso!', {
        description: 'Valor final ajustado com sucesso!',
      })
    } catch (error) {
      console.error('Error adjusting quote price:', error)
      toast.error('Erro', {
        description:
          error instanceof Error
            ? error.message
            : 'Erro ao ajustar valor final. Tente novamente.',
      })
    } finally {
      setIsAdjustingPrice(false)
    }
  }

  const calculateLateFee = async (quoteId: string) => {
    try {
      setIsCalculatingLateFee(true)
      const response = await fetch(
        `/api/admin/quotes/${quoteId}/calculate-late-fee`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao calcular multa')
      }

      const data = await response.json()
      setCalculatedLateFee({
        lateFee: data.lateFee,
        daysLate: data.daysLate,
      })
      setShowLateFeeDialog(true)
    } catch (error) {
      console.error('Error calculating late fee:', error)
      toast.error('Erro', {
        description: 'Erro ao calcular multa por atraso. Tente novamente.',
      })
    } finally {
      setIsCalculatingLateFee(false)
    }
  }

  const approveLateFee = async (quoteId: string) => {
    if (!calculatedLateFee) return

    try {
      setIsUpdating(true)
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lateFee: calculatedLateFee.lateFee,
          lateFeeApproved: true,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao aprovar multa')
      }

      await fetchQuotes()
      const updatedQuote = await response.json()
      setSelectedQuote(updatedQuote as Quote)
      setShowLateFeeDialog(false)
      setCalculatedLateFee(null)

      toast.success('Sucesso!', {
        description: 'Multa por atraso aprovada e aplicada ao orçamento!',
      })
    } catch (error) {
      console.error('Error approving late fee:', error)
      toast.error('Erro', {
        description: 'Erro ao aprovar multa. Tente novamente.',
      })
    } finally {
      setIsUpdating(false)
    }
  }

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
      return date.toLocaleDateString('pt-BR')
    } catch {
      return 'Data inválida'
    }
  }

  const getStatusBadge = (status: Quote['status']) => {
    const fallback = {
      label: status || 'Desconhecido',
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      icon: Clock,
      gradient: 'from-gray-300 to-gray-400',
    }
    const config = statusConfig[status] ?? fallback
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
        {/* Header */}
        <AdminPageHeader
          title="Gerenciar Orçamentos"
          subtitle="Visualize, analise e gerencie todos os orçamentos solicitados"
          icon={<FileText className="w-8 h-8" />}
          infoBadge={{
            icon: <FileText className="w-5 h-5 text-orange-50" />,
            text: `${Array.isArray(filteredQuotes) ? filteredQuotes.length : 0} orçamentos encontrados`,
          }}
          className="mb-8"
        />

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <AdminFilterCard
            searchPlaceholder="Buscar por nome, email, empresa..."
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
                  { value: 'pending', label: 'Pendentes' },
                  { value: 'approved', label: 'Aprovados' },
                  { value: 'rejected', label: 'Rejeitados' },
                ],
              },
              {
                label: 'Período',
                value: periodFilter,
                onValueChange: setPeriodFilter,
                placeholder: 'Filtrar por período',
                options: [
                  { value: 'all', label: 'Todos os períodos' },
                  { value: 'today', label: 'Hoje' },
                  { value: 'week', label: 'Última semana' },
                  { value: 'month', label: 'Último mês' },
                ],
              },
              {
                label: 'Valor',
                value: valueFilter,
                onValueChange: setValueFilter,
                placeholder: 'Filtrar por valor',
                options: [
                  { value: 'all', label: 'Todos os valores' },
                  { value: 'low', label: 'Até R$ 500' },
                  { value: 'medium', label: 'R$ 500 - R$ 2.000' },
                  { value: 'high', label: 'Acima de R$ 2.000' },
                ],
              },
            ]}
            viewToggleButtons={
              <ViewToggle
                options={[
                  { value: 'kanban', label: 'Kanban', icon: LayoutGrid },
                  { value: 'table', label: 'Tabela', icon: Table },
                ]}
                value={viewMode}
                onValueChange={(value) =>
                  setViewMode(value as 'kanban' | 'table')
                }
              />
            }
          />
        </motion.div>

        {/* Pipeline Kanban */}
        {viewMode === 'kanban' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <KanbanPipeline<Quote>
              items={filteredQuotes}
              statusConfig={statusConfig}
              onItemClick={(quote) => setSelectedQuote(quote as Quote)}
              columnsPerRow={{
                mobile: 1,
                tablet: 3,
                desktop: 3,
                xl: 3,
              }}
              renderItem={(quote) => {
                const quoteTyped = quote as Quote
                return (
                  <div
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer transition-all shadow-sm hover:shadow-md"
                    onClick={() => setSelectedQuote(quoteTyped)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">
                            {quoteTyped.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {quoteTyped.email}
                          </p>
                          {quoteTyped.company && (
                            <p className="text-xs text-gray-400 mt-1">
                              {quoteTyped.company}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Package className="w-3 h-3" />
                        <span>
                          {Array.isArray(quoteTyped.equipments)
                            ? quoteTyped.equipments.length
                            : quoteTyped.items?.length || 0}{' '}
                          equipamento(s)
                        </span>
                      </div>
                      {quoteTyped.totalPrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-orange-600">
                            {formatCurrency(quoteTyped.totalPrice)}
                          </span>
                          {quoteTyped.startDate && (
                            <span className="text-xs text-gray-500">
                              {formatDate(quoteTyped.startDate)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              }}
            />
          </motion.div>
        )}

        {/* Tabela de Orçamentos */}
        {viewMode === 'table' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              {/* Clean depth layers for table card */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardContent className="relative z-10 p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Cliente
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Equipamentos
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Período
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          Valor Total
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
                      <AnimatePresence
                        mode="wait"
                        onExitComplete={() => {
                          const pending = pendingTableQuotesRef.current
                          if (pending) {
                            pendingTableQuotesRef.current = null
                            setTableQuotes(pending)
                          }
                        }}
                      >
                        {Array.isArray(tableQuotes) &&
                          tableQuotes.map((quote, index) => (
                            <motion.tr
                              key={quote.id}
                              custom={{ index }}
                              variants={{
                                hidden: ({
                                  index: idx,
                                }: {
                                  index: number
                                }) => ({
                                  opacity: 0,
                                  // Entrada garantida da esquerda para a direita.
                                  x: -32,
                                  transition: {
                                    duration: 0.22,
                                    ease: 'easeOut',
                                    delay: idx * 0.05,
                                  },
                                }),
                                show: ({ index: idx }: { index: number }) => ({
                                  opacity: 1,
                                  x: 0,
                                  transition: {
                                    duration: 0.24,
                                    ease: 'easeOut',
                                    delay: idx * 0.055,
                                  },
                                }),
                                exit: ({ index: idx }: { index: number }) => ({
                                  opacity: 0,
                                  // Saida leve para a direita para evitar percepcao invertida.
                                  x: 18,
                                  transition: {
                                    duration: 0.18,
                                    ease: 'easeIn',
                                    // Stagger normal na saída (primeiro sai primeiro, de cima para baixo)
                                    delay: idx * 0.04,
                                  },
                                }),
                              }}
                              initial="hidden"
                              animate="show"
                              exit="exit"
                              className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                                    {quote.name?.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {quote.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {quote.email}
                                    </div>
                                    {quote.company && (
                                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                        <Building className="w-3 h-3" />
                                        {quote.company}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Package className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm font-medium">
                                    {Array.isArray(quote.equipments)
                                      ? quote.equipments.length
                                      : 0}{' '}
                                    equipamentos
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="text-sm">
                                  {quote.startDate && quote.endDate ? (
                                    <>
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(quote.startDate)}
                                      </div>
                                      <div className="text-gray-500 ml-4">
                                        até {formatDate(quote.endDate)}
                                      </div>
                                    </>
                                  ) : quote.items &&
                                    quote.items.length > 0 &&
                                    quote.items[0]?.days ? (
                                    <div className="text-gray-500">
                                      {quote.items[0].days}{' '}
                                      {quote.items[0].days === 1
                                        ? 'dia'
                                        : 'dias'}
                                    </div>
                                  ) : (
                                    <div className="text-gray-400 italic">
                                      Período não definido
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="font-semibold text-lg text-green-600">
                                  {formatCurrency(quote.totalPrice || 0)}
                                </span>
                              </td>
                              <td className="p-4">
                                {getStatusBadge(quote.status)}
                              </td>
                              <td className="p-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedQuote(quote)}
                                  className="admin-action-button view-button opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver Detalhes
                                </Button>
                              </td>
                            </motion.tr>
                          ))}
                      </AnimatePresence>
                    </tbody>
                  </table>

                  {(!Array.isArray(tableQuotes) ||
                    tableQuotes.length === 0) && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <FileText className="w-12 h-12 mx-auto mb-3" />
                        <p className="text-lg font-medium">
                          Nenhum orçamento encontrado
                        </p>
                        <p className="text-sm">
                          Tente ajustar os filtros ou aguarde novos orçamentos
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Modal de Detalhes */}
        <Dialog.Root
          open={!!selectedQuote}
          onOpenChange={(open) => !open && setSelectedQuote(null)}
        >
          <Dialog.Backdrop />
          <Dialog.Portal>
            <Dialog.Popup
              variant="default"
              data-nested-parent={nestedDialogOpen ? '' : undefined}
              className="max-w-4xl"
            >
              <Dialog.Content className="relative">
                {nestedDialogOpen && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-black/45"
                  />
                )}
                <Dialog.Header>
                  <Dialog.HeaderIcon>
                    {selectedQuote?.name?.charAt(0).toUpperCase()}
                  </Dialog.HeaderIcon>
                  <Dialog.Title className="text-xl font-semibold text-gray-800">
                    Detalhes do Orçamento - {selectedQuote?.name}
                  </Dialog.Title>
                  <Dialog.CloseButton />
                </Dialog.Header>

                <Dialog.Body>
                  <Dialog.BodyViewport>
                    <Dialog.BodyContent>
                      {selectedQuote ? (
                        <div className="space-y-6">
                          {/* Informações do Cliente */}
                          <Card className="border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <User className="w-5 h-5 text-blue-600" />
                                Informações do Cliente
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Email
                                  </div>
                                  <div className="font-medium">
                                    {selectedQuote.email}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Telefone
                                  </div>
                                  <div className="font-medium">
                                    {selectedQuote.phone}
                                  </div>
                                </div>
                              </div>
                              {selectedQuote.company && (
                                <div className="flex items-center gap-3">
                                  <Building className="w-4 h-4 text-gray-400" />
                                  <div>
                                    <div className="text-sm text-gray-500">
                                      Empresa
                                    </div>
                                    <div className="font-medium">
                                      {selectedQuote.company}
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center gap-3">
                                <Hash className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="text-sm text-gray-500">
                                    ID do Orçamento
                                  </div>
                                  <div className="font-medium font-mono text-xs">
                                    {selectedQuote.id}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Período e Status */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="border-l-4 border-l-green-500">
                              <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <Calendar className="w-5 h-5 text-green-600" />
                                  Período da Locação
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  {selectedQuote.startDate &&
                                  selectedQuote.endDate ? (
                                    <>
                                      <div>
                                        <span className="text-sm text-gray-500">
                                          Início:
                                        </span>
                                        <span className="ml-2 font-medium">
                                          {formatDate(selectedQuote.startDate)}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-sm text-gray-500">
                                          Fim:
                                        </span>
                                        <span className="ml-2 font-medium">
                                          {formatDate(selectedQuote.endDate)}
                                        </span>
                                      </div>
                                    </>
                                  ) : selectedQuote.items &&
                                    selectedQuote.items.length > 0 &&
                                    selectedQuote.items[0]?.days ? (
                                    <div>
                                      <span className="text-sm text-gray-500">
                                        Período:
                                      </span>
                                      <span className="ml-2 font-medium">
                                        {selectedQuote.items[0].days}{' '}
                                        {selectedQuote.items[0].days === 1
                                          ? 'dia'
                                          : 'dias'}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="text-sm text-gray-400 italic">
                                      Período não definido
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-purple-500">
                              <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <Briefcase className="w-5 h-5 text-purple-600" />
                                  Status Atual
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center justify-between">
                                  {getStatusBadge(selectedQuote.status)}
                                  <div className="text-right">
                                    {selectedQuote.finalTotal &&
                                    selectedQuote.finalTotal !==
                                      (selectedQuote.originalTotal ||
                                        selectedQuote.totalPrice) ? (
                                      <>
                                        <div className="text-xs text-gray-500 line-through mb-1">
                                          {formatCurrency(
                                            selectedQuote.originalTotal ||
                                              selectedQuote.totalPrice ||
                                              0
                                          )}
                                        </div>
                                        <div className="text-2xl font-bold text-amber-600">
                                          {formatCurrency(
                                            selectedQuote.finalTotal
                                          )}
                                        </div>
                                        <div className="text-xs text-amber-600 font-medium">
                                          Valor Final Editado
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="text-2xl font-bold text-green-600">
                                          {formatCurrency(
                                            selectedQuote.totalPrice || 0
                                          )}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          Valor Total
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Tipo de Entrega/Retirada */}
                          {(selectedQuote.deliveryType ||
                            selectedQuote.deliveryAddress) && (
                            <Card className="border-l-4 border-l-indigo-500">
                              <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <Truck className="w-5 h-5 text-indigo-600" />
                                  Tipo de Entrega/Retirada
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                {selectedQuote.deliveryType && (
                                  <div className="flex items-center gap-3">
                                    <Badge
                                      variant="outline"
                                      className={
                                        selectedQuote.deliveryType ===
                                        'DELIVERY'
                                          ? 'border-green-200 text-green-700 bg-green-50'
                                          : 'border-blue-200 text-blue-700 bg-blue-50'
                                      }
                                    >
                                      {selectedQuote.deliveryType === 'DELIVERY'
                                        ? 'Entrega no Endereço'
                                        : 'Retirada na Loja'}
                                    </Badge>
                                    {selectedQuote.deliveryFee &&
                                      selectedQuote.deliveryFee > 0 && (
                                        <span className="text-sm text-gray-600">
                                          Taxa de entrega:{' '}
                                          {formatCurrency(
                                            selectedQuote.deliveryFee
                                          )}
                                        </span>
                                      )}
                                  </div>
                                )}

                                {selectedQuote.deliveryAddress &&
                                  selectedQuote.deliveryType === 'DELIVERY' && (
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                      <div className="flex items-start gap-2 mb-3">
                                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <div className="font-semibold text-gray-900">
                                          Endereço de Entrega
                                        </div>
                                      </div>
                                      <div className="space-y-2 text-sm text-gray-700">
                                        {selectedQuote.deliveryAddress
                                          .street && (
                                          <div>
                                            <span className="font-medium">
                                              Logradouro:
                                            </span>{' '}
                                            {
                                              selectedQuote.deliveryAddress
                                                .street
                                            }
                                            {selectedQuote.deliveryAddress
                                              .number &&
                                              `, ${selectedQuote.deliveryAddress.number}`}
                                            {selectedQuote.deliveryAddress
                                              .complement &&
                                              ` - ${selectedQuote.deliveryAddress.complement}`}
                                          </div>
                                        )}
                                        {selectedQuote.deliveryAddress
                                          .neighborhood && (
                                          <div>
                                            <span className="font-medium">
                                              Bairro:
                                            </span>{' '}
                                            {
                                              selectedQuote.deliveryAddress
                                                .neighborhood
                                            }
                                          </div>
                                        )}
                                        {(selectedQuote.deliveryAddress.city ||
                                          selectedQuote.deliveryAddress
                                            .state) && (
                                          <div>
                                            <span className="font-medium">
                                              Cidade/Estado:
                                            </span>{' '}
                                            {selectedQuote.deliveryAddress
                                              .city || ''}
                                            {selectedQuote.deliveryAddress
                                              .city &&
                                              selectedQuote.deliveryAddress
                                                .state &&
                                              ' / '}
                                            {selectedQuote.deliveryAddress
                                              .state || ''}
                                          </div>
                                        )}
                                        {selectedQuote.deliveryAddress
                                          .zipCode && (
                                          <div>
                                            <span className="font-medium">
                                              CEP:
                                            </span>{' '}
                                            {
                                              selectedQuote.deliveryAddress
                                                .zipCode
                                            }
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                {selectedQuote.deliveryType === 'PICKUP' && (
                                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-2 text-blue-700">
                                      <Package className="w-4 h-4" />
                                      <span className="text-sm font-medium">
                                        Cliente retirará os equipamentos na loja
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )}

                          {/* Equipamentos */}
                          <Card className="border-l-4 border-l-orange-500">
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <Package className="w-5 h-5 text-orange-600" />
                                Equipamentos Solicitados
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {Array.isArray(selectedQuote.items) &&
                                  selectedQuote.items.length > 0 &&
                                  selectedQuote.items.map((item, index) => {
                                    const equipment = item.equipment
                                    if (!equipment) return null

                                    // Calcular preço original (sem desconto)
                                    const originalPrice = item.pricePerDay
                                      ? item.pricePerDay *
                                        item.days *
                                        item.quantity
                                      : 0
                                    const finalPrice =
                                      item.total || originalPrice
                                    const hasDiscount =
                                      item.appliedDiscount &&
                                      item.appliedDiscount > 0 &&
                                      !item.useDirectValue
                                    // Normalizar período aplicado vindo do backend.
                                    // O campo `appliedPeriod` pode vir em inglês (daily/weekly/biweekly/monthly)
                                    // ou já traduzido (diaria/semanal/quinzenal/mensal), pois o sistema de preços
                                    // usa `buildQuotePricing` (emails) e o admin usa este modal.
                                    const normalizedPeriod = (
                                      item.appliedPeriod || ''
                                    )
                                      .toString()
                                      .toLowerCase()

                                    const periodLabel =
                                      normalizedPeriod === 'weekly' ||
                                      normalizedPeriod === 'semanal'
                                        ? 'Semanal'
                                        : normalizedPeriod === 'biweekly' ||
                                            normalizedPeriod === 'quinzenal'
                                          ? 'Quinzenal'
                                          : normalizedPeriod === 'monthly' ||
                                              normalizedPeriod === 'mensal'
                                            ? 'Mensal'
                                            : 'Diário'

                                    return (
                                      <div
                                        key={item.id || index}
                                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
                                      >
                                        {/* Nome e Quantidade */}
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <div className="font-semibold text-gray-900 mb-1">
                                              {equipment.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                              Quantidade: {item.quantity}x
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            {hasDiscount &&
                                              originalPrice > finalPrice && (
                                                <div className="text-sm text-gray-500 line-through mb-1">
                                                  {formatCurrency(
                                                    originalPrice
                                                  )}
                                                </div>
                                              )}
                                            <div className="font-semibold text-green-600 text-lg">
                                              {formatCurrency(finalPrice)}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Período e Desconto */}
                                        <div className="flex flex-wrap items-center gap-2 text-sm">
                                          <Badge
                                            variant="outline"
                                            className="text-xs border-orange-200 text-orange-700 bg-orange-50"
                                          >
                                            {periodLabel}
                                          </Badge>
                                          <span className="text-gray-600">
                                            {item.days}{' '}
                                            {item.days === 1 ? 'dia' : 'dias'}
                                          </span>
                                          {hasDiscount && (
                                            <Badge
                                              variant="outline"
                                              className="text-xs border-green-200 text-green-700 bg-green-50"
                                            >
                                              Desc. {periodLabel}: -
                                              {item.appliedDiscount}%
                                            </Badge>
                                          )}
                                          {item.useDirectValue &&
                                            item.directValue && (
                                              <Badge
                                                variant="outline"
                                                className="text-xs border-orange-200 text-orange-700 bg-orange-50"
                                              >
                                                Valor Fixo:{' '}
                                                {formatCurrency(
                                                  item.directValue
                                                )}
                                              </Badge>
                                            )}
                                        </div>

                                        {/* Período de Locação */}
                                        {item.startDate && item.endDate && (
                                          <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t border-gray-200">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-700">
                                              Período:
                                            </span>
                                            <span>
                                              {formatDate(item.startDate)} até{' '}
                                              {formatDate(item.endDate)}
                                            </span>
                                          </div>
                                        )}

                                        {/* Incluir finais de semana */}
                                        {item.includeWeekends && (
                                          <div className="flex items-center gap-2 text-sm text-green-600 pt-2 border-t border-gray-200">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="font-medium">
                                              Incluir finais de semana
                                            </span>
                                          </div>
                                        )}

                                        {/* Preço por dia */}
                                        {item.pricePerDay && (
                                          <div className="text-xs text-gray-500 pt-1">
                                            Preço por dia:{' '}
                                            {formatCurrency(item.pricePerDay)}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  })}
                                {/* Fallback para equipments antigo (compatibilidade) */}
                                {(!selectedQuote.items ||
                                  selectedQuote.items.length === 0) &&
                                  Array.isArray(selectedQuote.equipments) &&
                                  selectedQuote.equipments.map(
                                    (equipment, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                      >
                                        <div>
                                          <div className="font-medium">
                                            {equipment.name}
                                          </div>
                                          <div className="text-sm text-gray-500">
                                            Quantidade: {equipment.quantity} -{' '}
                                            {formatCurrency(
                                              equipment.dailyPrice
                                            )}
                                            /dia
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="font-semibold text-green-600">
                                            {formatCurrency(
                                              equipment.quantity *
                                                equipment.dailyPrice
                                            )}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            subtotal/dia
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                              </div>
                            </CardContent>
                          </Card>

                          {/* Valor Original vs Valor Final Editado */}
                          {(selectedQuote.originalTotal ||
                            selectedQuote.finalTotal ||
                            selectedQuote.priceAdjustmentReason) && (
                            <Card className="border-l-4 border-l-amber-500">
                              <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <Package className="w-5 h-5 text-amber-600" />
                                  Valores do Orçamento
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                {/* Valor Original */}
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                  <div className="text-sm font-semibold text-gray-700 mb-2">
                                    Valor Original
                                  </div>
                                  <div className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(
                                      selectedQuote.originalTotal ||
                                        selectedQuote.totalPrice ||
                                        0
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Valor calculado automaticamente com base nos
                                    equipamentos, períodos e descontos
                                  </div>
                                </div>

                                {/* Valor Final Editado */}
                                {selectedQuote.finalTotal &&
                                  selectedQuote.finalTotal !==
                                    (selectedQuote.originalTotal ||
                                      selectedQuote.totalPrice) && (
                                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                      <div className="text-sm font-semibold text-amber-700 mb-2">
                                        Valor Final Editado
                                      </div>
                                      <div className="text-2xl font-bold text-amber-900">
                                        {formatCurrency(
                                          selectedQuote.finalTotal
                                        )}
                                      </div>
                                      {selectedQuote.priceAdjustmentReason && (
                                        <div className="mt-3 p-3 bg-white rounded border border-amber-200">
                                          <div className="text-xs font-semibold text-amber-700 mb-1">
                                            Justificativa do Ajuste:
                                          </div>
                                          <div className="text-sm text-amber-900">
                                            {
                                              selectedQuote.priceAdjustmentReason
                                            }
                                          </div>
                                          {selectedQuote.priceAdjustedAt && (
                                            <div className="text-xs text-amber-600 mt-2">
                                              Ajustado em:{' '}
                                              {new Date(
                                                selectedQuote.priceAdjustedAt
                                              ).toLocaleString('pt-BR')}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                {/* Multa por Atraso */}
                                {selectedQuote.lateFee &&
                                  selectedQuote.lateFee > 0 && (
                                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="text-sm font-semibold text-red-700">
                                          Multa por Atraso Calculada
                                        </div>
                                        {selectedQuote.lateFeeApproved ? (
                                          <Badge className="bg-green-100 text-green-800 border-green-200">
                                            Aprovada
                                          </Badge>
                                        ) : (
                                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                            Pendente Aprovação
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="text-xl font-bold text-red-900">
                                        {formatCurrency(selectedQuote.lateFee)}
                                      </div>
                                      {selectedQuote.lateFeeApprovedAt && (
                                        <div className="text-xs text-red-600 mt-2">
                                          Aprovada em:{' '}
                                          {new Date(
                                            selectedQuote.lateFeeApprovedAt
                                          ).toLocaleString('pt-BR')}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                {/* Período de Validade */}
                                {selectedQuote.validUntil && (
                                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="text-xs font-semibold text-blue-700 mb-1">
                                      Válido até:
                                    </div>
                                    <div className="text-sm text-blue-900">
                                      {new Date(
                                        selectedQuote.validUntil
                                      ).toLocaleDateString('pt-BR')}
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )}

                          {/* Mensagem */}
                          {selectedQuote.message && (
                            <Card className="border-l-4 border-l-indigo-500">
                              <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                                  Mensagem do Cliente
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <Textarea
                                  value={selectedQuote.message}
                                  readOnly
                                  className="min-h-[100px] resize-none border-gray-200"
                                />
                              </CardContent>
                            </Card>
                          )}

                          {/* Dialogs aninhadas dentro do dialog pai */}
                          <Dialog.Root
                            open={showDeleteDialog}
                            onOpenChange={setShowDeleteDialog}
                          >
                            <Dialog.Portal>
                              <Dialog.Backdrop />
                              <Dialog.Popup
                                variant="default"
                                className="max-w-md h-auto max-h-[70vh] md:h-auto md:max-h-[70vh]"
                              >
                                <Dialog.Content>
                                  <Dialog.Header className="flex-col items-start gap-1 pb-3">
                                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                                      Excluir Orçamento Permanentemente?
                                    </Dialog.Title>
                                  </Dialog.Header>
                                  <Dialog.Body className="flex-none">
                                    <Dialog.BodyViewport className="max-h-[50vh] overflow-y-auto">
                                      <Dialog.BodyContent className="space-y-2 py-2">
                                        <p className="text-sm text-gray-600">
                                          Esta ação não pode ser desfeita. O
                                          orçamento de{' '}
                                          <strong>{selectedQuote.name}</strong>{' '}
                                          será removido com todos os itens e
                                          registros associados.
                                        </p>
                                      </Dialog.BodyContent>
                                    </Dialog.BodyViewport>
                                  </Dialog.Body>
                                  <Dialog.Footer className="flex flex-row gap-3">
                                    <Button
                                      variant="outline"
                                      onClick={() => setShowDeleteDialog(false)}
                                      disabled={isDeleting}
                                      className="flex-1"
                                    >
                                      Cancelar
                                    </Button>
                                    <Button
                                      variant="default"
                                      onClick={() =>
                                        selectedQuote &&
                                        deleteQuote(selectedQuote.id)
                                      }
                                      disabled={isDeleting}
                                      className="flex-1"
                                    >
                                      {isDeleting
                                        ? 'Excluindo...'
                                        : 'Confirmar'}
                                    </Button>
                                  </Dialog.Footer>
                                </Dialog.Content>
                              </Dialog.Popup>
                            </Dialog.Portal>
                          </Dialog.Root>

                          <Dialog.Root
                            open={showPriceAdjustmentDialog}
                            onOpenChange={setShowPriceAdjustmentDialog}
                          >
                            <Dialog.Portal>
                              <Dialog.Backdrop />
                              <Dialog.Popup
                                variant="default"
                                className="max-w-xl h-auto max-h-[75vh] md:h-auto md:max-h-[75vh]"
                              >
                                <Dialog.Content>
                                  <Dialog.Header className="flex-col items-start gap-2">
                                    <Dialog.Title className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                                      <DollarSign className="w-5 h-5" />
                                      Ajustar Valor Final do Orçamento
                                    </Dialog.Title>
                                    <Dialog.Description className="text-sm text-gray-600">
                                      Edite o valor final do orçamento. A
                                      justificativa é obrigatória e será exibida
                                      junto com o valor original e o valor final
                                      editado.
                                    </Dialog.Description>
                                  </Dialog.Header>
                                  <Dialog.Body className="flex-none">
                                    <Dialog.BodyViewport className="max-h-[55vh] overflow-y-auto">
                                      <Dialog.BodyContent className="space-y-4">
                                        <div>
                                          <Label htmlFor="original-value">
                                            Valor Original
                                          </Label>
                                          <Input
                                            id="original-value"
                                            value={formatCurrency(
                                              selectedQuote.originalTotal ||
                                                selectedQuote.totalPrice ||
                                                0
                                            )}
                                            readOnly
                                            className="mt-1 bg-gray-50"
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor="final-value">
                                            Valor Final Editado{' '}
                                            <span className="text-red-500">
                                              *
                                            </span>
                                          </Label>
                                          <Input
                                            id="final-value"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={priceAdjustmentValue}
                                            onChange={(e) =>
                                              setPriceAdjustmentValue(
                                                e.target.value
                                              )
                                            }
                                            placeholder="0.00"
                                            className="mt-1"
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor="adjustment-reason">
                                            Justificativa do Ajuste{' '}
                                            <span className="text-red-500">
                                              *
                                            </span>
                                          </Label>
                                          <Textarea
                                            id="adjustment-reason"
                                            value={priceAdjustmentReason}
                                            onChange={(e) =>
                                              setPriceAdjustmentReason(
                                                e.target.value
                                              )
                                            }
                                            placeholder="Ex: Taxa de quebra/avaria, ajuste por perdas de pe‡as, etc."
                                            rows={4}
                                            className="mt-1"
                                            required
                                          />
                                          <p className="text-xs text-gray-500 mt-1">
                                            Esta justificativa será exibida para
                                            o cliente junto com o valor original
                                            e o valor final editado.
                                          </p>
                                        </div>
                                      </Dialog.BodyContent>
                                    </Dialog.BodyViewport>
                                  </Dialog.Body>
                                  <Dialog.Footer className="flex-col-reverse sm:flex-row gap-3">
                                    <Button
                                      variant="outline"
                                      disabled={isAdjustingPrice}
                                      onClick={() => {
                                        setPriceAdjustmentValue('')
                                        setPriceAdjustmentReason('')
                                        setShowPriceAdjustmentDialog(false)
                                      }}
                                      className="w-full sm:w-auto"
                                    >
                                      Cancelar
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        selectedQuote &&
                                        adjustQuotePrice(selectedQuote.id)
                                      }
                                      disabled={
                                        isAdjustingPrice ||
                                        !priceAdjustmentValue ||
                                        !priceAdjustmentReason.trim()
                                      }
                                      className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white"
                                    >
                                      {isAdjustingPrice
                                        ? 'Ajustando...'
                                        : 'Ajustar Valor'}
                                    </Button>
                                  </Dialog.Footer>
                                </Dialog.Content>
                              </Dialog.Popup>
                            </Dialog.Portal>
                          </Dialog.Root>

                          <Dialog.Root
                            open={showLateFeeDialog}
                            onOpenChange={setShowLateFeeDialog}
                          >
                            <Dialog.Portal>
                              <Dialog.Backdrop />
                              <Dialog.Popup
                                variant="default"
                                className="max-w-md h-auto max-h-[70vh] md:h-auto md:max-h-[70vh]"
                              >
                                <Dialog.Content>
                                  <Dialog.Header className="flex-col items-start gap-2">
                                    <Dialog.Title className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                      Multa por Atraso
                                    </Dialog.Title>
                                    <Dialog.Description className="text-sm text-gray-600">
                                      {calculatedLateFee
                                        ? 'Multa calculada com base no atraso detectado.'
                                        : 'Calculando multa por atraso...'}
                                    </Dialog.Description>
                                  </Dialog.Header>
                                  {calculatedLateFee && (
                                    <Dialog.Body className="flex-none">
                                      <Dialog.BodyViewport className="max-h-[50vh] overflow-y-auto">
                                        <Dialog.BodyContent className="space-y-3">
                                          <p className="text-sm text-gray-700">
                                            Multa calculada automaticamente
                                            baseada no atraso de{' '}
                                            <strong>
                                              {calculatedLateFee.daysLate}{' '}
                                              dia(s)
                                            </strong>
                                            .
                                          </p>
                                          <p className="text-base font-semibold text-red-700">
                                            Valor calculado:{' '}
                                            <span className="text-red-600">
                                              {formatCurrency(
                                                calculatedLateFee.lateFee
                                              )}
                                            </span>
                                          </p>
                                          <p className="text-sm text-gray-600">
                                            Ao aprovar, a multa será adicionada
                                            ao valor final do orçamento e uma
                                            justificativa será criada
                                            automaticamente.
                                          </p>
                                        </Dialog.BodyContent>
                                      </Dialog.BodyViewport>
                                    </Dialog.Body>
                                  )}
                                  {calculatedLateFee && (
                                    <Dialog.Footer className="flex-col-reverse sm:flex-row gap-3">
                                      <Button
                                        variant="outline"
                                        disabled={isUpdating}
                                        onClick={() => {
                                          setCalculatedLateFee(null)
                                          setShowLateFeeDialog(false)
                                        }}
                                        className="w-full sm:w-auto"
                                      >
                                        Cancelar
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          selectedQuote &&
                                          approveLateFee(selectedQuote.id)
                                        }
                                        disabled={isUpdating}
                                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                                      >
                                        {isUpdating
                                          ? 'Aprovando...'
                                          : 'Aprovar e Aplicar Multa'}
                                      </Button>
                                    </Dialog.Footer>
                                  )}
                                </Dialog.Content>
                              </Dialog.Popup>
                            </Dialog.Portal>
                          </Dialog.Root>
                        </div>
                      ) : null}
                    </Dialog.BodyContent>
                  </Dialog.BodyViewport>
                </Dialog.Body>

                {/* Ações para orçamentos pendentes ou aprovados */}
                {(selectedQuote?.status === 'pending' ||
                  selectedQuote?.status === 'approved') &&
                  selectedQuote && (
                    <Dialog.Footer>
                      <div className="flex flex-col gap-3 w-full">
                        {/* Botões principais para status pendente */}
                        {selectedQuote.status === 'pending' && (
                          <div className="flex gap-3">
                            <Button
                              onClick={() =>
                                updateQuoteStatus(selectedQuote.id, 'approved')
                              }
                              disabled={isUpdating}
                              variant="default"
                              size="default"
                              className="flex-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              {isUpdating
                                ? 'Aprovando...'
                                : 'Aprovar Orçamento'}
                            </Button>
                            <Button
                              onClick={() =>
                                updateQuoteStatus(selectedQuote.id, 'rejected')
                              }
                              disabled={isUpdating}
                              variant="outline"
                              size="default"
                              className="flex-1 bg-white"
                            >
                              <XCircle className="w-4 h-4" />
                              {isUpdating
                                ? 'Rejeitando...'
                                : 'Rejeitar Orçamento'}
                            </Button>
                          </div>
                        )}

                        {/* Botões de ações administrativas */}
                        <div className="flex gap-3 border-t pt-3">
                          <Button
                            onClick={() => {
                              const originalValue =
                                selectedQuote.originalTotal ||
                                selectedQuote.totalPrice ||
                                0
                              setPriceAdjustmentValue(
                                selectedQuote.finalTotal
                                  ? selectedQuote.finalTotal.toString()
                                  : originalValue.toString()
                              )
                              setPriceAdjustmentReason(
                                selectedQuote.priceAdjustmentReason || ''
                              )
                              setShowPriceAdjustmentDialog(true)
                            }}
                            disabled={isAdjustingPrice}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Ajustar Valor Final
                          </Button>
                          {selectedQuote.endDate &&
                            new Date(selectedQuote.endDate) < new Date() && (
                              <Button
                                onClick={() =>
                                  calculateLateFee(selectedQuote.id)
                                }
                                disabled={isCalculatingLateFee}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                {isCalculatingLateFee
                                  ? 'Calculando...'
                                  : 'Calcular Multa'}
                              </Button>
                            )}
                          <Button
                            onClick={async () => {
                              if (!selectedQuote) return
                              try {
                                const response = await fetch(
                                  `/api/admin/quotes/${selectedQuote.id}/download`
                                )
                                if (response.ok) {
                                  const blob = await response.blob()
                                  const url = window.URL.createObjectURL(blob)
                                  const a = document.createElement('a')
                                  a.href = url
                                  a.download = `orcamento-${selectedQuote.id}.pdf`
                                  document.body.appendChild(a)
                                  a.click()
                                  window.URL.revokeObjectURL(url)
                                  document.body.removeChild(a)
                                  toast.success('Download iniciado!', {
                                    description:
                                      'PDF do orçamento sendo baixado.',
                                  })
                                } else {
                                  const data = await response.json()
                                  toast.info('Em breve', {
                                    description:
                                      data.message ||
                                      'Download de PDF será implementado em breve.',
                                  })
                                }
                              } catch (error) {
                                console.error('Error downloading PDF:', error)
                                toast.error('Erro', {
                                  description:
                                    'Erro ao baixar PDF do orçamento.',
                                })
                              }
                            }}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Baixar PDF
                          </Button>
                        </div>
                      </div>
                    </Dialog.Footer>
                  )}

                {selectedQuote?.status === 'rejected' && selectedQuote && (
                  <Dialog.Footer>
                    <div className="flex gap-3 w-full">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedQuote(null)}
                        disabled={isDeleting}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={() => setShowDeleteDialog(true)}
                        disabled={isDeleting}
                        variant="destructive"
                        size="default"
                        className="flex-1 hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir Permanentemente
                      </Button>
                    </div>
                  </Dialog.Footer>
                )}
              </Dialog.Content>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}

export default function AdminQuotesPageWrapper() {
  return (
    <Suspense fallback={null}>
      <AdminQuotesPage />
    </Suspense>
  )
}
