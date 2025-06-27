"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface EnvInfo {
  NODE_ENV: string
  DATABASE_URL_EXISTS: boolean
  DATABASE_URL_LENGTH: number
  DATABASE_URL_PREVIEW: string
  POSTGRES_PRISMA_URL_EXISTS: boolean
  DIRECT_URL_EXISTS: boolean
  DIRECT_URL_LENGTH: number
  DIRECT_URL_PREVIEW: string
  NEXTAUTH_SECRET_EXISTS: boolean
  NEXTAUTH_URL: string
  BLOB_READ_WRITE_TOKEN_EXISTS: boolean
  INTEGRATIONS_STATUS: {
    supabase: boolean
    vercel_blob: boolean
    nextauth: boolean
  }
  MAIN_ENV_KEYS: string[]
}

export default function EnvironmentVariablesDisplay() {
  const [envData, setEnvData] = useState<EnvInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEnvData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/debug/env")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setEnvData(data.data)
      } catch (e) {
        setError(`Falha ao carregar variáveis de ambiente: ${e.message}`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchEnvData()
  }, [])

  const handleDownloadReport = () => {
    if (!envData) return

    let reportContent = `Relatório de Variáveis de Ambiente - GB Locações\n\n`
    reportContent += `Status Geral:\n`
    reportContent += `NODE_ENV: ${envData.NODE_ENV}\n\n`

    reportContent += `Status das Integrações:\n`
    Object.entries(envData.INTEGRATIONS_STATUS).forEach(([key, value]) => {
      reportContent += `${key.toUpperCase()}: ${value ? "Ativo" : "Inativo"}\n`
    })
    reportContent += `\n`

    reportContent += `Detalhes das Variáveis:\n`
    const variables = [
      {
        name: "DATABASE_URL",
        exists: envData.DATABASE_URL_EXISTS,
        value: envData.DATABASE_URL_PREVIEW,
        length: envData.DATABASE_URL_LENGTH,
      },
      {
        name: "POSTGRES_PRISMA_URL",
        exists: envData.POSTGRES_PRISMA_URL_EXISTS,
        value: envData.POSTGRES_PRISMA_URL_EXISTS ? "Configurado" : "Não encontrado",
      },
      {
        name: "DIRECT_URL",
        exists: envData.DIRECT_URL_EXISTS,
        value: envData.DIRECT_URL_PREVIEW,
        length: envData.DIRECT_URL_LENGTH,
      },
      {
        name: "NEXTAUTH_SECRET",
        exists: envData.NEXTAUTH_SECRET_EXISTS,
        value: envData.NEXTAUTH_SECRET_EXISTS ? "Configurado" : "Não encontrado",
      },
      { name: "NEXTAUTH_URL", exists: !!envData.NEXTAUTH_URL, value: envData.NEXTAUTH_URL },
      {
        name: "BLOB_READ_WRITE_TOKEN",
        exists: envData.BLOB_READ_WRITE_TOKEN_EXISTS,
        value: envData.BLOB_READ_WRITE_TOKEN_EXISTS ? "Configurado" : "Não encontrado",
      },
    ]

    variables.forEach((v) => {
      reportContent += `${v.name}:\t${v.exists ? "Configurado" : "Não Configurado"}\t${v.value || ""}${v.length ? ` (Length: ${v.length})` : ""}\n`
    })
    reportContent += `\n`

    reportContent += `Chaves de Variáveis Principais:\n`
    reportContent += envData.MAIN_ENV_KEYS.join(", ") + "\n"

    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "relatorio_variaveis_ambiente.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Variáveis de Ambiente</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Carregando variáveis...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Erro ao Carregar Variáveis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Variáveis de Ambiente</CardTitle>
        <Button onClick={handleDownloadReport} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download Relatório
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Status das variáveis de ambiente configuradas no projeto.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Status Geral:</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">NODE_ENV: {envData?.NODE_ENV}</Badge>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Status das Integrações:</h3>
            <div className="flex flex-wrap gap-2">
              {envData &&
                Object.entries(envData.INTEGRATIONS_STATUS).map(([key, value]) => (
                  <Badge
                    key={key}
                    variant={value ? "default" : "outline"}
                    className={value ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}
                  >
                    {value ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                    {key.toUpperCase()}: {value ? "Ativo" : "Inativo"}
                  </Badge>
                ))}
            </div>
          </div>
        </div>

        <div>
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
                <TableCell>
                  <Badge variant={envData?.DATABASE_URL_EXISTS ? "default" : "destructive"}>
                    {envData?.DATABASE_URL_EXISTS ? "Configurado" : "Não Configurado"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {envData?.DATABASE_URL_PREVIEW}
                  {envData?.DATABASE_URL_EXISTS && ` (Length: ${envData.DATABASE_URL_LENGTH})`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">POSTGRES_PRISMA_URL</TableCell>
                <TableCell>
                  <Badge variant={envData?.POSTGRES_PRISMA_URL_EXISTS ? "default" : "destructive"}>
                    {envData?.POSTGRES_PRISMA_URL_EXISTS ? "Configurado" : "Não Configurado"}
                  </Badge>
                </TableCell>
                <TableCell>{envData?.POSTGRES_PRISMA_URL_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">DIRECT_URL</TableCell>
                <TableCell>
                  <Badge variant={envData?.DIRECT_URL_EXISTS ? "default" : "destructive"}>
                    {envData?.DIRECT_URL_EXISTS ? "Configurado" : "Não Configurado"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {envData?.DIRECT_URL_PREVIEW}
                  {envData?.DIRECT_URL_EXISTS && ` (Length: ${envData.DIRECT_URL_LENGTH})`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">NEXTAUTH_SECRET</TableCell>
                <TableCell>
                  <Badge variant={envData?.NEXTAUTH_SECRET_EXISTS ? "default" : "destructive"}>
                    {envData?.NEXTAUTH_SECRET_EXISTS ? "Configurado" : "Não Configurado"}
                  </Badge>
                </TableCell>
                <TableCell>{envData?.NEXTAUTH_SECRET_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">NEXTAUTH_URL</TableCell>
                <TableCell>
                  <Badge variant={!!envData?.NEXTAUTH_URL ? "default" : "destructive"}>
                    {!!envData?.NEXTAUTH_URL ? "Configurado" : "Não Configurado"}
                  </Badge>
                </TableCell>
                <TableCell>{envData?.NEXTAUTH_URL || "Not found"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">BLOB_READ_WRITE_TOKEN</TableCell>
                <TableCell>
                  <Badge variant={envData?.BLOB_READ_WRITE_TOKEN_EXISTS ? "default" : "destructive"}>
                    {envData?.BLOB_READ_WRITE_TOKEN_EXISTS ? "Configurado" : "Não Configurado"}
                  </Badge>
                </TableCell>
                <TableCell>{envData?.BLOB_READ_WRITE_TOKEN_EXISTS ? "Configurado" : "Não encontrado"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Chaves de Variáveis Principais:</h3>
          <div className="flex flex-wrap gap-2">
            {envData?.MAIN_ENV_KEYS.map((key) => (
              <Badge key={key} variant="secondary">
                {key}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
