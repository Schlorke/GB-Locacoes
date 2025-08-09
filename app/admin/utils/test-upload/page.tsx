'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { useState } from 'react'

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<{
    url?: string
    filename?: string
    size?: number
    success?: boolean
    error?: string
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Erro no upload: ' + String(error) })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>🧪 Teste de Upload - Supabase Storage</CardTitle>
          <CardDescription>
            Teste se o sistema de upload de imagens está funcionando
            corretamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium mb-2"
            >
              Selecionar imagem:
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
          </div>

          {file && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Arquivo selecionado:</strong> {file.name}
              </p>
              <p className="text-sm text-gray-600">
                Tamanho: {(file.size / 1024 / 1024).toFixed(2)} MB | Tipo:{' '}
                {file.type}
              </p>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full"
          >
            {uploading ? 'Fazendo upload...' : 'Testar Upload'}
          </Button>

          {result && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Resultado:</h3>
              <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>

              {result.url && !result.error && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Imagem uploadada:</h4>
                  <Image
                    src={result.url}
                    alt="Upload test"
                    width={400}
                    height={300}
                    className="max-w-full h-auto rounded-lg border"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
