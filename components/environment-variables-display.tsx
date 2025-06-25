"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, CheckCircle, XCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EnvInfo {
  NODE_ENV: string
  DATABASE_URL_EXISTS: boolean
  DATABASE_URL_LENGTH: number
  DATABASE_URL_PREVIEW: string
  POSTGRES_PRISMA_URL_EXISTS: boolean
  DATABASE_URL_UNPOOLED_EXISTS: boolean
  NEON_PROJECT_ID: string
  KV_REST_API_URL_EXISTS: boolean
  KV_REST_API_URL: string
  KV_REST_API_TOKEN_EXISTS: boolean
  KV_REST_API_READ_ONLY_TOKEN_EXISTS: boolean
  UPSTASH_REDIS_REST_TOKEN_EXISTS: boolean
  KV_URL_EXISTS: boolean
  REDIS_URL_EXISTS: boolean
  NEXTAUTH_SECRET_EXISTS: boolean
  NEXTAUTH_URL: string
  BLOB_READ_WRITE_TOKEN_EXISTS: boolean
  STACK_SECRET_SERVER_KEY_EXISTS: boolean
  NEXT_PUBLIC_STACK_PROJECT_ID: string
  INTEGRATIONS_STATUS: {
    neon: boolean
    upstash: boolean
    vercel_blob: boolean
    nextauth: boolean
    stack_auth: boolean
  }
  MAIN_ENV_KEYS: string[]
}

interface ApiResponse {
  status: string
  message: string
  data: EnvInfo
  error?: string
}

export default function EnvironmentVariablesDisplay() {
  const [envData, setEnvData] = useState<EnvInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEnvData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/debug/env")
      const result: ApiResponse = await response.json()

      if (result.status === "success") {
        setEnvData(result.data)
      } else {
        setError(result.error || "Erro desconhecido ao buscar variáveis de ambiente.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEnvData()
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Variáveis de Ambiente</CardTitle>
          <CardDescription>Carregando informações das variáveis de ambiente...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Erro ao Carregar Variáveis de Ambiente</CardTitle>
          <CardDescription>Ocorreu um erro ao tentar buscar as variáveis de ambiente.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
          <Button onClick={fetchEnvData} className="mt-4">
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!envData) {
    return null // Should not happen if error is handled
  }

  const renderStatusBadge = (exists: boolean) => (
    <Badge variant={exists ? "default" : "destructive"}>
      {exists ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
      {exists ? "Configurado" : "Não Configurado"}
    </Badge>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Variáveis de Ambiente
        </CardTitle>
        <CardDescription>Status das variáveis de ambiente configuradas no projeto.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Status Geral:</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">NODE_ENV</TableCell>
                  <TableCell>{envData.NODE_ENV}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Status das Integrações:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(envData.INTEGRATIONS_STATUS).map(([key, value]) => (
                <Badge key={key} variant={value ? "default" : "secondary"}>
                  {value ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                  {key.replace(/_/g, " ").toUpperCase()}: {value ? "Ativo" : "Inativo"}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <h3 className="font-semibold mb-2">Detalhes das Variáveis:</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variável</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valor/Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">DATABASE_URL</TableCell>
              <TableCell>{renderStatusBadge(envData.DATABASE_URL_EXISTS)}</TableCell>
              <TableCell>
                {envData.DATABASE_URL_EXISTS ? (
                  <>
                    <span className="font-mono text-sm">{envData.DATABASE_URL_PREVIEW}</span> (Length:{" "}
                    {envData.DATABASE_URL_LENGTH})
                  </>
                ) : (
                  "Não encontrado"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">POSTGRES_PRISMA_URL</TableCell>
              <TableCell>{renderStatusBadge(envData.POSTGRES_PRISMA_URL_EXISTS)}</TableCell>
              <TableCell>{envData.POSTGRES_PRISMA_URL_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">DATABASE_URL_UNPOOLED</TableCell>
              <TableCell>{renderStatusBadge(envData.DATABASE_URL_UNPOOLED_EXISTS)}</TableCell>
              <TableCell>{envData.DATABASE_URL_UNPOOLED_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">NEON_PROJECT_ID</TableCell>
              <TableCell>{renderStatusBadge(envData.NEON_PROJECT_ID !== "Not found")}</TableCell>
              <TableCell>{envData.NEON_PROJECT_ID}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">KV_REST_API_URL</TableCell>
              <TableCell>{renderStatusBadge(envData.KV_REST_API_URL_EXISTS)}</TableCell>
              <TableCell>{envData.KV_REST_API_URL_EXISTS ? envData.KV_REST_API_URL : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">KV_REST_API_TOKEN</TableCell>
              <TableCell>{renderStatusBadge(envData.KV_REST_API_TOKEN_EXISTS)}</TableCell>
              <TableCell>{envData.KV_REST_API_TOKEN_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">KV_REST_API_READ_ONLY_TOKEN</TableCell>
              <TableCell>{renderStatusBadge(envData.KV_REST_API_READ_ONLY_TOKEN_EXISTS)}</TableCell>
              <TableCell>{envData.KV_REST_API_READ_ONLY_TOKEN_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">UPSTASH_REDIS_REST_TOKEN</TableCell>
              <TableCell>{renderStatusBadge(envData.UPSTASH_REDIS_REST_TOKEN_EXISTS)}</TableCell>
              <TableCell>{envData.UPSTASH_REDIS_REST_TOKEN_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">KV_URL</TableCell>
              <TableCell>{renderStatusBadge(envData.KV_URL_EXISTS)}</TableCell>
              <TableCell>{envData.KV_URL_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">REDIS_URL</TableCell>
              <TableCell>{renderStatusBadge(envData.REDIS_URL_EXISTS)}</TableCell>
              <TableCell>{envData.REDIS_URL_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">NEXTAUTH_SECRET</TableCell>
              <TableCell>{renderStatusBadge(envData.NEXTAUTH_SECRET_EXISTS)}</TableCell>
              <TableCell>{envData.NEXTAUTH_SECRET_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">NEXTAUTH_URL</TableCell>
              <TableCell>{renderStatusBadge(envData.NEXTAUTH_URL !== "Not found")}</TableCell>
              <TableCell>{envData.NEXTAUTH_URL}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BLOB_READ_WRITE_TOKEN</TableCell>
              <TableCell>{renderStatusBadge(envData.BLOB_READ_WRITE_TOKEN_EXISTS)}</TableCell>
              <TableCell>{envData.BLOB_READ_WRITE_TOKEN_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">STACK_SECRET_SERVER_KEY</TableCell>
              <TableCell>{renderStatusBadge(envData.STACK_SECRET_SERVER_KEY_EXISTS)}</TableCell>
              <TableCell>{envData.STACK_SECRET_SERVER_KEY_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">NEXT_PUBLIC_STACK_PROJECT_ID</TableCell>
              <TableCell>{renderStatusBadge(envData.NEXT_PUBLIC_STACK_PROJECT_ID !== "Not found")}</TableCell>
              <TableCell>{envData.NEXT_PUBLIC_STACK_PROJECT_ID}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="font-semibold mb-2">Chaves de Variáveis Principais:</h3>
        <div className="flex flex-wrap gap-2">
          {envData.MAIN_ENV_KEYS.map((key) => (
            <Badge key={key} variant="outline">
              {key}
            </Badge>
          ))}
        </div>
        <Button onClick={fetchEnvData} className="w-full mt-4">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Atualizar Variáveis
        </Button>
      </CardContent>
    </Card>
  )
}
