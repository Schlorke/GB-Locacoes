"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Database, ArrowRight, Terminal } from "lucide-react"
import Link from "next/link"

interface SetupResponse {
  status: "success" | "error" | "info"
  message: string
  details?: any
  steps?: string[]
}

export default function SetupDatabasePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<SetupResponse | null>(null)

  const setupDatabase = async () => {
    setIsLoading(true)
    setResponse(null)

    try {
      console.log("🚀 [SETUP-DB] Iniciando setup do banco...")

      const res = await fetch("/api/setup-database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data: SetupResponse = await res.json()
      console.log("📋 [SETUP-DB] Response:", data)

      setResponse(data)
    } catch (error) {
      console.error("💥 [SETUP-DB] Erro:", error)

      setResponse({
        status: "error",
        message: "Erro de conexão com a API",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg">
            <Database className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-blue-800">Setup do Banco de Dados</h1>
            <p className="text-xl text-blue-600 mt-2">Criar tabelas e configurar o banco Supabase</p>
          </div>
        </div>

        {/* Main Setup Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              Configurar Banco de Dados
            </CardTitle>
            <CardDescription>
              Este processo irá criar todas as tabelas necessárias no banco Supabase usando o Prisma.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">O que será executado:</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  <code>npx prisma generate</code> - Gerar cliente Prisma
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <code>npx prisma db push</code> - Criar tabelas no banco
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Verificar se tabelas foram criadas</span>
                </div>
              </div>
            </div>

            <Button onClick={setupDatabase} disabled={isLoading} className="w-full h-12 bg-blue-600 hover:bg-blue-700">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Configurando Banco...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Configurar Banco de Dados
                </div>
              )}
            </Button>

            {response && (
              <Alert variant={getAlertVariant(response.status)} className="shadow-sm">
                {getStatusIcon(response.status)}
                <AlertTitle className="flex items-center gap-2">
                  Status: <Badge variant="outline">{response.status.toUpperCase()}</Badge>
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="font-medium">{response.message}</p>
                  {response.steps && (
                    <div className="mt-3 p-3 bg-white/50 rounded border text-xs">
                      <p className="font-medium mb-2">Passos executados:</p>
                      <ul className="space-y-1 list-disc list-inside">
                        {response.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {response.details && (
                    <div className="mt-3 p-3 bg-red-50 rounded border border-red-200 text-xs">
                      <p className="font-medium mb-2 text-red-800">Detalhes do erro:</p>
                      <pre className="text-red-700 whitespace-pre-wrap">
                        {JSON.stringify(response.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        {response?.status === "success" && (
          <Card className="shadow-lg border-green-200">
            <CardHeader>
              <CardTitle className="text-green-600">🎉 Banco Configurado com Sucesso!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild size="lg" className="h-14 bg-green-600 hover:bg-green-700">
                  <Link href="/setup" className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Criar Usuário Admin
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14">
                  <Link href="/debug" className="flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    Ver Diagnóstico
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>📋 Instruções</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">Configurar Banco</h4>
                  <p>Clique no botão acima para criar as tabelas no banco Supabase.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">Criar Admin</h4>
                  <p>
                    Após o sucesso, vá para <code className="bg-slate-100 px-1 rounded">/setup</code> para criar o
                    usuário admin.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">Fazer Login</h4>
                  <p>
                    Use as credenciais para acessar <code className="bg-slate-100 px-1 rounded">/admin/login</code>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-slate-500 text-sm">
          <p>© 2024 GB Locações - Setup do Banco de Dados</p>
        </div>
      </div>
    </div>
  )
}
