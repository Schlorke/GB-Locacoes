import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateBoletoPDF } from '@/lib/boleto-pdf-generator'

// GET - Gerar/baixar PDF do boleto
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const paramsResolved = await params

    // Buscar pagamento
    const payment = await prisma.payment.findUnique({
      where: { id: paramsResolved.id },
      include: {
        rental: {
          include: {
            users: {
              select: {
                name: true,
                email: true,
                cpf: true,
                cnpj: true,
              },
            },
          },
        },
        quote: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                cpf: true,
                cnpj: true,
              },
            },
          },
        },
      },
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Pagamento não encontrado' },
        { status: 404 }
      )
    }

    if (payment.method !== 'BOLETO') {
      return NextResponse.json(
        { error: 'Este pagamento não é um boleto' },
        { status: 400 }
      )
    }

    // Verificar se usuário tem permissão (admin ou dono do pagamento)
    const isOwner =
      payment.rental?.userid === session.user.id ||
      payment.quote?.userId === session.user.id
    const isAdmin = session.user.role === 'ADMIN'

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Extrair dados do boleto do metadata
    const metadata = payment.metadata as {
      barcode?: string
      digitableLine?: string
      pdfUrl?: string
    } | null

    if (!metadata?.barcode || !metadata?.digitableLine) {
      return NextResponse.json(
        { error: 'Dados do boleto não encontrados' },
        { status: 400 }
      )
    }

    // Gerar PDF do boleto
    const customer = payment.rental?.users || payment.quote?.user
    const pdfBuffer = await generateBoletoPDF({
      barcode: metadata.barcode,
      digitableLine: metadata.digitableLine,
      amount: Number(payment.amount),
      dueDate: payment.dueDate,
      customerName: customer?.name || 'Cliente',
      customerDocument: customer?.cpf || customer?.cnpj || '',
      description: `Pagamento de locação - ${payment.id}`,
    })

    // Retornar PDF
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="boleto-${payment.id}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating boleto PDF:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
