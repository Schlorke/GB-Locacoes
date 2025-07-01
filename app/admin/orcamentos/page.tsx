"use client"

import React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  Eye,
  Loader2,
  ServerCrash,
  Filter,
  FileText,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Quote {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  startDate: string
  endDate: string
  totalPrice: number
  status: "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED"
  createdAt: string
  items: {
    id: string
    quantity: number
    equipment: {
      id: string
      name: string
      pricePerDay: number
      images: string[]
    }
  }[]
}

interface ApiResponse {
  quotes: Quote[]
  pagination: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
  stats: {
    total: number
    pending: number
    approved: number
    rejected: number
    expired: number
  }
}

const statusConfig = {
  PENDING: {
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-700 dark:text-yellow-100",
    icon: Clock,
  },
  APPROVED: {
    label: "Aprovado",
    color: "bg-green-100 text-green-700 border-green-300 dark:bg-green-700 dark:text-green-100",
    icon: CheckCircle,
  },
  REJECTED: {
    label: "Rejeitado",
    color: "bg-red-100 text-red-700 border-red-300 dark:bg-red-700 dark:text-red-100",
    icon: XCircle,
  },
  EXPIRED: {
    label: "Expirado",
    color: "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-100",
    icon: AlertCircle,
  },
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, expired: 0 })
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const fetchQuotes = useCallback(async () => {
    setLoading(true)
    setApiError(null)
    try {
      const params = new URLSearchParams()
      params.append("page", currentPage.toString())
      params.append("limit", itemsPerPage.toString())
      if (search) params.append("search", search)
      if (statusFilter && statusFilter !== "all") params.append("status", statusFilter)

      const response = await fetch(`/api/admin/quotes?${params.toString()}`)

      if (response.ok) {
        const data: ApiResponse = await response.json()
        setQuotes(data.quotes)
        setStats(data.stats)
        setTotalPages(data.pagination.totalPages)
        setTotalItems(data.pagination.totalItems)
        setCurrentPage(data.pagination.page)
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.error || `Erro ${response.status} ao buscar orçamentos.`
        toast.error(errorMessage)
        setApiError(errorMessage)
        setQuotes([])
        setTotalPages(1)
        setTotalItems(0)
      }
    } catch (error) {
      console.error("Error fetching quotes:", error)
      const errorMessage = "Erro de rede ao buscar orçamentos."
      toast.error(errorMessage)
      setApiError(errorMessage)
      setQuotes([])
      setTotalPages(1)
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, search, statusFilter])

  useEffect(() => {
    fetchQuotes()
  }, [fetchQuotes])

  const handleClearFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setCurrentPage(1)
    setIsFilterSheetOpen(false)
  }

  const hasActiveFilters = search || statusFilter !== "all"

  const openDetailsDialog = (quote: Quote) => {
    setSelectedQuote(quote)
    setIsDetailsDialogOpen(true)
  }

  const updateQuoteStatus = async (quoteId: string, newStatus: Quote["status"]) => {
    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success("Status do orçamento atualizado!")
        fetchQuotes()
        setIsDetailsDialogOpen(false)
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Erro ao atualizar status")
      }
    } catch (error) {
      console.error("Error updating quote status:", error)
      toast.error("Erro de rede ao atualizar status")
    }
  }

  if (loading && quotes.length === 0 && !apiError) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 mt-4 text-lg text-muted-foreground">Carregando orçamentos...</p>
      </div>
    )
  }

  if (apiError && quotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center p-4">
        <ServerCrash className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Erro ao Carregar Orçamentos</h2>
        <p className="text-muted-foreground mb-4 max-w-md">{apiError}</p>
        <Button onClick={fetchQuotes} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Tentar Novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 truncate">
            Gerenciar Orçamentos
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Gerencie todos os orçamentos do sistema</p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 truncate">Total</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.total}</p>
              </div>
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-yellow-600 dark:text-yellow-400 truncate">
                  Pendentes
                </p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-700 dark:text-yellow-300">{stats.pending}</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 truncate">Aprovados</p>
                <p className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">{stats.approved}</p>
              </div>
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 truncate">Rejeitados</p>
                <p className="text-lg sm:text-2xl font-bold text-red-700 dark:text-red-300">{stats.rejected}</p>
              </div>
              <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700 col-span-2 sm:col-span-1">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">Expirados</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.expired}</p>
              </div>
              <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros Desktop */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <div className="relative">
              <Label htmlFor="search-quotes">Buscar</Label>
              <Search className="absolute left-3 bottom-2.5 text-gray-400 h-4 w-4" />
              <Input
                id="search-quotes"
                placeholder="Nome do cliente ou email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger id="status-filter" className="mt-1">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="PENDING">Pendente</SelectItem>
                  <SelectItem value="APPROVED">Aprovado</SelectItem>
                  <SelectItem value="REJECTED">Rejeitado</SelectItem>
                  <SelectItem value="EXPIRED">Expirado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={handleClearFilters} className="w-full md:w-auto bg-transparent">
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtros Mobile */}
      <div className="lg:hidden space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar orçamentos..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10"
          />
        </div>

        <div className="flex items-center justify-between">
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1 mr-2 bg-transparent h-10">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                {hasActiveFilters && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    !
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>Filtre os orçamentos por status</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="mobile-status-filter">Status</Label>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => {
                      setStatusFilter(value)
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger id="mobile-status-filter" className="mt-1">
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="PENDING">Pendente</SelectItem>
                      <SelectItem value="APPROVED">Aprovado</SelectItem>
                      <SelectItem value="REJECTED">Rejeitado</SelectItem>
                      <SelectItem value="EXPIRED">Expirado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" onClick={handleClearFilters} className="flex-1 bg-transparent h-10">
                    Limpar Filtros
                  </Button>
                  <Button onClick={() => setIsFilterSheetOpen(false)} className="flex-1 h-10">
                    Aplicar
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-10">
            Limpar
          </Button>
        </div>
      </div>

      {/* Tabela de Orçamentos */}
      <Card className="relative">
        {loading && quotes.length > 0 && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center z-20 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <CardContent className="overflow-x-auto">
          {quotes.length === 0 && !loading ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <FileText className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 dark:text-gray-500 mb-4" />
              <p className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
                Nenhum orçamento encontrado
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
                {search || statusFilter !== "all"
                  ? "Tente ajustar os filtros ou limpar a busca."
                  : "Parece que não há orçamentos cadastrados ainda."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden sm:table-cell">Período</TableHead>
                  <TableHead className="hidden md:table-cell">Itens</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => {
                  const StatusIcon = statusConfig[quote.status].icon
                  return (
                    <TableRow key={quote.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium truncate max-w-[150px] sm:max-w-xs">{quote.customerName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px] sm:max-w-xs">
                            {quote.customerEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        <div>
                          <div>{format(new Date(quote.startDate), "dd/MM/yyyy", { locale: ptBR })}</div>
                          <div className="text-xs text-gray-500">
                            até {format(new Date(quote.endDate), "dd/MM/yyyy", { locale: ptBR })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {quote.items.length} {quote.items.length === 1 ? "item" : "itens"}
                      </TableCell>
                      <TableCell className="text-sm font-medium">R$ {quote.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${statusConfig[quote.status].color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[quote.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDetailsDialog(quote)}
                          className="h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver detalhes do orçamento</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Paginação */}
      {quotes.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t mt-6">
          <div className="text-sm text-muted-foreground">
            Mostrando {quotes.length} de {totalItems} orçamentos. Página {currentPage} de {totalPages}.
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="text-sm p-2">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number.parseInt(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[130px] h-9 text-sm">
                <SelectValue placeholder="Itens por pág." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 por página</SelectItem>
                <SelectItem value="10">10 por página</SelectItem>
                <SelectItem value="20">20 por página</SelectItem>
                <SelectItem value="50">50 por página</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Dialog de Detalhes */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-hidden p-0 rounded-xl shadow-xl">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-lg sm:text-xl">Detalhes do Orçamento</DialogTitle>
            <DialogDescription>Visualize e gerencie os detalhes completos do orçamento</DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-500 px-6 py-4 space-y-6">
              {/* Informações do Cliente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Informações do Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm truncate">{selectedQuote.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm truncate">{selectedQuote.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm truncate">{selectedQuote.customerPhone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{selectedQuote.customerAddress}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Período e Valores
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm">
                        {format(new Date(selectedQuote.startDate), "dd/MM/yyyy", { locale: ptBR })} até{" "}
                        {format(new Date(selectedQuote.endDate), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm font-medium">Total: R$ {selectedQuote.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm">
                        {selectedQuote.items.length} {selectedQuote.items.length === 1 ? "item" : "itens"}
                      </span>
                    </div>
                    <div className="pt-2">
                      <Badge className={statusConfig[selectedQuote.status].color}>
                        {React.createElement(statusConfig[selectedQuote.status].icon, { className: "h-3 w-3 mr-1" })}
                        {statusConfig[selectedQuote.status].label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Itens do Orçamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Itens do Orçamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedQuote.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <img
                          src={item.equipment.images?.[0] || "/placeholder.svg?width=60&height=60&text=S/I"}
                          alt={item.equipment.name}
                          className="w-12 h-12 sm:w-15 sm:h-15 object-cover rounded-md border flex-shrink-0"
                          onError={(e) => (e.currentTarget.src = "/placeholder.svg?width=60&height=60&text=Erro")}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.equipment.name}</h4>
                          <p className="text-xs text-gray-500">
                            Quantidade: {item.quantity} | R$ {item.equipment.pricePerDay.toFixed(2)}/dia
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-medium text-sm">
                            R$ {(item.quantity * item.equipment.pricePerDay).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ações de Status */}
              {selectedQuote.status === "PENDING" && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t justify-center sm:justify-start">
                  <Button
                    onClick={() => updateQuoteStatus(selectedQuote.id, "APPROVED")}
                    className="bg-green-600 hover:bg-green-700 text-white w-auto h-10"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar Orçamento
                  </Button>
                  <Button
                    onClick={() => updateQuoteStatus(selectedQuote.id, "REJECTED")}
                    variant="destructive"
                    className="w-auto h-10"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejeitar Orçamento
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
