'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import {
  User,
  FileText,
  Clock,
  Phone,
  Settings,
  Bell,
} from 'lucide-react'

export default function AreaClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

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

  return (
    <div className="min-h-screen bg-slate-50">
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
                    href="/area-cliente/notificacoes"
                    className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
                  >
                    <Bell className="h-4 w-4 mr-3" />
                    Notificações
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
          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
