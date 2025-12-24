'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function AuthCallback() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Obter callbackUrl dos searchParams
  const callbackUrl = searchParams.get('callbackUrl')

  // Função para redirecionar após login bem-sucedido
  const redirectAfterLogin = useCallback(
    (userEmail: string, userRole?: string) => {
      // Se houver um callbackUrl válido, redirecionar para ele
      if (callbackUrl) {
        const decodedUrl = decodeURIComponent(callbackUrl)
        // Verificar se é uma URL interna válida (não permitir redirecionamento externo)
        if (decodedUrl.startsWith('/') && !decodedUrl.startsWith('//')) {
          router.replace(decodedUrl)
          return
        }
      }

      // Redirecionamento padrão baseado no role
      const isAdmin = userEmail === 'admin@gblocacoes.com.br' || userRole === 'ADMIN'

      if (isAdmin) {
        router.replace('/admin/dashboard')
      } else {
        router.replace('/area-cliente')
      }
    },
    [callbackUrl, router]
  )

  useEffect(() => {
    if (status === 'loading') {
      return
    }

    if (status === 'unauthenticated') {
      router.replace('/login')
      return
    }

    if (session?.user) {
      redirectAfterLogin(
        session.user.email || '',
        session.user.role as string | undefined
      )
    }
  }, [session, status, router, redirectAfterLogin])

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
