"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Eye,
  Trash2,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Loader2,
  Building,
  User,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface Quote {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerCompany?: string
  projectAddress?: string
  startDate?: string
  endDate?: string
  deliveryType?: string
  message?: string
  totalAmount?: number
  status: string
  createdAt: string
  items: {
    id: string
    quantity: number
    days: number
    priceAtTime: number
    equipment: {
      id: string
      name: string
      description: string
      pricePerDay: number
      images: string[]
      category: {
        name: string
        color?: string
      }
    }
  }[]
}

const statusConfig = {
  pending: {
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
    icon: Clock,
  },
  approved: {
    label: "Aprovado",
    color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejeitado",
    color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200",
    icon: XCircle,
  },
  completed: {
    label: "Concluído",
    color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200",
    icon: CheckCircle,
  },
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  useEffect(() => {
    fetchQuotes()
  }, [])

  useEffect(() => {
    filterQuotes()
  }, [quotes, searchTerm, statusFilter])

  const fetchQuotes = async () => {
    try {
      const response = await fetch("/api/admin/quotes")
      if (response.ok) {
        const data = await response.json()
        setQuotes(data)
      } else {
        toast.error("Erro ao carregar orçamentos")
      }
    } catch (error) {
      console.error("Error fetching quotes:", error)
      toast.error("Erro ao carregar orçamentos")
    } finally {
      setIsLoading(false)
    }
  }

  const filterQuotes = () => {
    let filtered = quotes

    if (searchTerm) {
      filtered = filtered.filter(
        (quote) =>
          quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.customerCompany?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((quote) => quote.status === statusFilter)
    }

    setFilteredQuotes(filtered)
  }

  const updateQuoteStatus = async (quoteId: string, newStatus: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success("Status atualizado com sucesso")
        fetchQuotes()
        if (selectedQuote) {
          setSelectedQuote({ ...selectedQuote, status: newStatus })
        }
      } else {
        toast.error("Erro ao atualizar status")
      }
    } catch (error) {
      console.error("Error updating quote status:", error)
      toast.error("Erro ao atualizar status")
    } finally {
      setIsUpdating(false)
    }
  }

  const deleteQuote = async (quoteId: string) => {
    if (!confirm("Tem certeza que deseja excluir este orçamento?")) return

    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Orçamento excluído com sucesso")
        fetchQuotes()
        setSelectedQuote(null)
      } else {
        toast.error("Erro ao excluir orçamento")
      }
    } catch (error) {
      console.error("Error deleting quote:", error)
      toast.error("Erro ao excluir orçamento")
    }
  }

  const getStatusStats = () => {
    const stats = {
      total: quotes.length,
      pending: quotes.filter((q) => q.status === "pending").length,
      approved: quotes.filter((q) => q.status === "approved").length,
      rejected: quotes.filter((q) => q.status === "rejected").length,
      completed: quotes.filter((q) => q.status === "completed").length,
    }
    return stats
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setIsFilterSheetOpen(false)
  }

  const hasActiveFilters = searchTerm || statusFilter !== "all"

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Carregando orçamentos...</p>
        </div>
      </div>
    )
  }

  const stats = getStatusStats()

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">Orçamentos</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Gerencie todos os orçamentos solicitados pelos clientes
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-blue-100 text-xs sm:text-sm truncate">Total</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-yellow-100 text-xs sm:text-sm truncate">Pendentes</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-green-100 text-xs sm:text-sm truncate">Aprovados</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.approved}</p>
              </div>
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-red-100 text-xs sm:text-sm truncate">Rejeitados</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.rejected}</p>
              </div>
              <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white col-span-2 sm:col-span-1">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-purple-100 text-xs sm:text-sm truncate">Concluídos</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.completed}</p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros - Desktop */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="relative">
              <Label htmlFor="search-quotes">Buscar</Label>
              <Search className="absolute left-3 bottom-2.5 text-gray-400 h-4 w-4" />
              <Input
                id="search-quotes"
                placeholder="Nome, email ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="approved">Aprovados</SelectItem>
                  <SelectItem value="rejected">Rejeitados</SelectItem>
                  <SelectItem value="completed">Concluídos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={handleClearFilters} className="w-full md:w-auto bg-transparent">
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtros Mobile - Sheet */}
      <div className="lg:hidden space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar orçamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center justify-between">
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1 mr-2 bg-transparent">
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="mobile-status-filter" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="approved">Aprovados</SelectItem>
                      <SelectItem value="rejected">Rejeitados</SelectItem>
                      <SelectItem value="completed">Concluídos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" onClick={handleClearFilters} className="flex-1 bg-transparent">
                    Limpar Filtros
                  </Button>
                  <Button onClick={() => setIsFilterSheetOpen(false)} className="flex-1">
                    Aplicar
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Limpar
            </Button>
          )}
        </div>
      </div>

      {/* Quotes Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="truncate">Lista de Orçamentos ({filteredQuotes.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Cliente</TableHead>
                  <TableHead className="hidden sm:table-cell min-w-[150px]">Empresa</TableHead>
                  <TableHead className="hidden md:table-cell w-[100px] text-center">Equipamentos</TableHead>
                  <TableHead className="hidden lg:table-cell w-[120px]">Total</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="hidden sm:table-cell w-[100px]">Data</TableHead>
                  <TableHead className="w-[80px] text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => {
                  const StatusIcon = statusConfig[quote.status as keyof typeof statusConfig]?.icon || AlertCircle

                  return (
                    <TableRow key={quote.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell className="p-2 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm sm:text-base truncate">{quote.customerName}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{quote.customerEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell p-2 sm:p-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm truncate">{quote.customerCompany || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center p-2 sm:p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-sm">{quote.items.length}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell p-2 sm:p-4">
                        <span className="font-bold text-green-600 text-sm">
                          {quote.totalAmount ? `R$ ${quote.totalAmount.toFixed(2)}` : "-"}
                        </span>
                      </TableCell>
                      <TableCell className="p-2 sm:p-4">
                        <Badge
                          className={`${statusConfig[quote.status as keyof typeof statusConfig]?.color} flex items-center gap-1 w-fit text-xs`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          <span className="hidden sm:inline">
                            {statusConfig[quote.status as keyof typeof statusConfig]?.label}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell p-2 sm:p-4">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(quote.createdAt).toLocaleDateString("pt-BR")}
                        </div>
                      </TableCell>
                      <TableCell className="text-right p-2 sm:p-4">
                        <div className="flex items-center justify-end gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedQuote(quote)}
                                className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Ver detalhes</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent
                              className="w-full max-w-4xl max-h-[90vh] overflow-hidden p-0 rounded-xl shadow-xl"
                              aria-labelledby="quote-dialog-title"
                              aria-describedby="quote-dialog-desc"
                            >
                              <DialogHeader className="p-4 sm:p-6 pb-4 border-b">
                                <DialogTitle
                                  id="quote-dialog-title"
                                  className="flex items-center gap-2 text-base sm:text-lg"
                                >
                                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                                  <span className="truncate">Orçamento #{selectedQuote?.id.slice(-8)}</span>
                                </DialogTitle>
                                <DialogDescription id="quote-dialog-desc">
                                  Informações completas do orçamento.
                                </DialogDescription>
                              </DialogHeader>
                              {selectedQuote && (
                                <div className="overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-500 px-4 sm:px-6 py-4 space-y-4 sm:space-y-6">
                                  {/* Customer & Project Info */}
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                                          <User className="h-4 w-4 sm:h-5 sm:w-5" />
                                          Dados do Cliente
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium text-gray-700 text-sm">Nome:</span>
                                          <span className="text-sm truncate">{selectedQuote.customerName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                          <span className="text-sm truncate">{selectedQuote.customerEmail}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                          <span className="text-sm">{selectedQuote.customerPhone}</span>
                                        </div>
                                        {selectedQuote.customerCompany && (
                                          <div className="flex items-center gap-2">
                                            <Building className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                            <span className="text-sm truncate">{selectedQuote.customerCompany}</span>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                                          <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                                          Detalhes do Projeto
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-3">
                                        {selectedQuote.projectAddress && (
                                          <div className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                            <span className="text-sm">{selectedQuote.projectAddress}</span>
                                          </div>
                                        )}
                                        {selectedQuote.startDate && (
                                          <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                            <span className="text-sm">
                                              Início: {new Date(selectedQuote.startDate).toLocaleDateString("pt-BR")}
                                            </span>
                                          </div>
                                        )}
                                        {selectedQuote.endDate && (
                                          <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                            <span className="text-sm">
                                              Término: {new Date(selectedQuote.endDate).toLocaleDateString("pt-BR")}
                                            </span>
                                          </div>
                                        )}
                                        {selectedQuote.deliveryType && (
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-700 text-sm">Entrega:</span>
                                            <Badge variant="outline" className="text-xs">
                                              {selectedQuote.deliveryType === "delivery"
                                                ? "Entrega no local"
                                                : "Retirada na loja"}
                                            </Badge>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>
                                  </div>

                                  {/* Equipment Items */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                                        <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                                        Equipamentos Solicitados ({selectedQuote.items.length})
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="grid grid-cols-1 gap-4 mb-6">
                                        {selectedQuote.items.map((item) => (
                                          <Card key={item.id} className="border border-gray-200">
                                            <CardContent className="p-3 sm:p-4">
                                              <div className="flex gap-3 sm:gap-4">
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex-shrink-0">
                                                  <Image
                                                    src={
                                                      item.equipment.images[0] ||
                                                      "/placeholder.svg?height=64&width=64" ||
                                                      "/placeholder.svg"
                                                    }
                                                    alt={item.equipment.name}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover rounded-lg"
                                                  />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-1 truncate">
                                                    {item.equipment.name}
                                                  </h4>
                                                  <Badge
                                                    variant="outline"
                                                    className="mb-2 text-xs"
                                                    style={{
                                                      borderColor: item.equipment.category.color || "#6B7280",
                                                      color: item.equipment.category.color || "#6B7280",
                                                    }}
                                                  >
                                                    {item.equipment.category.name}
                                                  </Badge>
                                                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
                                                    <div>
                                                      Qtd: <span className="font-medium">{item.quantity}</span>
                                                    </div>
                                                    <div>
                                                      Dias: <span className="font-medium">{item.days}</span>
                                                    </div>
                                                    <div>
                                                      Preço/dia:{" "}
                                                      <span className="font-medium">
                                                        R$ {item.priceAtTime.toFixed(2)}
                                                      </span>
                                                    </div>
                                                    <div className="font-bold text-orange-600">
                                                      Total: R${" "}
                                                      {(item.quantity * item.days * item.priceAtTime).toFixed(2)}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        ))}
                                      </div>

                                      <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                          <span className="text-lg sm:text-xl font-bold text-gray-900">
                                            Total Geral:
                                          </span>
                                          <span className="text-2xl sm:text-3xl font-bold text-orange-600">
                                            R$ {selectedQuote.totalAmount?.toFixed(2)}
                                          </span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Message */}
                                  {selectedQuote.message && (
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                                          <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                                          Observações do Cliente
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <p className="text-sm sm:text-base text-gray-700 bg-gray-50 p-3 sm:p-4 rounded-lg">
                                          {selectedQuote.message}
                                        </p>
                                      </CardContent>
                                    </Card>
                                  )}

                                  {/* Status Update */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                        Gerenciar Status
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <div className="flex-1 w-full sm:w-auto">
                                          <Select
                                            value={selectedQuote.status}
                                            onValueChange={(value) => updateQuoteStatus(selectedQuote.id, value)}
                                            disabled={isUpdating}
                                          >
                                            <SelectTrigger className="w-full">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="pending">
                                                <div className="flex items-center gap-2">
                                                  <Clock className="h-4 w-4 text-yellow-600" />
                                                  Pendente
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="approved">
                                                <div className="flex items-center gap-2">
                                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                                  Aprovado
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="rejected">
                                                <div className="flex items-center gap-2">
                                                  <XCircle className="h-4 w-4 text-red-600" />
                                                  Rejeitado
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="completed">
                                                <div className="flex items-center gap-2">
                                                  <CheckCircle className="h-4 w-4 text-blue-600" />
                                                  Concluído
                                                </div>
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        {isUpdating && <Loader2 className="h-4 w-4 animate-spin text-orange-600" />}
                                        <Button
                                          variant="destructive"
                                          onClick={() => deleteQuote(selectedQuote.id)}
                                          className="flex items-center gap-2 w-full sm:w-auto"
                                          size="sm"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                          Excluir
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteQuote(quote.id)}
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            {filteredQuotes.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <FileText className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Nenhum orçamento encontrado</h3>
                <p className="text-sm text-gray-500">
                  {searchTerm || statusFilter !== "all"
                    ? "Tente ajustar os filtros de busca"
                    : "Os orçamentos solicitados aparecerão aqui"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
