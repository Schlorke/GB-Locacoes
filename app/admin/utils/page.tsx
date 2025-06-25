"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, User, RefreshCw } from "lucide-react"

interface ApiResponse {
  status: "success" | "error" | "info"
  message: string
  exists?: boolean
  data?: any
  credentials?: {
    email: string
    password: string
  }
  error?: string
}

export default function AdminUtilsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [adminStatus, setAdminStatus] = useState<ApiResponse | null>(null)

  const createAdmin = async () => {
    setIsLoading(true)
    setResponse(null)

    try {
      const res = await fetch("/api/admin/seed-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data: ApiResponse = await res.json()
      setResponse(data)
    } catch (error) {
      setResponse({
        status: "error",
        message: "Erro de conexão com a API",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const checkAdminStatus = async () => {
    setIsChecking(true)
    setAdminStatus(null)

    try {
      const res = await fetch("/api/admin/seed-admin", {
        method: "GET",
      })

      const data: ApiResponse = await res.json()
      setAdminStatus(data)
    } catch (error) {
      setAdminStatus({
        status: "error",
        message: "Erro de conexão com a API",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsChecking(false)
    }
  }

  const getAlertVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default"
      case "error":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Utilitários do Sistema</h1>
        <p className="text-slate-600 mt-2">Ferramentas para configuração e manutenção do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Admin Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-slate-600" />
              Criar Usuário Admin
            </CardTitle>
            <CardDescription>
              Cria automaticamente um usuário administrador no sistema com credenciais padrão.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium text-slate-800 mb-2">Credenciais que serão criadas:</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Email:</strong> admin@gblocacoes.com.br
                </p>
                <p>
                  <strong>Senha:</strong> admin123
                </p>
                <p>
                  <strong>Nome:</strong> Admin
                </p>
                <p>
                  <strong>Role:</strong> ADMIN
                </p>
              </div>
            </div>

            <Button onClick={createAdmin} disabled={isLoading} className="w-full">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Criando Admin...
                </div>
              ) : (
                "Criar Usuário Admin"
              )}
            </Button>

            {response && (
              <Alert variant={getAlertVariant(response.status)}>
                {getStatusIcon(response.status)}
                <AlertTitle className="flex items-center gap-2">
                  Status: <Badge variant="outline">{response.status.toUpperCase()}</Badge>
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="font-medium">{response.message}</p>
                  {response.data && (
                    <div className="mt-3 p-3 bg-white/50 rounded border text-xs">
                      <pre>{JSON.stringify(response.data, null, 2)}</pre>
                    </div>
                  )}
                  {response.credentials && (
                    <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                      <p className="text-green-800 font-medium">Credenciais de acesso:</p>
                      <p className="text-green-700">Email: {response.credentials.email}</p>
                      <p className="text-green-700">Senha: {response.credentials.password}</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Check Admin Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-slate-600" />
              Verificar Status do Admin
            </CardTitle>
            <CardDescription>Verifica se o usuário administrador já existe no sistema.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={checkAdminStatus} disabled={isChecking} variant="outline" className="w-full">
              {isChecking ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-transparent"></div>
                  Verificando...
                </div>
              ) : (
                "Verificar Status"
              )}
            </Button>

            {adminStatus && (
              <Alert variant={getAlertVariant(adminStatus.status)}>
                {getStatusIcon(adminStatus.status)}
                <AlertTitle className="flex items-center gap-2">
                  Admin {adminStatus.exists ? "Encontrado" : "Não Encontrado"}
                  <Badge variant={adminStatus.exists ? "default" : "destructive"}>
                    {adminStatus.exists ? "EXISTS" : "NOT_FOUND"}
                  </Badge>
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="font-medium">{adminStatus.message}</p>
                  {adminStatus.data && (
                    <div className="mt-3 p-3 bg-white/50 rounded border text-xs">
                      <pre>{JSON.stringify(adminStatus.data, null, 2)}</pre>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Instruções de Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <h4 className="font-medium text-slate-800 mb-2">1. Verificar Status</h4>
              <p>Primeiro, verifique se já existe um usuário admin no sistema.</p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">2. Criar Admin (se necessário)</h4>
              <p>Se não existir, clique em "Criar Usuário Admin" para criar automaticamente.</p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">3. Fazer Login</h4>
              <p>
                Use as credenciais criadas para acessar{" "}
                <a href="/admin/login" className="text-blue-600 hover:underline">
                  /admin/login
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
