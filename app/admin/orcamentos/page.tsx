'use client'

import { AdminFilterCard } from '@/components/admin/admin-filter-card'
import { KanbanPipeline } from '@/components/admin/kanban-pipeline'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Dialog } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
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
  MessageSquare,
  Package,
  Phone,
  User,
  XCircle,
  LayoutGrid,
  Table,
} from 'lucide-react'
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
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  createdAt: string
  updatedAt: string
  items?: Array<{
    id: string
    quantity: number
    days: number
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

  const updateQuoteStatus = async (
    quoteId: string,
    newStatus: 'approved' | 'rejected'
  ) => {
    try {
      setIsUpdating(true)
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            {/* Clean depth layers without decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                Gerenciar Orçamentos
              </h1>
              <p className="text-orange-50 mb-4 font-medium">
                Visualize, analise e gerencie todos os orçamentos solicitados
              </p>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <FileText className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  {Array.isArray(filteredQuotes) ? filteredQuotes.length : 0}{' '}
                  orçamentos encontrados
                </span>
              </div>
            </div>
          </div>
        </motion.div>

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
              <div className="relative flex flex-row items-center gap-1 bg-white rounded-lg lg:rounded-md p-0 h-10 transition-all duration-200 admin-filter-element w-full">
                {/* Slider animado */}
                <motion.div
                  className="absolute bg-slate-700 rounded-lg lg:rounded-md z-0 h-full"
                  initial={false}
                  animate={{
                    x: viewMode === 'kanban' ? 0 : 'calc(100% + 0.25rem)',
                    y: 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    width: 'calc(50% - 0.125rem)',
                    top: 0,
                    left: 0,
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('kanban')}
                  className={cn(
                    'relative z-10 flex flex-1 items-center justify-center gap-2 hover:scale-100 h-10 transition-colors duration-200',
                    viewMode === 'kanban'
                      ? 'text-white hover:text-white'
                      : 'text-inherit hover:text-orange-600'
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Kanban</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className={cn(
                    'relative z-10 flex flex-1 items-center justify-center gap-2 hover:scale-100 h-10 transition-colors duration-200',
                    viewMode === 'table'
                      ? 'text-white hover:text-white'
                      : 'text-inherit hover:text-orange-600'
                  )}
                >
                  <Table className="w-4 h-4" />
                  <span className="hidden sm:inline">Tabela</span>
                </Button>
              </div>
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
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer transition-colors"
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
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
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
            <Dialog.Popup variant="default" className="max-w-4xl">
              <Dialog.Content>
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
                                    <div className="text-2xl font-bold text-green-600">
                                      {formatCurrency(
                                        selectedQuote.totalPrice || 0
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      Valor Total
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Equipamentos */}
                          <Card className="border-l-4 border-l-orange-500">
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <Package className="w-5 h-5 text-orange-600" />
                                Equipamentos Solicitados
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {Array.isArray(selectedQuote.equipments) &&
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
                        </div>
                      ) : null}
                    </Dialog.BodyContent>
                  </Dialog.BodyViewport>
                </Dialog.Body>

                {selectedQuote?.status === 'pending' && selectedQuote && (
                  <Dialog.Footer>
                    <div className="flex gap-3 w-full">
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
                        {isUpdating ? 'Aprovando...' : 'Aprovar Orçamento'}
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
                        {isUpdating ? 'Rejeitando...' : 'Rejeitar Orçamento'}
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
