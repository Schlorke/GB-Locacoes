import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { createZapSignDocument } from '@/lib/zapsign'

const SignContractSchema = z.object({
  contractId: z.string(),
  signerEmail: z.string().email(),
  signerName: z.string(),
})

// POST - Enviar contrato para assinatura via ZapSign
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = SignContractSchema.parse(body)

    // Buscar contrato
    const contract = await prisma.contract.findUnique({
      where: { id: validatedData.contractId },
      include: {
        rental: {
          include: {
            users: true,
          },
        },
      },
    })

    if (!contract) {
      return NextResponse.json(
        { error: 'Contrato não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se usuário tem permissão
    if (
      session.user.role !== 'ADMIN' &&
      contract.rental.userid !== session.user.id
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Enviar para ZapSign
    try {
      const zapSignDocument = await createZapSignDocument({
        name: `Contrato de Locação - ${contract.rental.id}`,
        content: contract.content || '',
        signers: [
          {
            email: validatedData.signerEmail,
            name: validatedData.signerName,
            action: 'SIGN',
          },
        ],
      })

      // Atualizar contrato com ID do ZapSign
      const updatedContract = await prisma.contract.update({
        where: { id: validatedData.contractId },
        data: {
          zapSignId: zapSignDocument.id,
          status: 'SENT',
        },
      })

      return NextResponse.json({
        contract: updatedContract,
        zapSignDocument,
      })
    } catch (zapSignError) {
      console.error('ZapSign error:', zapSignError)
      // Se ZapSign falhar, apenas atualizar status
      const updatedContract = await prisma.contract.update({
        where: { id: validatedData.contractId },
        data: {
          status: 'SENT',
        },
      })

      return NextResponse.json({
        contract: updatedContract,
        warning: 'Contrato criado, mas não foi possível enviar para ZapSign',
      })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error signing contract:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

