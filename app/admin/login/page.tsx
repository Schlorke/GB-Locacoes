"use client"

import { useState, type FormEvent, useEffect } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Header from "@/components/header"
import { AlertTriangle, Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)

  // Measure header height to offset the login panel correctly
  useEffect(() => {
    const headerEl = document.querySelector("header")
    if (!headerEl) return

    const updateHeight = () => {
      setHeaderHeight(headerEl.getBoundingClientRect().height)
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession()
      if (session) {
        router.push("/admin/dashboard")
      }
    }
    checkAuth()
  }, [router])

  // Handle URL error parameters
  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      switch (errorParam) {
        case "CredentialsSignin":
          setError("Credenciais inválidas. Verifique seu email e senha.")
          break
        case "unauthorized":
          setError("Usuário não autorizado para acessar o painel administrativo.")
          break
        default:
          setError("Erro ao fazer login. Tente novamente.")
      }
    }
  }, [searchParams])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.")
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError("Credenciais inválidas ou usuário não autorizado.")
      } else if (result?.ok) {
        // Successful login, redirect to dashboard
        router.push("/admin/dashboard")
        router.refresh()
      } else {
        setError("Ocorreu um erro desconhecido. Tente novamente.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Falha ao tentar fazer login. Verifique sua conexão.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <div
        className="flex items-center justify-center px-3 sm:px-4 md:px-6"
        style={{
          minHeight: `calc(100vh - ${headerHeight}px)`,
          paddingTop: `${Math.max(headerHeight + 12, 60)}px`,
        }}
      >
        <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-3 pb-4 px-4 sm:px-6">
            <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg">
              <span className="text-lg sm:text-xl font-bold">GB</span>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
                Painel Administrativo
              </CardTitle>
              <CardDescription className="text-slate-600 text-xs sm:text-sm">
                Acesse com suas credenciais de administrador
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 pb-4 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="text-red-800 text-sm">Erro de Login</AlertTitle>
                  <AlertDescription className="text-red-700 text-xs sm:text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-700 font-medium text-xs sm:text-sm">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@gblocacoes.com.br"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="h-10 sm:h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-sm placeholder:text-slate-400"
                  aria-label="Digite seu e-mail de administrador"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-slate-700 font-medium text-xs sm:text-sm">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-10 sm:h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400 pr-10 text-sm placeholder:text-slate-400"
                    aria-label="Digite sua senha de administrador"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-500" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-10 sm:h-11 bg-slate-700 hover:bg-slate-800 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                disabled={isLoading}
                aria-label="Entrar no Painel Administrativo"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span className="text-sm">Entrando...</span>
                  </div>
                ) : (
                  "Entrar no Painel"
                )}
              </Button>
            </form>

            {/* Seção de informações compacta */}
            <div className="text-center space-y-2 pt-3 border-t border-slate-200">
              <div className="text-xs text-slate-500">
                <p className="font-medium mb-1">Credenciais padrão para teste:</p>
                <div className="font-mono text-xs bg-slate-100 px-2 py-1.5 rounded text-slate-600">
                  <div>admin@gblocacoes.com.br</div>
                  <div>admin123</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 pt-1">© 2024 GB Locações - Sistema Administrativo</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
