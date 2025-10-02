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
import { SearchBar } from '@/components/ui/search-bar'
import {
  FileText,
  Calendar,
  Clock,
  Eye,
  Download,
  Plus,
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

  return (
    <div className="min-h-screen bg-gray-50 pt-[84px] sm:pt-0">
      {/* Hero Section com Identidade Visual Completa */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden w-screen -ml-4 sm:w-full sm:ml-0">
        {/* Elementos animados de background removidos nesta seção da área do cliente */}

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
            <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto">
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
          {/* Barra de Pesquisa - NOVA IMPLEMENTAÇÃO */}
          <motion.div
            className="mb-8 relative z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar
              searchPlaceholder="ID ou equipamento..."
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              filters={[
                {
                  label: 'Status',
                  value: statusFilter,
                  onValueChange: setStatusFilter,
                  placeholder: 'Filtrar por status',
                  options: [
                    { value: 'all', label: 'Todos' },
                    { value: 'pending', label: 'Pendente' },
                    { value: 'approved', label: 'Aprovado' },
                    { value: 'rejected', label: 'Rejeitado' },
                  ],
                },
              ]}
            />
          </motion.div>

          {/* Lista de Orçamentos */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 z-0">
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
              <CardContent className="p-4 md:p-6 lg:p-8 relative !pt-0 z-0">
                {filteredOrcamentos.length > 0 ? (
                  <div className="space-y-6">
                    {filteredOrcamentos.map((orcamento) => {
                      const StatusIcon = statusConfig[orcamento.status].icon
                      return (
                        <div
                          key={orcamento.id}
                          className="p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative z-0"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 gap-4">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="text-xl font-bold text-gray-900 tracking-tight">
                                #{orcamento.id}
                              </div>
                              <Badge
                                className={`${statusConfig[orcamento.status].color} hover:shadow-none status-badge-hover`}
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusConfig[orcamento.status].label}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 w-full md:w-auto md:mt-0">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 md:flex-none min-w-0 bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-semibold text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border-gray-200"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 md:flex-none min-w-0 bg-white hover:bg-white text-gray-900 hover:text-blue-600 font-semibold text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border-gray-200"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                            <div className="space-y-2">
                              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                                Data do Orçamento
                              </p>
                              <p
                                className="text-sm font-medium text-gray-900 flex items-center gap-2 leading-relaxed"
                                style={{ fontSize: '0.9rem' }}
                              >
                                <Calendar className="h-4 w-4 text-gray-400" />
                                {new Date(orcamento.data).toLocaleDateString(
                                  'pt-BR'
                                )}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                                Equipamentos
                              </p>
                              <p
                                className="text-sm font-medium text-gray-900 leading-relaxed break-words"
                                style={{ fontSize: '0.9rem' }}
                              >
                                {orcamento.equipamentos.join(', ')}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                                Valor Total
                              </p>
                              <p
                                className="text-sm font-bold text-green-600 leading-relaxed"
                                style={{ fontSize: '0.9rem' }}
                              >
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
                    <Button asChild size="default">
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
