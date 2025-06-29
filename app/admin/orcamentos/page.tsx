"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
  },
  approved: {
    label: "Aprovado",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejeitado",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
  completed: {
    label: "Concluído",
    color: "bg-blue-100 text-blue-800 border-blue-200",
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando orçamentos...</p>
        </div>
      </div>
    )
  }

  const stats = getStatusStats()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orçamentos</h1>
          <p className="text-gray-600">Gerencie todos os orçamentos solicitados pelos clientes</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Pendentes</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Aprovados</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Rejeitados</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Concluídos</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, email ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
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
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Lista de Orçamentos ({filteredQuotes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Equipamentos</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => {
                  const StatusIcon = statusConfig[quote.status as keyof typeof statusConfig]?.icon || AlertCircle

                  return (
                    <TableRow key={quote.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{quote.customerName}</p>
                            <p className="text-sm text-gray-500">{quote.customerEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>{quote.customerCompany || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{quote.items.length}</span>
                          <span className="text-gray-500">itens</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-green-600">
                          {quote.totalAmount ? `R$ ${quote.totalAmount.toFixed(2)}` : "-"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusConfig[quote.status as keyof typeof statusConfig]?.color} flex items-center gap-1 w-fit`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[quote.status as keyof typeof statusConfig]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {new Date(quote.createdAt).toLocaleDateString("pt-BR")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedQuote(quote)}
                                className="hover:bg-blue-50 hover:text-blue-600"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent
                              className="max-w-6xl w-[90vw] sm:w-full max-h-[90vh] overflow-hidden p-0 flex flex-col"
                              aria-labelledby="quote-dialog-title"
                              aria-describedby="quote-dialog-desc"
                            >
                              <DialogHeader className="p-6 pb-4 border-b">
                                <DialogTitle
                                  id="quote-dialog-title"
                                  className="flex items-center gap-2"
                                >
                                  <FileText className="h-5 w-5" />
                                  Detalhes do Orçamento #{selectedQuote?.id.slice(-8)}
                                </DialogTitle>
                                <DialogDescription id="quote-dialog-desc">
                                  Informações completas do orçamento.
                                </DialogDescription>
                              </DialogHeader>
                              {selectedQuote && (
                                <div className="space-y-6 overflow-y-auto px-6 pb-6 flex-grow">
                                  {/* Customer & Project Info */}
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                          <User className="h-5 w-5" />
                                          Dados do Cliente
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium text-gray-700">Nome:</span>
                                          <span>{selectedQuote.customerName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Mail className="h-4 w-4 text-gray-400" />
                                          <span>{selectedQuote.customerEmail}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Phone className="h-4 w-4 text-gray-400" />
                                          <span>{selectedQuote.customerPhone}</span>
                                        </div>
                                        {selectedQuote.customerCompany && (
                                          <div className="flex items-center gap-2">
                                            <Building className="h-4 w-4 text-gray-400" />
                                            <span>{selectedQuote.customerCompany}</span>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                          <MapPin className="h-5 w-5" />
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
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm">
                                              Início: {new Date(selectedQuote.startDate).toLocaleDateString("pt-BR")}
                                            </span>
                                          </div>
                                        )}
                                        {selectedQuote.endDate && (
                                          <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm">
                                              Término: {new Date(selectedQuote.endDate).toLocaleDateString("pt-BR")}
                                            </span>
                                          </div>
                                        )}
                                        {selectedQuote.deliveryType && (
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-700">Entrega:</span>
                                            <Badge variant="outline">
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
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Equipamentos Solicitados ({selectedQuote.items.length})
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        {selectedQuote.items.map((item) => (
                                          <Card key={item.id} className="border border-gray-200">
                                            <CardContent className="p-4">
                                              <div className="flex gap-4">
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                                                  <Image
                                                    src={
                                                      item.equipment.images[0] || "/placeholder.svg?height=64&width=64"
                                                    }
                                                    alt={item.equipment.name}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover rounded-lg"
                                                  />
                                                </div>
                                                <div className="flex-1">
                                                  <h4 className="font-medium text-gray-900 mb-1">
                                                    {item.equipment.name}
                                                  </h4>
                                                  <Badge
                                                    variant="outline"
                                                    className="mb-2"
                                                    style={{
                                                      borderColor: item.equipment.category.color || "#6B7280",
                                                      color: item.equipment.category.color || "#6B7280",
                                                    }}
                                                  >
                                                    {item.equipment.category.name}
                                                  </Badge>
                                                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
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
                                          <span className="text-xl font-bold text-gray-900">Total Geral:</span>
                                          <span className="text-3xl font-bold text-orange-600">
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
                                        <CardTitle className="text-lg flex items-center gap-2">
                                          <FileText className="h-5 w-5" />
                                          Observações do Cliente
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                          {selectedQuote.message}
                                        </p>
                                      </CardContent>
                                    </Card>
                                  )}

                                  {/* Status Update */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5" />
                                        Gerenciar Status
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex items-center gap-4">
                                        <div className="flex-1">
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
                                          className="flex items-center gap-2"
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
                            size="sm"
                            onClick={() => deleteQuote(quote.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            {filteredQuotes.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum orçamento encontrado</h3>
                <p className="text-gray-500">
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
