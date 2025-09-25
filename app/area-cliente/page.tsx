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
      {/* Hero Section Otimizado */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white py-12 md:py-16">
        {/* Elementos animados de background */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <div className="absolute top-10 left-5 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-5 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Container com padding otimizado */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Bem-vindo de volta,
              <span className="text-yellow-300 block">{session?.user?.name || 'Cliente'}!</span>
            </h1>
            <p className="text-lg md:text-xl text-orange-100 leading-relaxed max-w-2xl mx-auto">
              Gerencie seus orçamentos, acompanhe suas locações e tenha controle total sobre seus equipamentos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Principal - LAYOUT OTIMIZADO */}
      <section className="py-8 relative">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Stats Grid - 2x2 em mobile, 4x1 em desktop */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            
            {/* Card Carrinho - Otimizado */}
            <div className="col-span-1 relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
              <div className="relative z-10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white group-hover:scale-110 transition-transform">
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
            <div className="col-span-1 relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
              <div className="relative z-10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white group-hover:scale-110 transition-transform">
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

            {/* Card Total - Span 2 colunas em mobile */}
            <div className="col-span-2 md:col-span-2 relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50"></div>
              <div className="relative z-10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Estimado</p>
                    <p className="text-3xl md:text-4xl font-bold text-green-600">R$ {getTotalPrice().toFixed(2)}</p>
                    <p className="text-xs text-gray-500">no carrinho</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Seções Principais - Layout Otimizado */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            
            {/* Meu Carrinho - Compacto */}
            <Card className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-3">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white group-hover:scale-110 transition-transform">
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
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
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
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
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
            <Card className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-3">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white group-hover:scale-110 transition-transform">
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
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
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
            className="mt-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-3">
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
