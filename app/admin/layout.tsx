'use client'

import AdminMobileHeader from '@/components/admin/admin-mobile-header'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { SessionProvider, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useEffect } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    document.body.classList.add('admin-body-layout')
    return () => {
      document.body.classList.remove('admin-body-layout')
    }
  }, [])

  // Scroll to top sempre que a rota mudar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (status === 'loading' || isLoginPage) return

    if (!session) {
      router.push('/admin/login')
      return
    }

    // Role property is now correctly typed in session type
    const userRole = session.user?.role
    if (!['ADMIN', 'OPERATOR', 'FINANCIAL'].includes(userRole)) {
      router.push('/admin/login?error=unauthorized')
      return
    }
  }, [session, status, router, isLoginPage])

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-slate-600 font-medium text-sm sm:text-base">
            Carregando painel administrativo...
          </p>
        </div>
      </div>
    )
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-50">
      {/* Sidebar Desktop */}
      <AdminSidebar />

      {/* Layout Principal */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        {/* Header Mobile */}
        <AdminMobileHeader />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden max-w-[100vw] pt-16 md:pt-0 bg-gradient-to-br from-slate-50 to-blue-50">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  )
}
