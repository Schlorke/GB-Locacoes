'use client'

import { useState } from 'react'
// import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FileText,
  Calendar,
  Clock,
  Search,
  Eye,
  Download,
  Plus,
  TrendingUp,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Types
type OrcamentoStatus = 'pending' | 'approved' | 'rejected'

interface Orcamento {
  id: string
  data: string
  status: OrcamentoStatus
  equipamentos: string[]
  valor: number
  periodo: string
}

// Mock data para orçamentos
const mockOrcamentos: Orcamento[] = [
  {
    id: '001',
    data: '2024-01-15',
    status: 'approved',
    equipamentos: ['Escavadeira', 'Retroescavadeira'],
    valor: 2850.0,
    periodo: '7 dias',
  },
  {
    id: '002',
    data: '2024-01-10',
    status: 'pending',
    equipamentos: ['Betoneira', 'Martelo Pneumático'],
    valor: 1420.0,
    periodo: '3 dias',
  },
  {
    id: '003',
    data: '2024-01-05',
    status: 'rejected',
    equipamentos: ['Guindaste'],
    valor: 4200.0,
    periodo: '14 dias',
  },
]

const statusConfig: Record<
  OrcamentoStatus,
  {
    label: string
    color: string
    icon: React.ComponentType<{ className?: string }>
    dotColor: string
  }
> = {
  pending: {
    label: 'Pendente',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock,
    dotColor: 'bg-yellow-500',
  },
  approved: {
    label: 'Aprovado',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    dotColor: 'bg-green-500',
  },
  rejected: {
    label: 'Rejeitado',
    color: 'bg-red-100 text-red-800',
    icon: XCircle,
    dotColor: 'bg-red-500',
  },
}

export default function OrcamentosPage() {
  // const { data: session } = useSession()
  // TODO: Use session data for user-specific quotes
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrcamentos = mockOrcamentos.filter((orcamento) => {
    const matchesSearch =
      orcamento.equipamentos.some((eq) =>
        eq.toLowerCase().includes(searchTerm.toLowerCase())
      ) || orcamento.id.includes(searchTerm)
    const matchesStatus =
      statusFilter === 'all' || orcamento.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockOrcamentos.length,
    pending: mockOrcamentos.filter((o) => o.status === 'pending').length,
    approved: mockOrcamentos.filter((o) => o.status === 'approved').length,
    rejected: mockOrcamentos.filter((o) => o.status === 'rejected').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section com Identidade Visual Completa */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden">
        {/* Elementos animados de background */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-14 relative z-10">
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold leading-tight">
              Meus Orçamentos
            </h1>
            <p className="text-base md:text-lg text-orange-100 leading-relaxed max-w-2xl mx-auto">
              Acompanhe o status de todos os seus orçamentos solicitados
            </p>
          </motion.div>
        </div>

        {/* Onda SVG no final */}
        <div className="relative w-full overflow-hidden">
          <svg
            className="relative block w-full h-6"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Dashboard Principal - LAYOUT OTIMIZADO */}
      <section className="py-12 md:py-16 lg:py-10 relative -mt-20 md:-mt-24">
        <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Stats Grid - 1 coluna em mobile, 4 colunas em desktop */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 items-stretch"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Card Total */}
            <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between h-full">
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Total
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stats.total}
                    </p>
                    <p className="text-sm text-gray-500">orçamentos</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Pendentes */}
            <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between h-full">
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Pendentes
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stats.pending}
                    </p>
                    <p className="text-sm text-gray-500">aguardando</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Aprovados */}
            <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between h-full">
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Aprovados
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stats.approved}
                    </p>
                    <p className="text-sm text-gray-500">confirmados</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Rejeitados */}
            <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between h-full">
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Rejeitados
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stats.rejected}
                    </p>
                    <p className="text-sm text-gray-500">recusados</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                    <XCircle className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Seções Principais - Layout Proporcional à linha superior */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Filtros e Busca */}
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                    <Search className="h-5 w-5" />
                  </div>
                  Filtros e Busca
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-0 flex flex-col flex-1">
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <Label
                      htmlFor="search"
                      className="text-sm font-medium text-gray-700"
                    >
                      Buscar Orçamento
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="ID ou equipamento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="status"
                      className="text-sm font-medium text-gray-700"
                    >
                      Status
                    </Label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Filtrar por status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="approved">Aprovado</SelectItem>
                        <SelectItem value="rejected">Rejeitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                    <Plus className="h-5 w-5" />
                  </div>
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-0 flex flex-col flex-1">
                <div className="space-y-4 flex-1">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Link href="/orcamento">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Orçamento
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 text-gray-900 hover:text-blue-600 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Link href="/equipamentos">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Ver Equipamentos
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lista de Orçamentos */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  Lista de Orçamentos
                </CardTitle>
                <CardDescription>
                  {filteredOrcamentos.length} orçamento(s) encontrado(s)
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                {filteredOrcamentos.length > 0 ? (
                  <div className="space-y-4">
                    {filteredOrcamentos.map((orcamento) => {
                      const StatusIcon = statusConfig[orcamento.status].icon
                      return (
                        <div
                          key={orcamento.id}
                          className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-orange-50 hover:to-orange-100 transition-all duration-300 group border border-gray-200 hover:border-orange-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="text-lg font-bold text-gray-900">
                                #{orcamento.id}
                              </div>
                              <Badge
                                className={statusConfig[orcamento.status].color}
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusConfig[orcamento.status].label}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-white hover:bg-gray-50 text-gray-900 hover:text-orange-600 font-semibold rounded-lg transition-all duration-300"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-white hover:bg-gray-50 text-gray-900 hover:text-blue-600 font-semibold rounded-lg transition-all duration-300"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600 mb-1">
                                Data do Orçamento
                              </p>
                              <p className="font-semibold text-gray-900 flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(orcamento.data).toLocaleDateString(
                                  'pt-BR'
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Equipamentos</p>
                              <p className="font-semibold text-gray-900">
                                {orcamento.equipamentos.join(', ')}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Valor Total</p>
                              <p className="font-semibold text-green-600 text-lg">
                                R$ {orcamento.valor.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-4">
                      Nenhum orçamento encontrado
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Link href="/orcamento">
                        <Plus className="h-4 w-4 mr-2" />
                        Solicitar Primeiro Orçamento
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
