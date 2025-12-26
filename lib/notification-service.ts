import { prisma } from '@/lib/prisma'
import { NotificationType, NotificationPriority, Prisma } from '@prisma/client'

/**
 * Serviço central para criação e gerenciamento de notificações
 * Use este serviço para criar notificações a partir de eventos do sistema
 */

export interface CreateNotificationInput {
  userId: string
  type: NotificationType
  title: string
  message: string
  priority?: NotificationPriority
  actionUrl?: string
  metadata?: Record<string, unknown>
}

/* eslint-disable no-unused-vars */
export interface NotificationService {
  create: (input: CreateNotificationInput) => Promise<{ id: string }>
  createMany: (inputs: CreateNotificationInput[]) => Promise<{ count: number }>
  markAsRead: (notificationId: string, userId: string) => Promise<boolean>
  markAllAsRead: (userId: string) => Promise<number>
  delete: (notificationId: string, userId: string) => Promise<boolean>
  getUnreadCount: (userId: string) => Promise<number>
}
/* eslint-enable no-unused-vars */

/**
 * Cria uma nova notificação para um usuário
 */
export async function createNotification(input: CreateNotificationInput) {
  const notification = await prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      priority: input.priority || NotificationPriority.MEDIUM,
      actionUrl: input.actionUrl,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    },
  })

  return { id: notification.id }
}

/**
 * Cria múltiplas notificações de uma vez
 */
export async function createManyNotifications(
  inputs: CreateNotificationInput[]
) {
  const result = await prisma.notification.createMany({
    data: inputs.map((input) => ({
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      priority: input.priority || NotificationPriority.MEDIUM,
      actionUrl: input.actionUrl,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    })),
  })

  return { count: result.count }
}

/**
 * Marca uma notificação como lida
 */
export async function markNotificationAsRead(
  notificationId: string,
  userId: string
) {
  const result = await prisma.notification.updateMany({
    where: {
      id: notificationId,
      userId,
    },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  })

  return result.count > 0
}

/**
 * Marca todas as notificações de um usuário como lidas
 */
export async function markAllNotificationsAsRead(userId: string) {
  const result = await prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  })

  return result.count
}

/**
 * Deleta uma notificação
 */
export async function deleteNotification(
  notificationId: string,
  userId: string
) {
  const result = await prisma.notification.deleteMany({
    where: {
      id: notificationId,
      userId,
    },
  })

  return result.count > 0
}

/**
 * Retorna a contagem de notificações não lidas
 */
export async function getUnreadNotificationCount(userId: string) {
  return prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  })
}

// ============================================
// Helpers para criar notificações específicas
// ============================================

/**
 * Notificação: Novo orçamento criado
 */
export async function notifyQuoteCreated(
  userId: string,
  quoteId: string,
  equipmentName: string
) {
  return createNotification({
    userId,
    type: NotificationType.QUOTE,
    title: 'Novo Orçamento Criado',
    message: `Seu orçamento para ${equipmentName} foi criado com sucesso!`,
    priority: NotificationPriority.MEDIUM,
    actionUrl: `/area-cliente/orcamentos`,
    metadata: { quoteId },
  })
}

/**
 * Notificação: Orçamento aprovado
 */
export async function notifyQuoteApproved(
  userId: string,
  quoteId: string,
  equipmentName: string
) {
  return createNotification({
    userId,
    type: NotificationType.QUOTE,
    title: 'Orçamento Aprovado!',
    message: `Seu orçamento para ${equipmentName} foi aprovado e está pronto para locação.`,
    priority: NotificationPriority.HIGH,
    actionUrl: `/area-cliente/orcamentos`,
    metadata: { quoteId },
  })
}

/**
 * Notificação: Orçamento rejeitado
 */
export async function notifyQuoteRejected(
  userId: string,
  quoteId: string,
  equipmentName: string,
  reason?: string
) {
  const baseMessage = `Seu orçamento para ${equipmentName} foi rejeitado.`
  const fullMessage = reason ? `${baseMessage}\nMotivo: ${reason}` : baseMessage

  return createNotification({
    userId,
    type: NotificationType.QUOTE,
    title: 'Orçamento Rejeitado',
    message: fullMessage,
    priority: NotificationPriority.MEDIUM,
    actionUrl: `/area-cliente/orcamentos`,
    metadata: { quoteId, reason },
  })
}

/**
 * Notificação: Pagamento confirmado
 */
export async function notifyPaymentReceived(
  userId: string,
  amount: number,
  reference: string
) {
  return createNotification({
    userId,
    type: NotificationType.PAYMENT,
    title: 'Pagamento Confirmado',
    message: `Pagamento de R$ ${amount.toFixed(2)} confirmado com sucesso.`,
    priority: NotificationPriority.HIGH,
    actionUrl: `/area-cliente/historico`,
    metadata: { amount, reference },
  })
}

/**
 * Notificação: Equipamento disponível
 */
export async function notifyEquipmentAvailable(
  userId: string,
  equipmentName: string,
  equipmentSlug?: string
) {
  return createNotification({
    userId,
    type: NotificationType.EQUIPMENT,
    title: 'Equipamento Disponível',
    message: `${equipmentName} está disponível para locação!`,
    priority: NotificationPriority.MEDIUM,
    actionUrl: equipmentSlug
      ? `/equipamentos/${equipmentSlug}`
      : '/equipamentos',
  })
}

/**
 * Notificação: Locação iniciada
 */
export async function notifyRentalStarted(userId: string, rentalId: string) {
  return createNotification({
    userId,
    type: NotificationType.RENTAL,
    title: 'Locação Iniciada',
    message: 'Sua locação foi iniciada. Aproveite!',
    priority: NotificationPriority.HIGH,
    actionUrl: `/area-cliente/historico/${rentalId}`,
    metadata: { rentalId },
  })
}

/**
 * Notificação: Lembrete de devolução
 */
export async function notifyRentalEndingSoon(
  userId: string,
  rentalId: string,
  daysRemaining: number
) {
  return createNotification({
    userId,
    type: NotificationType.RENTAL,
    title: 'Devolução Próxima',
    message: `Sua locação termina em ${daysRemaining} dia(s). Lembre-se de devolver ou solicitar extensão.`,
    priority:
      daysRemaining <= 1
        ? NotificationPriority.HIGH
        : NotificationPriority.MEDIUM,
    actionUrl: `/area-cliente/historico/${rentalId}`,
    metadata: { rentalId, daysRemaining },
  })
}

/**
 * Notificação: Entrega agendada
 */
export async function notifyDeliveryScheduled(
  userId: string,
  rentalId: string,
  date: Date
) {
  return createNotification({
    userId,
    type: NotificationType.DELIVERY,
    title: 'Entrega Agendada',
    message: `Sua entrega está agendada para ${date.toLocaleDateString('pt-BR')}.`,
    priority: NotificationPriority.MEDIUM,
    actionUrl: `/area-cliente/historico/${rentalId}`,
    metadata: { rentalId, date: date.toISOString() },
  })
}

/**
 * Notificação: Entrega realizada
 */
export async function notifyDeliveryCompleted(
  userId: string,
  rentalId: string
) {
  return createNotification({
    userId,
    type: NotificationType.DELIVERY,
    title: 'Entrega Realizada',
    message: 'Os equipamentos foram entregues com sucesso!',
    priority: NotificationPriority.HIGH,
    actionUrl: `/area-cliente/historico/${rentalId}`,
    metadata: { rentalId },
  })
}

/**
 * Notificação: Contrato gerado
 */
export async function notifyContractReady(userId: string, rentalId: string) {
  return createNotification({
    userId,
    type: NotificationType.CONTRACT,
    title: 'Contrato Disponível',
    message: 'Seu contrato de locação está pronto para assinatura.',
    priority: NotificationPriority.HIGH,
    actionUrl: `/area-cliente/historico/${rentalId}`,
    metadata: { rentalId },
  })
}

/**
 * Notificação: Sistema (manutenção, promoções, etc)
 */
export async function notifySystem(
  userId: string,
  title: string,
  message: string,
  actionUrl?: string
) {
  return createNotification({
    userId,
    type: NotificationType.SYSTEM,
    title,
    message,
    priority: NotificationPriority.LOW,
    actionUrl,
  })
}

// Export do serviço completo
export const notificationService: NotificationService = {
  create: createNotification,
  createMany: createManyNotifications,
  markAsRead: markNotificationAsRead,
  markAllAsRead: markAllNotificationsAsRead,
  delete: deleteNotification,
  getUnreadCount: getUnreadNotificationCount,
}
