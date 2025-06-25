"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Database, CheckCircle, XCircle, RefreshCw } from "lucide-react"

interface TestResult {
  success: boolean
  message: string
  stats?: {
    equipments: number
    categories: number
    quotes: number
  }
  sampleData?: {
    categories: Array<{ id: string; name: string; icon: string }>
    equipments: Array<{ id: string; name: string; price: number; category: string }>
  }
  error?: string
  details?: string
}

export default function DebugPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)

  const testDatabase = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-db")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: "Erro ao conectar com a API de teste",
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testEquipmentsAPI = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/equipments?page=1&limit=5")
      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: `API de equipamentos funcionando! ${data.equipments?.length || 0} equipamentos encontrados.`,
          stats: {
            equipments: data.pagination?.totalItems || 0,
            categories: 0,
            quotes: 0,
          },
        })
      } else {
        setResult({
          success: false,
          message: "Erro na API de equipamentos",
          error: data.error || "Erro desconhecido",
          details: data.details,
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Erro ao testar API de equipamentos",
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Database className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Debug do Sistema</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Teste de Banco de Dados
            </CardTitle>
            <CardDescription>Verifica a conexão e integridade do banco de dados</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={testDatabase} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Testar Banco de Dados
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Teste API Equipamentos
            </CardTitle>
            <CardDescription>Testa especificamente a API que estava com erro 500</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={testEquipmentsAPI} disabled={isLoading} className="w-full" variant="outline">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Testar API Equipamentos
            </Button>
          </CardContent>
        </Card>
      </div>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              Resultado do Teste
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={result.success ? "default" : "destructive"}>{result.success ? "SUCESSO" : "ERRO"}</Badge>
              <span>{result.message}</span>
            </div>

            {result.stats && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">{result.stats.equipments}</div>
                  <div className="text-sm text-muted-foreground">Equipamentos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{result.stats.categories}</div>
                  <div className="text-sm text-muted-foreground">Categorias</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{result.stats.quotes}</div>
                  <div className="text-sm text-muted-foreground">Orçamentos</div>
                </div>
              </div>
            )}

            {result.sampleData && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Categorias de Exemplo:</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.sampleData.categories.map((cat) => (
                      <Badge key={cat.id} variant="outline">
                        {cat.icon} {cat.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Equipamentos de Exemplo:</h4>
                  <div className="space-y-2">
                    {result.sampleData.equipments.map((eq) => (
                      <div key={eq.id} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span>{eq.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{eq.category}</Badge>
                          <span className="font-mono">R$ {eq.price}/dia</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {result.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Detalhes do Erro:</h4>
                <p className="text-red-700 mb-2">{result.error}</p>
                {result.details && (
                  <pre className="text-xs text-red-600 bg-red-100 p-2 rounded overflow-x-auto">{result.details}</pre>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
