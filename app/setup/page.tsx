"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Database, CheckCircle, XCircle, Settings, Play, Info } from "lucide-react"
import Link from "next/link"

interface SetupStep {
  step: string
  success: boolean
  message?: string
  error?: string
}

interface SetupResult {
  success: boolean
  message: string
  steps?: SetupStep[]
  stats?: {
    users: number
    categories: number
    equipments: number
  }
  error?: string
}

export default function SetupPage() {
  const [isSettingUp, setIsSettingUp] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [setupResult, setSetupResult] = useState<SetupResult | null>(null)
  const [testResult, setTestResult] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const setupDatabase = async () => {
    setIsSettingUp(true)
    setSetupResult(null)
    setCurrentStep(1)

    try {
      const response = await fetch("/api/setup-database", { method: "POST" })
      const data = await response.json()
      setSetupResult(data)

      if (data.success) {
        setCurrentStep(2)
      }
    } catch (error) {
      setSetupResult({
        success: false,
        message: "Erro ao conectar com a API",
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setIsSettingUp(false)
    }
  }

  const testConnection = async () => {
    setIsTesting(true)
    setTestResult(null)
    setCurrentStep(2)

    try {
      const response = await fetch("/api/test-db")
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        message: "Erro ao conectar com a API de teste",
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setIsTesting(false)
    }
  }

  const getProgressValue = () => {
    if (currentStep === 0) return 0
    if (currentStep === 1) return 50
    if (currentStep === 2) return 100
    return 0
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Settings className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Setup do Sistema</h1>
        </div>
        <p className="text-muted-foreground">Configure o banco de dados e teste a conexão</p>
      </div>

      {/* Informação sobre Prisma */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Nota:</strong> O Prisma Client é gerado automaticamente durante o deploy no Vercel. Se houver
          problemas, verifique se as variáveis de ambiente estão configuradas corretamente.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso do Setup</span>
          <span>{getProgressValue()}%</span>
        </div>
        <Progress value={getProgressValue()} className="w-full" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Passo 1: Setup Banco */}
        <Card className={currentStep >= 1 ? "border-green-200 bg-green-50" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5" />
              1. Setup do Banco
            </CardTitle>
            <CardDescription>Configura tabelas e dados básicos</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={setupDatabase}
              disabled={isSettingUp}
              className="w-full"
              variant={setupResult?.success ? "default" : "outline"}
            >
              {isSettingUp ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : setupResult?.success ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <Database className="h-4 w-4 mr-2" />
              )}
              {isSettingUp ? "Configurando..." : setupResult?.success ? "Concluído" : "Setup Banco"}
            </Button>

            {setupResult && (
              <div className="mt-3">
                <Badge variant={setupResult.success ? "default" : "destructive"}>
                  {setupResult.success ? "SUCESSO" : "ERRO"}
                </Badge>
                <p className="text-sm mt-1">{setupResult.message}</p>

                {setupResult.stats && (
                  <div className="mt-2 p-2 bg-muted rounded text-xs">
                    <div>Users: {setupResult.stats.users}</div>
                    <div>Categorias: {setupResult.stats.categories}</div>
                    <div>Equipamentos: {setupResult.stats.equipments}</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Passo 2: Testar */}
        <Card className={currentStep >= 2 ? "border-purple-200 bg-purple-50" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5" />
              2. Testar Sistema
            </CardTitle>
            <CardDescription>Verifica se tudo está funcionando</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={testConnection}
              disabled={isTesting || !setupResult?.success}
              className="w-full"
              variant={testResult?.success ? "default" : "outline"}
            >
              {isTesting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : testResult?.success ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isTesting ? "Testando..." : testResult?.success ? "Funcionando!" : "Testar"}
            </Button>

            {testResult && (
              <div className="mt-3">
                <Badge variant={testResult.success ? "default" : "destructive"}>
                  {testResult.success ? "SUCESSO" : "ERRO"}
                </Badge>
                <p className="text-sm mt-1">{testResult.message}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resultados Detalhados */}
      {setupResult?.steps && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Passos Executados:</h4>
              <div className="space-y-2">
                {setupResult.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    {step.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="capitalize">{step.step}</span>
                    <Badge variant={step.success ? "default" : "destructive"}>{step.success ? "OK" : "ERRO"}</Badge>
                    {step.message && <span className="text-sm text-muted-foreground">{step.message}</span>}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Próximos Passos */}
      {(setupResult?.success || testResult?.success) && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Sistema configurado com sucesso!</strong> Agora você pode:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <Link href="/admin" className="text-blue-600 hover:underline">
                  Acessar o painel administrativo
                </Link>
              </li>
              <li>
                <Link href="/admin/equipamentos/novo" className="text-blue-600 hover:underline">
                  Criar novos equipamentos
                </Link>
              </li>
              <li>
                <Link href="/admin/categorias" className="text-blue-600 hover:underline">
                  Gerenciar categorias
                </Link>
              </li>
              <li>
                <Link href="/admin/orcamentos" className="text-blue-600 hover:underline">
                  Ver orçamentos
                </Link>
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Instruções para problemas */}
      {setupResult?.success === false && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Problemas no setup?</strong> Verifique:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Se a variável DATABASE_URL está configurada</li>
              <li>Se o banco de dados está acessível</li>
              <li>Se as tabelas foram criadas (rode: npx prisma db push)</li>
              <li>Se o Prisma Client foi gerado (rode: npx prisma generate)</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
