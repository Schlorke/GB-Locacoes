'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthCallback() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') {
      return
    }

    if (status === 'unauthenticated') {
      router.replace('/login')
      return
    }

    if (session?.user) {
      // Verificar se é admin baseado no email ou role
      const isAdmin =
        session.user?.email === 'admin@gblocacoes.com.br' ||
        session.user?.role === 'ADMIN'

      // Redirecionar baseado no role
      if (isAdmin) {
        router.replace('/admin/dashboard')
      } else {
        router.replace('/area-cliente')
      }
    }
  }, [session, status, router])

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent mx-auto"></div>
        <p className="mt-6 text-slate-700 font-medium text-lg">Entrando...</p>
        <p className="mt-2 text-sm text-slate-500">
          Aguarde enquanto redirecionamos você
        </p>
      </div>
    </div>
  )
}
