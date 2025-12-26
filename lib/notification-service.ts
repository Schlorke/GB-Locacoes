import { prisma } from '@/lib/prisma'
import { NotificationType, NotificationPriority, Prisma } from '@prisma/client'

export interface CreateNotificationInput {
  userId: string
  type: NotificationType
  priority?: NotificationPriority
  title: string
  message: string
  actionUrl?: string
  metadata?: Record<string, unknown>
  expiresAt?: Date
}

/**
 * Serviço centralizado para criação de notificações
 */
export class NotificationService {
  /**
   * Cria uma nova notificação no banco de dados
   */
  static async create(input: CreateNotificationInput): Promise<{ id: string }> {
    const notification = await prisma.notification.create({
      data: {
        userId: input.userId,
        type: input.type,
        priority: input.priority || NotificationPriority.MEDIUM,
        title: input.title,
        message: input.message,
        actionUrl: input.actionUrl,
        metadata: (input.metadata || {}) as Prisma.InputJsonValue,
        expiresAt: input.expiresAt,
      },
    })

    return { id: notification.id }
  }

  /**
   * Cria notificação de orçamento criado
   */
  static async createQuoteCreated(
    userId: string,
    quoteId: string,
    equipmentNames: string[]
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.QUOTE_CREATED,
      priority: NotificationPriority.MEDIUM,
      title: 'Orçamento Criado',
      message: `Seu orçamento foi criado com sucesso! ${equipmentNames.length} equipamento(s) incluído(s).`,
      actionUrl: `/area-cliente/orcamentos`,
      metadata: {
        quoteId,
        equipmentCount: equipmentNames.length,
      },
    })
  }

  /**
   * Cria notificação de orçamento aprovado
   */
  static async createQuoteApproved(
    userId: string,
    quoteId: string,
    finalTotal?: number
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.QUOTE_APPROVED,
      priority: NotificationPriority.HIGH,
      title: 'Orçamento Aprovado',
      message: `Seu orçamento foi aprovado e está pronto para locação.${finalTotal ? ` Valor: R$ ${finalTotal.toFixed(2)}` : ''}`,
      actionUrl: `/area-cliente/orcamentos`,
      metadata: {
        quoteId,
        finalTotal,
      },
    })
  }

  /**
   * Cria notificação de orçamento rejeitado
   */
  static async createQuoteRejected(
    userId: string,
    quoteId: string,
    reason?: string
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.QUOTE_REJECTED,
      priority: NotificationPriority.MEDIUM,
      title: 'Orçamento Rejeitado',
      message: `Seu orçamento foi rejeitado.${reason ? ` Motivo: ${reason}` : ''}`,
      actionUrl: `/area-cliente/orcamentos`,
      metadata: {
        quoteId,
        reason,
      },
    })
  }

  /**
   * Cria notificação de locação criada
   */
  static async createRentalCreated(
    userId: string,
    rentalId: string,
    equipmentCount: number
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.RENTAL_CREATED,
      priority: NotificationPriority.HIGH,
      title: 'Locação Iniciada',
      message: `Sua locação foi criada com sucesso! ${equipmentCount} equipamento(s) incluído(s).`,
      actionUrl: `/area-cliente/historico/${rentalId}`,
      metadata: {
        rentalId,
        equipmentCount,
      },
    })
  }

  /**
   * Cria notificação de locação ativada
   */
  static async createRentalActive(
    userId: string,
    rentalId: string
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.RENTAL_ACTIVE,
      priority: NotificationPriority.HIGH,
      title: 'Locação Ativada',
      message: 'Sua locação foi ativada e está em andamento.',
      actionUrl: `/area-cliente/historico/${rentalId}`,
      metadata: {
        rentalId,
      },
    })
  }

  /**
   * Cria notificação de locação concluída
   */
  static async createRentalCompleted(
    userId: string,
    rentalId: string
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.RENTAL_COMPLETED,
      priority: NotificationPriority.MEDIUM,
      title: 'Locação Concluída',
      message: 'Sua locação foi finalizada com sucesso.',
      actionUrl: `/area-cliente/historico/${rentalId}`,
      metadata: {
        rentalId,
      },
    })
  }

  /**
   * Cria notificação de locação atrasada
   */
  static async createRentalOverdue(
    userId: string,
    rentalId: string
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.RENTAL_OVERDUE,
      priority: NotificationPriority.URGENT,
      title: 'Locação Atrasada',
      message:
        'Sua locação está atrasada. Por favor, entre em contato conosco.',
      actionUrl: `/area-cliente/historico/${rentalId}`,
      metadata: {
        rentalId,
      },
    })
  }

  /**
   * Cria notificação de lembrete de devolução
   */
  static async createRentalReturnReminder(
    userId: string,
    rentalId: string,
    daysUntilReturn: number
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.RENTAL_RETURN_REMINDER,
      priority: NotificationPriority.HIGH,
      title: 'Lembrete de Devolução',
      message: `Sua locação vence em ${daysUntilReturn} dia(s). Prepare-se para a devolução.`,
      actionUrl: `/area-cliente/historico/${rentalId}`,
      metadata: {
        rentalId,
        daysUntilReturn,
      },
    })
  }

  /**
   * Cria notificação de pagamento pendente
   */
  static async createPaymentPending(
    userId: string,
    paymentId: string,
    amount: number,
    method: string
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.PAYMENT_PENDING,
      priority: NotificationPriority.HIGH,
      title: 'Pagamento Pendente',
      message: `Pagamento de R$ ${amount.toFixed(2)} via ${method} está pendente.`,
      actionUrl: `/area-cliente/historico`,
      metadata: {
        paymentId,
        amount,
        method,
      },
    })
  }

  /**
   * Cria notificação de pagamento recebido
   */
  static async createPaymentReceived(
    userId: string,
    paymentId: string,
    amount: number,
    method: string
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.PAYMENT_RECEIVED,
      priority: NotificationPriority.HIGH,
      title: 'Pagamento Confirmado',
      message: `Pagamento de R$ ${amount.toFixed(2)} via ${method} foi confirmado com sucesso.`,
      actionUrl: `/area-cliente/historico`,
      metadata: {
        paymentId,
        amount,
        method,
      },
    })
  }

  /**
   * Cria notificação de pagamento vencido
   */
  static async createPaymentOverdue(
    userId: string,
    paymentId: string,
    amount: number
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.PAYMENT_OVERDUE,
      priority: NotificationPriority.URGENT,
      title: 'Pagamento Vencido',
      message: `Seu pagamento de R$ ${amount.toFixed(2)} está vencido. Por favor, regularize.`,
      actionUrl: `/area-cliente/historico`,
      metadata: {
        paymentId,
        amount,
      },
    })
  }

  /**
   * Cria notificação de entrega agendada
   */
  static async createDeliveryScheduled(
    userId: string,
    deliveryId: string,
    scheduledAt: Date
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.DELIVERY_SCHEDULED,
      priority: NotificationPriority.MEDIUM,
      title: 'Entrega Agendada',
      message: `Sua entrega foi agendada para ${scheduledAt.toLocaleDateString('pt-BR')}.`,
      actionUrl: `/area-cliente/historico`,
      metadata: {
        deliveryId,
        scheduledAt: scheduledAt.toISOString(),
      },
    })
  }

  /**
   * Cria notificação de contrato enviado
   */
  static async createContractSent(
    userId: string,
    contractId: string,
    rentalId: string
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.CONTRACT_SENT,
      priority: NotificationPriority.HIGH,
      title: 'Contrato Enviado',
      message:
        'Um contrato foi enviado para assinatura. Por favor, revise e assine.',
      actionUrl: `/area-cliente/historico/${rentalId}`,
      metadata: {
        contractId,
        rentalId,
      },
    })
  }

  /**
   * Cria notificação de contrato assinado
   */
  static async createContractSigned(
    userId: string,
    contractId: string,
    rentalId: string
  ): Promise<{ id: string }> {
    return this.create({
      userId,
      type: NotificationType.CONTRACT_SIGNED,
      priority: NotificationPriority.MEDIUM,
      title: 'Contrato Assinado',
      message: 'Seu contrato foi assinado com sucesso.',
      actionUrl: `/area-cliente/historico/${rentalId}`,
      metadata: {
        contractId,
        rentalId,
      },
    })
  }
}
