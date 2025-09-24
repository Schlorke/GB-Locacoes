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
import { Badge } from '@/components/ui/badge'
import { User, FileText, Clock, Phone, ShoppingCart, Plus, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/stores/useCartStore'

export default function AreaClientePage() {
  const { data: session } = useSession()
  const { getItemCount, getTotalPrice } = useCartStore()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Bem-vindo, {session?.user?.name || 'Cliente'}!
        </h1>
        <p className="text-orange-100">
          Gerencie seus orçamentos, acompanhe suas locações e muito mais.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Carrinho</p>
                <p className="text-2xl font-bold text-slate-900">{getItemCount()}</p>
                <p className="text-sm text-slate-500">itens selecionados</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Orçamentos</p>
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-sm text-slate-500">solicitações</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Estimado</p>
                <p className="text-2xl font-bold text-slate-900">
                  R$ {getTotalPrice().toFixed(2)}
                </p>
                <p className="text-sm text-slate-500">no carrinho</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Meu Carrinho
            </CardTitle>
            <CardDescription>
              {getItemCount() > 0 
                ? `${getItemCount()} itens selecionados para orçamento`
                : 'Nenhum item no carrinho'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {getItemCount() > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-slate-600">
                  Total estimado: <span className="font-semibold text-lg">R$ {getTotalPrice().toFixed(2)}</span>
                </p>
                <div className="flex gap-2">
                  <Link href="/orcamento" className="flex-1">
                    <Button className="w-full">
                      Ver Carrinho
                    </Button>
                  </Link>
                  <Link href="/equipamentos">
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Mais
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 mb-4">Seu carrinho está vazio</p>
                <Link href="/equipamentos">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Equipamentos
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Meus Orçamentos
            </CardTitle>
            <CardDescription>
              Acompanhe suas solicitações de orçamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 mb-4">Nenhum orçamento encontrado</p>
              <Link href="/orcamento">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Solicitar Orçamento
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Atividade Recente
          </CardTitle>
          <CardDescription>
            Suas últimas ações na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Nenhuma atividade recente</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
