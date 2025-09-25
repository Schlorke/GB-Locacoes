'use client'

import { useEffect } from 'react'
import {
  useNotifications,
  createNotificationHelpers,
} from './use-notifications'

// Hook para demonstrar o sistema de notificações
export function useNotificationDemo() {
  const { addNotification } = useNotifications()
  const helpers = createNotificationHelpers(addNotification)

  useEffect(() => {
    // Simular algumas notificações de exemplo após 3 segundos
    const timer = setTimeout(() => {
      // Notificação de orçamento aprovado
      helpers.quoteApproved('Betoneira 400L', 'quote-123')

      // Notificação de equipamento disponível
      helpers.equipmentAvailable('Guincho Elétrico 500kg')

      // Notificação de pagamento
      helpers.paymentReceived(1250.0, 'PED-2024-001')

      // Notificação de promoção
      helpers.promotion(
        'Promoção Especial!',
        'Desconto de 20% em equipamentos para aluguel mensal',
        '/equipamentos'
      )
    }, 3000)

    return () => clearTimeout(timer)
  }, [helpers])

  return {
    // Funções para testar notificações manualmente
    testQuoteNotification: () =>
      helpers.newQuote('Escavadeira Hidráulica', 'quote-test'),
    testOrderNotification: () => helpers.newOrder('PED-2024-TEST'),
    testPaymentNotification: () =>
      helpers.paymentReceived(500.0, 'PED-2024-TEST'),
    testEquipmentNotification: () =>
      helpers.equipmentAvailable('Martelo Demolidor'),
    testSystemNotification: () =>
      helpers.systemMaintenance('Sistema será atualizado hoje às 23h'),
  }
}
