'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { User, FileText, Clock, Phone, Settings, LogOut, ShoppingCart } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useCartStore } from '@/stores/useCartStore'
import { useCartSync } from '@/hooks/use-cart-sync'

export default function AreaClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { getItemCount } = useCartStore()
  const { isSyncing } = useCartSync()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GB</span>
                </div>
                <span className="text-xl font-bold text-slate-800">GB Locações</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/orcamento">
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Carrinho
                  {getItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getItemCount()}
                    </span>
                  )}
                </Button>
              </Link>
              
              <div className="flex items-center space-x-2">
                <div className="text-sm">
                  <p className="font-medium text-slate-800">{session.user?.name || 'Cliente'}</p>
                  <p className="text-slate-500">{session.user?.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-slate-800"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <Link
                    href="/area-cliente"
                    className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Meu Perfil
                  </Link>
                  <Link
                    href="/area-cliente/orcamentos"
                    className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
                  >
                    <FileText className="h-4 w-4 mr-3" />
                    Meus Orçamentos
                  </Link>
                  <Link
                    href="/area-cliente/historico"
                    className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
                  >
                    <Clock className="h-4 w-4 mr-3" />
                    Histórico
                  </Link>
                  <Link
                    href="/area-cliente/enderecos"
                    className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Endereços
                  </Link>
                  <Link
                    href="/contato"
                    className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-3" />
                    Suporte
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
