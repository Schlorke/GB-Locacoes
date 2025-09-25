'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FileText,
  Clock,
  ShoppingCart,
  Plus,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/stores/useCartStore'
import { motion } from 'framer-motion'

export default function AreaClientePage() {
  const { data: session } = useSession()
  const { getItemCount, getTotalPrice } = useCartStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section com Identidade Visual Completa */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden">
        {/* Elementos animados de background */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-14 relative z-10">
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
              Bem-vindo de volta,
              <span className="text-yellow-300 relative block mt-1">
                {session?.user?.name || 'Cliente'}!
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-yellow-300/90 rounded-full"></div>
              </span>
            </h1>
            <p className="text-base md:text-lg text-orange-100 leading-relaxed max-w-2xl mx-auto">
              Gerencie seus orçamentos, acompanhe suas locações e tenha controle
              total sobre seus equipamentos
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
      <section className="py-6 md:py-8 relative">
        <div className="px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Stats Grid - 1 coluna em mobile, 4 colunas em desktop */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            
            {/* Card Carrinho - Otimizado */}
            <div className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
              <div className="relative z-10 p-3 md:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Carrinho</p>
                  <p className="text-2xl font-bold text-gray-900">{getItemCount()}</p>
                  <p className="text-xs text-gray-500">itens selecionados</p>
                </div>
              </div>
            </div>

            {/* Card Orçamentos - Otimizado */}
            <div className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
              <div className="relative z-10 p-3 md:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Orçamentos</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500">solicitações</p>
                </div>
              </div>
            </div>

            {/* Card Total - Otimizado */}
            <div className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50"></div>
              <div className="relative z-10 p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Estimado</p>
                    <p className="text-3xl md:text-4xl font-bold text-green-600">R$ {getTotalPrice().toFixed(2)}</p>
                    <p className="text-xs text-gray-500">no carrinho</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Seções Principais - Layout Otimizado */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            
            {/* Meu Carrinho - Compacto */}
            <Card className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-2 md:pb-3">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  Meu Carrinho
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                {getItemCount() > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4">
                      <p className="text-sm text-gray-600">
                        Total estimado:{' '}
                        <span className="font-bold text-2xl text-orange-600">
                          R$ {getTotalPrice().toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href="/orcamento" className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg  transition-all duration-300 shadow-lg hover:shadow-xl">
                          Ver Carrinho
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                      <Link href="/equipamentos">
                        <Button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 hover:text-orange-600 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Mais
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href="/equipamentos" className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg  transition-all duration-300 shadow-lg hover:shadow-xl">
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Equipamentos
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Meus Orçamentos - Compacto */}
            <Card className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-2 md:pb-3">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  Meus Orçamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                <div className="text-center py-6">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">Nenhum orçamento encontrado</p>
                  <Link href="/orcamento">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg  transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Plus className="h-4 w-4 mr-2" />
                      Solicitar Orçamento
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Atividade Recente - Seção Compacta */}
          <motion.div
            className="mt-6 md:mt-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-2 md:pb-3">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  Atividade Recente
                </CardTitle>
                <CardDescription>Suas últimas ações na plataforma</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Nenhuma atividade recente</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
