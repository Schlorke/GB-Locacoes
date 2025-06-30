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
    <>
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-var(--header-height))] px-6 py-[var(--header-height)] bg-gradient-to-br from-slate-50 to-slate-100">
        <Card className="w-full max-w-md max-h-[calc(100vh-var(--header-height))] overflow-y-auto shadow-2xl border-0">

        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg">
            <span className="text-2xl font-bold">GB</span>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-slate-800">Painel Administrativo</CardTitle>
            <CardDescription className="text-slate-600 mt-2">
              Acesse com suas credenciais de administrador
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent
          className="max-h-[calc(100vh-var(--header-height))] pt-[var(--header-height)] pb-[var(--header-height)] px-6 flex flex-col justify-center items-center space-y-6 overflow-y-auto"
        >

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-red-800">Erro de Login</AlertTitle>
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
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
                className="h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
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
                  className="h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
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
              className="w-full h-12 bg-slate-700 hover:bg-slate-800 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Entrando...
                </div>
              ) : (
                "Entrar no Painel"
              )}
            </Button>
          </form>

          <div className="text-center space-y-4">
            <div className="text-sm text-slate-500">
              <p>Credenciais padrão para teste:</p>
              <p className="font-mono text-xs bg-slate-100 p-2 rounded mt-1">admin@gblocacoes.com.br / admin123</p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-400">© 2024 GB Locações - Sistema Administrativo</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  )
}
