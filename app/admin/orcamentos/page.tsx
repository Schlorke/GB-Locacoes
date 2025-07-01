"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  Search,
  Eye,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  Calendar,
  Building,
  User,
  Mail,
  Phone,
  Package,
} from "lucide-react"
import { toast } from "sonner"

interface QuoteItem {
  id: string
  equipmentId: string
  equipment: {
    name: string
    dailyPrice: number
  }
  quantity: number
  days: number
  totalPrice: number
}

interface Quote {
  id: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerCompany?: string
  message?: string
  status: "pending" | "approved" | "rejected" | "completed"
  totalAmount?: number
  adminNotes?: string
  createdAt: string
  updatedAt: string
  items: QuoteItem[]
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
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    setIsLoading(true)
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

  const updateQuoteStatus = async (quoteId: string, status: string, notes?: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes: notes }),
      })

      if (response.ok) {
        toast.success("Status do orçamento atualizado!")
        fetchQuotes()
        setIsDetailDialogOpen(false)
        setSelectedQuote(null)
        setAdminNotes("")
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Erro ao atualizar orçamento")
      }
    } catch (error) {
      console.error("Error updating quote:", error)
      toast.error("Erro ao atualizar orçamento")
    } finally {
      setIsUpdating(false)
    }
  }

  const openQuoteDetail = (quote: Quote) => {
    setSelectedQuote(quote)
    setAdminNotes(quote.adminNotes || "")
    setIsDetailDialogOpen(true)
  }

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customerCompany?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (isLoading && quotes.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] sm:h-[60vh] lg:h-[calc(100vh-150px)]">
        <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">Orçamentos</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Gerencie as solicitações de orçamento dos clientes.
          </p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Pesquisar orçamentos
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Pesquisar por cliente, email ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="approved">Aprovados</SelectItem>
                <SelectItem value="rejected">Rejeitados</SelectItem>
                <SelectItem value="completed">Concluídos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="truncate">Lista de Orçamentos</span>
            <Badge variant="secondary" className="ml-auto">
              {filteredQuotes.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {isLoading && quotes.length > 0 && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}
          {!isLoading && filteredQuotes.length === 0 && quotes.length === 0 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <FileText className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-lg sm:text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                Nenhum orçamento encontrado.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
                Os orçamentos solicitados pelos clientes aparecerão aqui.
              </p>
            </div>
          ) : !isLoading && filteredQuotes.length === 0 ? (
            <div className="text-center py-8 px-4">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-600 mb-2">Nenhum orçamento encontrado</p>
              <p className="text-sm text-gray-400">Tente ajustar os filtros de pesquisa</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Cliente</TableHead>
                    <TableHead className="hidden sm:table-cell min-w-[150px]">Empresa</TableHead>
                    <TableHead className="hidden md:table-cell w-[100px] text-center">Itens</TableHead>
                    <TableHead className="hidden lg:table-cell w-[120px]">Valor</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="hidden sm:table-cell w-[100px]">Data</TableHead>
                    <TableHead className="w-[80px] text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotes.map((quote) => {
                    const StatusIcon = statusConfig[quote.status]?.icon || AlertTriangle

                    return (
                      <TableRow key={quote.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell className="p-2 sm:p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{quote.customerName}</p>
                              <p className="text-xs text-muted-foreground truncate">{quote.customerEmail}</p>
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
                          <span className="font-medium text-sm">{quote.items.length}</span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell p-2 sm:p-4">
                          <span className="font-bold text-green-600 text-sm">
                            {quote.totalAmount ? `R$ ${quote.totalAmount.toFixed(2)}` : "-"}
                          </span>
                        </TableCell>
                        <TableCell className="p-2 sm:p-4">
                          <Badge
                            className={`${statusConfig[quote.status]?.color} flex items-center gap-1 w-fit text-xs`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            <span className="hidden sm:inline">{statusConfig[quote.status]?.label}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell p-2 sm:p-4">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(quote.createdAt).toLocaleDateString("pt-BR")}
                          </div>
                        </TableCell>
                        <TableCell className="text-right p-2 sm:p-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openQuoteDetail(quote)}
                            aria-label="Visualizar detalhes"
                            className="h-8 w-8"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Detalhes do Orçamento */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-hidden p-0 rounded-xl shadow-xl">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-lg sm:text-xl">Detalhes do Orçamento</DialogTitle>
            <DialogDescription>Visualize e gerencie o orçamento solicitado pelo cliente.</DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-500 px-6 py-4">
              <div className="space-y-6">
                {/* Informações do Cliente */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Informações do Cliente
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">Nome:</span>
                        <span>{selectedQuote.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">Email:</span>
                        <span>{selectedQuote.customerEmail}</span>
                      </div>
                      {selectedQuote.customerPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">Telefone:</span>
                          <span>{selectedQuote.customerPhone}</span>
                        </div>
                      )}
                      {selectedQuote.customerCompany && (
                        <div className="flex items-center gap-2">
                          <Building className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">Empresa:</span>
                          <span>{selectedQuote.customerCompany}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-base flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Status do Orçamento
                    </h3>
                    <div className="space-y-2">
                      <Badge className={`${statusConfig[selectedQuote.status]?.color} flex items-center gap-2 w-fit`}>
                        {React.createElement(statusConfig[selectedQuote.status]?.icon || AlertTriangle, {
                          className: "h-3 w-3",
                        })}
                        {statusConfig[selectedQuote.status]?.label}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        <p>Criado em: {new Date(selectedQuote.createdAt).toLocaleString("pt-BR")}</p>
                        <p>Atualizado em: {new Date(selectedQuote.updatedAt).toLocaleString("pt-BR")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mensagem do Cliente */}
                {selectedQuote.message && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-base">Mensagem do Cliente</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{selectedQuote.message}</p>
                    </div>
                  </div>
                )}

                {/* Itens do Orçamento */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Itens Solicitados
                  </h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Equipamento</TableHead>
                          <TableHead className="text-center">Qtd</TableHead>
                          <TableHead className="text-center">Dias</TableHead>
                          <TableHead className="text-right">Preço Unit.</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedQuote.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.equipment.name}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-center">{item.days}</TableCell>
                            <TableCell className="text-right">R$ {item.equipment.dailyPrice.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-bold">R$ {item.totalPrice.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-gray-50 dark:bg-gray-800">
                          <TableCell colSpan={4} className="font-bold text-right">
                            Total Geral:
                          </TableCell>
                          <TableCell className="font-bold text-right text-green-600">
                            R$ {selectedQuote.items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Notas do Administrador */}
                <div className="space-y-3">
                  <Label htmlFor="admin-notes" className="font-semibold text-base">
                    Notas do Administrador
                  </Label>
                  <Textarea
                    id="admin-notes"
                    placeholder="Adicione observações sobre este orçamento..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="p-6 pt-4 border-t flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)} className="w-full sm:w-auto">
              Fechar
            </Button>
            {selectedQuote?.status === "pending" && (
              <>
                <Button
                  onClick={() => updateQuoteStatus(selectedQuote.id, "rejected", adminNotes)}
                  disabled={isUpdating}
                  variant="destructive"
                  className="w-full sm:w-auto"
                >
                  {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <X className="mr-2 h-4 w-4" />}
                  Rejeitar
                </Button>
                <Button
                  onClick={() => updateQuoteStatus(selectedQuote.id, "approved", adminNotes)}
                  disabled={isUpdating}
                  className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                >
                  {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                  Aprovar
                </Button>
              </>
            )}
            {selectedQuote?.status === "approved" && (
              <Button
                onClick={() => updateQuoteStatus(selectedQuote.id, "completed", adminNotes)}
                disabled={isUpdating}
                className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
              >
                {isUpdating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Marcar como Concluído
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
