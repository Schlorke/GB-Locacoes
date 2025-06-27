"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function SetupSystemPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const setupSystem = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/setup-system")
      const data = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Erro ao configurar sistema")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Configuração do Sistema
            </CardTitle>
            <CardDescription>
              Configure o banco de dados e crie dados iniciais para o sistema de locação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={setupSystem} disabled={loading} className="w-full" size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Configurando Sistema...
                </>
              ) : (
                "Configurar Sistema"
              )}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-semibold">✅ Sistema configurado com sucesso!</p>
                    <div className="text-sm space-y-1">
                      <p>• Tabelas criadas: {result.data?.tablesFound?.length || 0}</p>
                      <p>• Usuário admin: admin@gblocacoes.com</p>
                      <p>• Senha padrão: admin123</p>
                      <p>• Categorias criadas: ✅</p>
                      <p>• Equipamentos exemplo: ✅</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button asChild className="w-full">
                        <a href="/admin/login">Acessar Painel Admin</a>
                      </Button>
                      <Button variant="outline" asChild className="w-full">
                        <a href="/equipamentos">Ver Catálogo Público</a>
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
