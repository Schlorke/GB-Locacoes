"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Package,
  FileText,
  TrendingUp,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

interface DashboardStats {
  totalEquipments: number
  totalCategories: number
  totalQuotes: number
  pendingQuotes: number
  approvedQuotes: number
  rejectedQuotes: number
  totalRevenue: number
  monthlyRevenue: number
}

interface RecentQuote {
  id: string
  customerName: string
  customerEmail: string
  totalAmount: number
  status: string
  createdAt: string
  itemsCount: number
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Simulated data - replace with actual API calls
      setStats({
        totalEquipments: 45,
        totalCategories: 8,
        totalQuotes: 127,
        pendingQuotes: 12,
        approvedQuotes: 89,
        rejectedQuotes: 26,
        totalRevenue: 125000,
        monthlyRevenue: 18500,
      })

      setRecentQuotes([
        {
          id: "1",
          customerName: "João Silva",
          customerEmail: "joao@empresa.com",
          totalAmount: 2500,
          status: "pending",
          createdAt: new Date().toISOString(),
          itemsCount: 3,
        },
        {
          id: "2",
          customerName: "Maria Santos",
          customerEmail: "maria@construtora.com",
          totalAmount: 4200,
          status: "approved",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          itemsCount: 5,
        },
      ])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "approved":
        return "Aprovado"
      case "rejected":
        return "Rejeitado"
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 truncate">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Bem-vindo de volta, {session?.user?.name || "Administrador"}!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link href="/admin/equipamentos/novo">
              <Package className="h-4 w-4 mr-2" />
              <span className="truncate">Novo Equipamento</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Total Equipamentos</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {stats?.totalEquipments || 0}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Categorias</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {stats?.totalCategories || 0}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Total Orçamentos</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {stats?.totalQuotes || 0}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Receita Mensal</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  R$ {(stats?.monthlyRevenue || 0).toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quote Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-yellow-800 truncate">Orçamentos Pendentes</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-900">{stats?.pendingQuotes || 0}</p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-green-800 truncate">Orçamentos Aprovados</p>
                <p className="text-xl sm:text-2xl font-bold text-green-900">{stats?.approvedQuotes || 0}</p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-red-800 truncate">Orçamentos Rejeitados</p>
                <p className="text-xl sm:text-2xl font-bold text-red-900">{stats?.rejectedQuotes || 0}</p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">Orçamentos Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:px-6 sm:pb-6">
            <div className="space-y-3 sm:space-y-4 px-4 sm:px-0 pb-4 sm:pb-0">
              {recentQuotes.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <FileText className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-muted-foreground">Nenhum orçamento recente</p>
                </div>
              ) : (
                recentQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm sm:text-base font-medium text-slate-900 truncate">{quote.customerName}</p>
                        <Badge className={`text-xs ${getStatusColor(quote.status)} flex-shrink-0`}>
                          {getStatusLabel(quote.status)}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{quote.customerEmail}</p>
                      <div className="flex items-center gap-3 sm:gap-4 mt-1">
                        <span className="text-xs sm:text-sm font-medium text-green-600">
                          R$ {quote.totalAmount.toLocaleString("pt-BR")}
                        </span>
                        <span className="text-xs text-muted-foreground">{quote.itemsCount} itens</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-3">
                      <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                        <Link href={`/admin/orcamentos`}>
                          <FileText className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">Ações Rápidas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <Button asChild className="w-full justify-start bg-transparent" variant="outline">
              <Link href="/admin/equipamentos/novo">
                <Package className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">Adicionar Novo Equipamento</span>
              </Link>
            </Button>
            <Button asChild className="w-full justify-start bg-transparent" variant="outline">
              <Link href="/admin/categorias">
                <Activity className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">Gerenciar Categorias</span>
              </Link>
            </Button>
            <Button asChild className="w-full justify-start bg-transparent" variant="outline">
              <Link href="/admin/orcamentos">
                <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">Ver Todos os Orçamentos</span>
              </Link>
            </Button>
            <Button asChild className="w-full justify-start bg-transparent" variant="outline">
              <Link href="/admin/equipamentos">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">Gerenciar Equipamentos</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
