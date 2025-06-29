"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { type ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

interface AdminLayoutProps {
  children: ReactNode
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    document.body.classList.add("admin-body-layout")
    return () => {
      document.body.classList.remove("admin-body-layout")
    }
  }, [])

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (status === "loading" || isLoginPage) return

    if (!session) {
      router.push("/admin/login")
      return
    }

    // @ts-ignore
    const userRole = session.user?.role
    if (!["ADMIN", "OPERATOR", "FINANCIAL"].includes(userRole)) {
      router.push("/admin/login?error=unauthorized")
      return
    }
  }, [session, status, router, isLoginPage])

  if (status === "loading") {
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
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0 overflow-x-hidden">
        <AdminHeader />
        <main className="w-full max-w-screen overflow-x-hidden flex-1 overflow-y-auto bg-gray-50">
          <div className="h-full min-h-0 max-h-[100vh] overflow-y-auto">{children}</div>
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
