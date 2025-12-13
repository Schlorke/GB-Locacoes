'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Download, Calendar, DollarSign, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { formatDigitableLine } from '@/lib/boleto-validator'
import { cn } from '@/lib/utils'

export interface BoletoDisplayProps {
  barcode: string
  digitableLine: string
  amount: number
  dueDate: Date
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED'
  paymentId: string
  pdfUrl?: string
  instructions?: string[]
  className?: string
}

export function BoletoDisplay({
  barcode,
  digitableLine,
  amount,
  dueDate,
  status,
  paymentId,
  pdfUrl: _pdfUrl,
  instructions,
  className,
}: BoletoDisplayProps) {
  const [copied, setCopied] = useState(false)

  const formattedLine = formatDigitableLine(digitableLine)
  const isOverdue =
    status === 'OVERDUE' || (status === 'PENDING' && new Date() > dueDate)
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  const handleCopyLine = async () => {
    try {
      await navigator.clipboard.writeText(digitableLine.replace(/[\s.-]/g, ''))
      setCopied(true)
      toast.success('Linha digitável copiada!')
      setTimeout(() => setCopied(false), 2000)
    } catch (_error) {
      toast.error('Erro ao copiar linha digitável')
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(`/api/payments/boleto/${paymentId}/pdf`)
      if (!response.ok) throw new Error('Erro ao baixar PDF')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `boleto-${paymentId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('PDF baixado com sucesso!')
    } catch (_error) {
      toast.error('Erro ao baixar PDF do boleto')
    }
  }

  const statusConfig = {
    PENDING: {
      label: 'Pendente',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    PAID: {
      label: 'Pago',
      color: 'bg-green-100 text-green-800 border-green-200',
    },
    OVERDUE: {
      label: 'Vencido',
      color: 'bg-red-100 text-red-800 border-red-200',
    },
    CANCELLED: {
      label: 'Cancelado',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
    },
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Boleto Bancário
          </CardTitle>
          <Badge variant="outline" className={statusConfig[status].color}>
            {statusConfig[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Valor e Vencimento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <DollarSign className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Valor</p>
              <p className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(amount)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Vencimento</p>
              <p className="text-xl font-bold text-gray-900">
                {dueDate.toLocaleDateString('pt-BR')}
              </p>
              {status === 'PENDING' && !isOverdue && (
                <p className="text-xs text-gray-500 mt-1">
                  {daysUntilDue > 0
                    ? `${daysUntilDue} dia(s) restante(s)`
                    : 'Vence hoje'}
                </p>
              )}
              {isOverdue && (
                <p className="text-xs text-red-600 mt-1 font-semibold">
                  Vencido há {Math.abs(daysUntilDue)} dia(s)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Linha Digitável */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Linha Digitável
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-lg font-mono tracking-wider text-gray-900">
                {formattedLine}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLine}
              className="shrink-0"
            >
              <Copy className={cn('w-4 h-4', copied && 'text-green-600')} />
            </Button>
          </div>
        </div>

        {/* Código de Barras */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Código de Barras
          </label>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm font-mono text-gray-600 break-all">
              {barcode}
            </p>
          </div>
        </div>

        {/* Instruções */}
        {instructions && instructions.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Instruções
            </label>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            onClick={handleDownloadPDF}
            className="flex-1 bg-orange-600 hover:bg-orange-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
          {status === 'PENDING' && (
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <p>
                {isOverdue
                  ? 'Boleto vencido. Entre em contato para gerar novo boleto.'
                  : 'Pague até a data de vencimento para evitar multas.'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
