'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNotificationDemo } from '@/hooks/use-notification-demo'
import { TestTube } from 'lucide-react'

export function NotificationDemo() {
  const {
    testQuoteNotification,
    testOrderNotification,
    testPaymentNotification,
    testEquipmentNotification,
    testSystemNotification
  } = useNotificationDemo()

  return (
    <Card className="border-dashed border-2 border-orange-200 bg-orange-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <TestTube className="h-5 w-5" />
          Teste de Notificações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-orange-700 mb-4">
          Clique nos botões abaixo para testar diferentes tipos de notificações:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={testQuoteNotification}
            className="text-xs"
          >
            📋 Orçamento
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={testOrderNotification}
            className="text-xs"
          >
            📦 Pedido
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={testPaymentNotification}
            className="text-xs"
          >
            💳 Pagamento
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={testEquipmentNotification}
            className="text-xs"
          >
            🔧 Equipamento
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={testSystemNotification}
            className="text-xs"
          >
            🔔 Sistema
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
