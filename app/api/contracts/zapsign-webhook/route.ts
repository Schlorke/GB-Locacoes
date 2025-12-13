import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

/**
 * Webhook para receber notificações do ZapSign quando contrato é assinado
 */
export async function POST(request: NextRequest) {
  try {
    // Validar assinatura do webhook (em produção, implementar validação real)
    const signature = request.headers.get('x-zapsign-signature') || ''
    const webhookSecret = process.env.ZAPSIGN_WEBHOOK_SECRET || ''

    // Validar assinatura do webhook (em produção, implementar validação real)
    if (webhookSecret) {
      const body = await request.text()
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex')

      if (signature !== expectedSignature) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
    }

    const payload = await request.json()

    // Estrutura esperada do webhook do ZapSign
    // Exemplo: { doc_token: string, status: 'SIGNED' | 'PENDING', signed_at: string, pdf_url: string }
    const { doc_token, status, signed_at, pdf_url, signers } = payload

    if (!doc_token) {
      return NextResponse.json(
        { error: 'doc_token is required' },
        { status: 400 }
      )
    }

    // Buscar contrato pelo zapSignId
    const contract = await prisma.contract.findFirst({
      where: {
        zapSignId: doc_token,
      },
      include: {
        rental: {
          include: {
            users: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    // Atualizar status do contrato
    const updateData: {
      status: 'DRAFT' | 'SENT' | 'SIGNED' | 'CANCELLED'
      signedAt?: Date
      signedBy?: string
      pdfUrl?: string
    } = {
      status:
        status === 'SIGNED'
          ? 'SIGNED'
          : contract.status === 'EXPIRED'
            ? 'CANCELLED'
            : contract.status,
    }

    if (status === 'SIGNED') {
      updateData.signedAt = signed_at ? new Date(signed_at) : new Date()
      updateData.pdfUrl = pdf_url
      // Pegar nome do primeiro signatário
      if (signers && signers.length > 0) {
        updateData.signedBy =
          signers[0].name || contract.rental.users.name || null
      }
    }

    await prisma.contract.update({
      where: { id: contract.id },
      data: updateData,
    })

    // Se contrato foi assinado, atualizar status da locação se aplicável
    if (status === 'SIGNED' && contract.rental.status === 'PENDING') {
      await prisma.rentals.update({
        where: { id: contract.rentalId },
        data: {
          status: 'ACTIVE',
        },
      })
    }

    // Em produção, enviar email de confirmação ao cliente
    // await sendContractSignedEmail(contract)

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
    })
  } catch (error) {
    console.error('Error processing ZapSign webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
