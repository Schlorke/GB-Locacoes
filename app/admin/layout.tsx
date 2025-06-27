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

  // Don't redirect if we're on the login page
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (status === "loading" || isLoginPage) return // Still loading or on login page

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

  // Show loading state
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Carregando painel administrativo...</p>
        </div>
      </div>
    )
  }

  // If on login page, render without admin layout
  if (isLoginPage) {
    return <>{children}</>
  }

  // If not authenticated, don't render anything (will redirect)
  if (!session) {
    return null
  }

  // Render admin layout for authenticated users
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="h-full">{children}</div>
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
