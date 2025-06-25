"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Adicionamos um pequeno timeout para garantir que a sessão seja carregada corretamente
    const redirectTimer = setTimeout(() => {
      if (status === "authenticated" && session) {
        router.push("/admin/dashboard")
      } else if (status === "unauthenticated") {
        router.push("/admin/login")
      }
      // Não redirecionamos se status === "loading"
    }, 300)

    return () => clearTimeout(redirectTimer)
  }, [session, status, router])

  // Mostrar estado de carregamento enquanto redireciona
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700 mx-auto"></div>
        <p className="mt-4 text-slate-600 font-medium">Redirecionando...</p>
      </div>
    </div>
  )
}
