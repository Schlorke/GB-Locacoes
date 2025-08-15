'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface OpenAPIMethodSpec {
  summary?: string
  description?: string
  tags?: string[]
  parameters?: unknown[]
  responses?: Record<string, unknown>
  requestBody?: unknown
}

interface OpenAPISpec {
  info: {
    title: string
    version: string
    description: string
  }
  paths: Record<string, Record<string, OpenAPIMethodSpec>>
  servers: Array<{
    url: string
    description: string
  }>
}

export default function ApiDocsPage() {
  const [spec, setSpec] = useState<OpenAPISpec | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/openapi.json')
      .then((res) => res.json())
      .then((data) => {
        setSpec(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading OpenAPI spec:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Carregando documentação da API...</div>
      </div>
    )
  }

  if (!spec) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Erro ao carregar a documentação da API
        </div>
      </div>
    )
  }

  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'get':
        return 'bg-green-500'
      case 'post':
        return 'bg-blue-500'
      case 'put':
        return 'bg-yellow-500'
      case 'delete':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{spec.info.title}</h1>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline">Versão {spec.info.version}</Badge>
        </div>
        <p className="text-gray-600 mb-6">{spec.info.description}</p>

        {spec.servers && spec.servers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Servidores</h2>
            {spec.servers.map((server, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded mb-2">
                <code className="text-blue-600">{server.url}</code>
                <span className="text-gray-600 ml-2">
                  - {server.description}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Endpoints</h2>

        {Object.entries(spec.paths).map(([path, methods]) => (
          <Card key={path} className="w-full">
            <CardHeader>
              <CardTitle className="text-lg font-mono">{path}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(methods).map(
                  ([method, details]: [string, OpenAPIMethodSpec]) => (
                    <div
                      key={method}
                      className="border-l-4 border-gray-200 pl-4"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          className={`${getMethodColor(method)} text-white`}
                        >
                          {method.toUpperCase()}
                        </Badge>
                        <span className="font-semibold">
                          {details.summary || 'Sem descrição'}
                        </span>
                      </div>

                      {details.description && (
                        <p className="text-gray-600 mb-2">
                          {details.description}
                        </p>
                      )}

                      {details.tags && details.tags.length > 0 && (
                        <div className="flex gap-1 mb-2">
                          {details.tags.map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const url = `${spec.servers?.[0]?.url || ''}${path}`
                            navigator.clipboard.writeText(url)
                          }}
                        >
                          Copiar URL
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
