'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, Truck, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface RentalActionsProps {
  rentalId: string
  status: string
  endDate: Date
  hasBoleto?: boolean
  boletoPaymentId?: string
  className?: string
}

export function RentalActions({
  rentalId,
  status,
  endDate,
  hasBoleto,
  boletoPaymentId,
  className,
}: RentalActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [extensionDays, setExtensionDays] = useState(1)
  const [showExtensionDialog, setShowExtensionDialog] = useState(false)
  const [showPickupDialog, setShowPickupDialog] = useState(false)

  const handleRequestExtension = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/client/rentals/${rentalId}/request-extension`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ additionalDays: extensionDays }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erro ao solicitar prorrogação')
      }

      await response.json()
      toast.success('Solicitação de prorrogação enviada!')
      setShowExtensionDialog(false)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao solicitar prorrogação'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleRequestPickup = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/client/rentals/${rentalId}/request-pickup`,
        {
          method: 'POST',
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erro ao solicitar coleta')
      }

      toast.success('Solicitação de coleta enviada!')
      setShowPickupDialog(false)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao solicitar coleta'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleViewBoleto = () => {
    if (boletoPaymentId) {
      router.push(`/area-cliente/pagamentos/${boletoPaymentId}`)
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Botão para ver boleto */}
      {hasBoleto && status === 'PENDING' && (
        <Button variant="outline" className="w-full" onClick={handleViewBoleto}>
          <FileText className="w-4 h-4 mr-2" />
          Ver Boleto
        </Button>
      )}

      {/* Solicitar prorrogação */}
      {status === 'ACTIVE' && new Date() < endDate && (
        <Dialog.Root
          open={showExtensionDialog}
          onOpenChange={setShowExtensionDialog}
        >
          <Dialog.Trigger>
            <Button variant="outline" className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Solicitar Prorrogação
            </Button>
          </Dialog.Trigger>
          <Dialog.Popup>
            <Dialog.Header>
              <Dialog.Title>Solicitar Prorrogação</Dialog.Title>
              <Dialog.Description>
                Informe quantos dias adicionais você precisa
              </Dialog.Description>
            </Dialog.Header>
            <div className="space-y-4">
              <div>
                <Label htmlFor="days">Dias Adicionais</Label>
                <Input
                  id="days"
                  type="number"
                  min="1"
                  value={extensionDays}
                  onChange={(e) =>
                    setExtensionDays(parseInt(e.target.value) || 1)
                  }
                />
              </div>
              <Button
                onClick={handleRequestExtension}
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {loading ? 'Enviando...' : 'Solicitar Prorrogação'}
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Root>
      )}

      {/* Solicitar coleta */}
      {status === 'ACTIVE' && (
        <Dialog.Root open={showPickupDialog} onOpenChange={setShowPickupDialog}>
          <Dialog.Trigger>
            <Button variant="outline" className="w-full">
              <Truck className="w-4 h-4 mr-2" />
              Solicitar Coleta
            </Button>
          </Dialog.Trigger>
          <Dialog.Popup>
            <Dialog.Header>
              <Dialog.Title>Solicitar Coleta</Dialog.Title>
              <Dialog.Description>
                Solicite a coleta do equipamento no endereço da obra
              </Dialog.Description>
            </Dialog.Header>
            <Button
              onClick={handleRequestPickup}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              {loading ? 'Enviando...' : 'Confirmar Solicitação'}
            </Button>
          </Dialog.Popup>
        </Dialog.Root>
      )}
    </div>
  )
}
