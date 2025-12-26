'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ClientAreaBadge } from '@/components/ui/client-area-badge'
import { SearchBar } from '@/components/ui/search-bar'
import { Dialog } from '@/components/ui/dialog'
import {
  FileText,
  Calendar,
  Clock,
  Eye,
  Download,
  Plus,
  CheckCircle,
  XCircle,
  DollarSign,
  Package,
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import React from 'react'
import { Badge } from '@/components/ui/badge'

// Types
type OrcamentoStatus = 'pending' | 'approved' | 'rejected' | 'completed'

interface Orcamento {
  id: string
  name: string
  email: string
  phone: string
  totalPrice: number
  originalTotal?: number
  finalTotal?: number | null
  priceAdjustmentReason?: string | null
  priceAdjustedAt?: string | null
  lateFee?: number | null
  lateFeeApproved?: boolean
  status: OrcamentoStatus
  createdAt: string
  updatedAt: string
  validUntil?: string | null
  items?: Array<{
    id: string
    quantity: number
    days: number
    startDate?: string | null
    endDate?: string | null
    pricePerDay: number
    total: number
    equipment: {
      id: string
      name: string
    }
  }>
}

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
    color: 'bg-orange-100 text-orange-800',
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
  completed: {
    label: 'Concluído',
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle,
    dotColor: 'bg-blue-500',
  },
}

export default function OrcamentosPage() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrcamento, setSelectedOrcamento] = useState<Orcamento | null>(
    null
  )

  const fetchOrcamentos = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/quotes?userId=' + session?.user?.id)
      if (response.ok) {
        const data = await response.json()
        setOrcamentos(Array.isArray(data) ? data : data.quotes || [])
      } else {
        toast.error('Erro', {
          description: 'Erro ao carregar orçamentos.',
        })
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
      toast.error('Erro', {
        description: 'Erro ao carregar orçamentos.',
      })
    } finally {
      setLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (session?.user) {
      fetchOrcamentos()
    }
  }, [session, fetchOrcamentos])

  const filteredOrcamentos = orcamentos.filter((orcamento) => {
    const matchesSearch =
      orcamento.items?.some((item) =>
        item.equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      orcamento.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orcamento.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || orcamento.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-[84px] sm:pt-0">
      {/* Hero Section com Identidade Visual Completa */}
      <section
        id="dashboard-banner"
        className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden w-screen -ml-4 sm:w-full sm:ml-0"
      >
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
              <CardContent className="p-4 pb-8 md:p-6 lg:p-8 relative !pt-0 z-0">
                {loading ? (
                  <div className="text-center py-16">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                    <p className="text-gray-500 mt-4">
                      Carregando orçamentos...
                    </p>
                  </div>
                ) : filteredOrcamentos.length > 0 ? (
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
                              <ClientAreaBadge
                                className={`${statusConfig[orcamento.status].color}`}
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusConfig[orcamento.status].label}
                              </ClientAreaBadge>
                            </div>
                            <div className="flex flex-wrap gap-2 w-full md:w-auto md:mt-0">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedOrcamento(orcamento)}
                                className="flex-1 md:flex-none min-w-0 bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-semibold text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border-gray-200"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 md:flex-none min-w-0 bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-semibold text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border-gray-200"
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
                                {formatDate(orcamento.createdAt)}
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
                                {orcamento.items
                                  ?.map((item) => item.equipment.name)
                                  .join(', ') || 'N/A'}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                                Valor Total
                              </p>
                              {orcamento.finalTotal &&
                              orcamento.finalTotal !==
                                orcamento.originalTotal ? (
                                <div>
                                  <p
                                    className="text-xs text-gray-500 line-through leading-relaxed"
                                    style={{ fontSize: '0.8rem' }}
                                  >
                                    {formatCurrency(
                                      orcamento.originalTotal || 0
                                    )}
                                  </p>
                                  <p
                                    className="text-sm font-bold text-amber-600 leading-relaxed"
                                    style={{ fontSize: '0.9rem' }}
                                  >
                                    {formatCurrency(orcamento.finalTotal)}
                                  </p>
                                </div>
                              ) : (
                                <p
                                  className="text-sm font-bold text-green-600 leading-relaxed"
                                  style={{ fontSize: '0.9rem' }}
                                >
                                  {formatCurrency(orcamento.totalPrice)}
                                </p>
                              )}
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
                    <Button asChild variant="outline" size="default">
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

      {/* Modal de Detalhes do Orçamento */}
      <Dialog.Root
        open={!!selectedOrcamento}
        onOpenChange={(open) => !open && setSelectedOrcamento(null)}
      >
        <Dialog.Backdrop />
        <Dialog.Portal>
          <Dialog.Popup variant="default" className="max-w-4xl">
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.HeaderIcon>
                  <FileText className="w-5 h-5" />
                </Dialog.HeaderIcon>
                <Dialog.Title className="text-xl font-semibold text-gray-800">
                  Detalhes do Orçamento - #{selectedOrcamento?.id}
                </Dialog.Title>
                <Dialog.CloseButton />
              </Dialog.Header>

              <Dialog.Body>
                <Dialog.BodyViewport>
                  <Dialog.BodyContent>
                    {selectedOrcamento && (
                      <div className="space-y-6">
                        {/* Status e Informações Básicas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Status do Orçamento
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ClientAreaBadge
                                className={
                                  statusConfig[selectedOrcamento.status].color
                                }
                              >
                                {React.createElement(
                                  statusConfig[selectedOrcamento.status].icon,
                                  { className: 'h-3 w-3 mr-1' }
                                )}
                                {statusConfig[selectedOrcamento.status].label}
                              </ClientAreaBadge>
                              {selectedOrcamento.validUntil && (
                                <p className="text-xs text-gray-500 mt-2">
                                  Válido até:{' '}
                                  {formatDate(selectedOrcamento.validUntil)}
                                </p>
                              )}
                            </CardContent>
                          </Card>

                          <Card className="border-l-4 border-l-green-500">
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <Calendar className="w-5 h-5 text-green-600" />
                                Data de Criação
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="font-medium">
                                {formatDate(selectedOrcamento.createdAt)}
                              </p>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Valores do Orçamento */}
                        <Card className="border-l-4 border-l-amber-500">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <DollarSign className="w-5 h-5 text-amber-600" />
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
                                  selectedOrcamento.originalTotal ||
                                    selectedOrcamento.totalPrice ||
                                    0
                                )}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Valor calculado automaticamente com base nos
                                equipamentos, períodos e descontos
                              </div>
                            </div>

                            {/* Valor Final Editado */}
                            {selectedOrcamento.finalTotal &&
                              selectedOrcamento.finalTotal !==
                                (selectedOrcamento.originalTotal ||
                                  selectedOrcamento.totalPrice) && (
                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                  <div className="text-sm font-semibold text-amber-700 mb-2">
                                    Valor Final Editado
                                  </div>
                                  <div className="text-2xl font-bold text-amber-900">
                                    {formatCurrency(
                                      selectedOrcamento.finalTotal
                                    )}
                                  </div>
                                  {selectedOrcamento.priceAdjustmentReason && (
                                    <div className="mt-3 p-3 bg-white rounded border border-amber-200">
                                      <div className="text-xs font-semibold text-amber-700 mb-1">
                                        Justificativa do Ajuste:
                                      </div>
                                      <div className="text-sm text-amber-900">
                                        {
                                          selectedOrcamento.priceAdjustmentReason
                                        }
                                      </div>
                                      {selectedOrcamento.priceAdjustedAt && (
                                        <div className="text-xs text-amber-600 mt-2">
                                          Ajustado em:{' '}
                                          {new Date(
                                            selectedOrcamento.priceAdjustedAt
                                          ).toLocaleString('pt-BR')}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}

                            {/* Multa por Atraso */}
                            {selectedOrcamento.lateFee &&
                              selectedOrcamento.lateFee > 0 && (
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm font-semibold text-red-700">
                                      Multa por Atraso
                                    </div>
                                    {selectedOrcamento.lateFeeApproved ? (
                                      <Badge className="bg-green-100 text-green-800 border-green-200">
                                        Aprovada
                                      </Badge>
                                    ) : (
                                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                                        Pendente Aprovação
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-xl font-bold text-red-900">
                                    {formatCurrency(selectedOrcamento.lateFee)}
                                  </div>
                                </div>
                              )}
                          </CardContent>
                        </Card>

                        {/* Itens do Orçamento */}
                        {selectedOrcamento.items &&
                          selectedOrcamento.items.length > 0 && (
                            <Card className="border-l-4 border-l-purple-500">
                              <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <Package className="w-5 h-5 text-purple-600" />
                                  Equipamentos Solicitados
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                {selectedOrcamento.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                                  >
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <div className="font-semibold text-gray-900">
                                          {item.equipment.name}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                          Quantidade: {item.quantity} -{' '}
                                          {item.days} dia(s)
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="font-semibold text-green-600">
                                          {formatCurrency(item.total)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          {formatCurrency(item.pricePerDay)}/dia
                                        </div>
                                      </div>
                                    </div>
                                    {item.startDate && item.endDate && (
                                      <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                                        Período: {formatDate(item.startDate)}{' '}
                                        até {formatDate(item.endDate)}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          )}
                      </div>
                    )}
                  </Dialog.BodyContent>
                </Dialog.BodyViewport>
              </Dialog.Body>

              <Dialog.Footer>
                <div className="flex gap-3 w-full">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedOrcamento(null)}
                    className="flex-1"
                  >
                    Fechar
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={async () => {
                      if (!selectedOrcamento) return
                      try {
                        const response = await fetch(
                          `/api/quotes/${selectedOrcamento.id}/download`
                        )
                        if (response.ok) {
                          const blob = await response.blob()
                          const url = window.URL.createObjectURL(blob)
                          const a = document.createElement('a')
                          a.href = url
                          a.download = `orcamento-${selectedOrcamento.id}.pdf`
                          document.body.appendChild(a)
                          a.click()
                          window.URL.revokeObjectURL(url)
                          document.body.removeChild(a)
                          toast.success('Download iniciado!', {
                            description: 'PDF do orçamento sendo baixado.',
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
                          description: 'Erro ao baixar PDF do orçamento.',
                        })
                      }
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar PDF
                  </Button>
                </div>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
