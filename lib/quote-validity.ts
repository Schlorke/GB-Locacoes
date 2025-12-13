import { prisma } from '@/lib/prisma'

/**
 * Verifica e atualiza orçamentos expirados
 * Marca orçamentos com validUntil no passado como EXPIRED (se o enum existir) ou mantém como PENDING
 */
export async function checkAndExpireQuotes() {
  try {
    const now = new Date()

    // Buscar orçamentos pendentes com validUntil no passado
    const expiredQuotes = await prisma.quote.findMany({
      where: {
        status: 'PENDING',
        validUntil: {
          lt: now,
        },
      },
    })

    // Atualizar status dos orçamentos expirados
    // Nota: Se o enum QuoteStatus tiver EXPIRED, usar 'EXPIRED', senão manter como PENDING
    // mas adicionar uma nota interna
    for (const quote of expiredQuotes) {
      await prisma.quote.update({
        where: { id: quote.id },
        data: {
          // Como não temos enum EXPIRED, vamos adicionar uma nota interna
          internalNotes: quote.internalNotes
            ? `${quote.internalNotes}\n[EXPIRADO] Orçamento expirado em ${now.toISOString()}`
            : `[EXPIRADO] Orçamento expirado em ${now.toISOString()}`,
          updatedAt: now,
        },
      })
    }

    return {
      expiredCount: expiredQuotes.length,
      expiredIds: expiredQuotes.map((q) => q.id),
    }
  } catch (error) {
    console.error('Error checking and expiring quotes:', error)
    throw error
  }
}

/**
 * Verifica se um orçamento está válido
 */
export function isQuoteValid(quote: {
  validUntil?: Date | null
  status: string
}): boolean {
  if (quote.status !== 'PENDING') {
    return false
  }

  if (!quote.validUntil) {
    return true // Sem validade definida, considera válido
  }

  return new Date() <= quote.validUntil
}
