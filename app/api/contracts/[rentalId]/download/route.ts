import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Download de contrato
export async function GET(
  request: NextRequest,
  { params }: { params: { rentalId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Buscar locação e contrato
    const rental = await prisma.rentals.findFirst({
      where: {
        id: params.rentalId,
        userid: session.user.id, // Garantir que é do cliente logado ou admin
      },
      include: {
        contract: true,
      },
    })

    if (!rental) {
      return NextResponse.json(
        { error: 'Locação não encontrada' },
        { status: 404 }
      )
    }

    // Verificar se usuário tem permissão (admin ou dono da locação)
    if (session.user.role !== 'ADMIN' && rental.userid !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Se não existe contrato, gerar um
    if (!rental.contract) {
      // Chamar API de geração de contrato
      const generateResponse = await fetch(
        `${request.nextUrl.origin}/api/contracts/generate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: request.headers.get('cookie') || '',
          },
          body: JSON.stringify({
            rentalId: params.rentalId,
          }),
        }
      )

      if (!generateResponse.ok) {
        return NextResponse.json(
          { error: 'Erro ao gerar contrato' },
          { status: 500 }
        )
      }

      // Buscar contrato gerado
      const updatedRental = await prisma.rentals.findUnique({
        where: { id: params.rentalId },
        include: { contract: true },
      })

      if (!updatedRental?.contract) {
        return NextResponse.json(
          { error: 'Erro ao gerar contrato' },
          { status: 500 }
        )
      }

      // Retornar HTML do contrato como resposta
      if (updatedRental.contract.content) {
        return new NextResponse(updatedRental.contract.content, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Disposition': `attachment; filename="contrato-${params.rentalId}.html"`,
          },
        })
      }
    }

    // Verificar se contrato existe antes de acessar suas propriedades
    const contract = rental.contract
    if (!contract) {
      return NextResponse.json(
        { error: 'Contrato não disponível para download' },
        { status: 404 }
      )
    }

    // Se existe contrato com PDF, redirecionar para o PDF
    if (contract.pdfUrl) {
      return NextResponse.redirect(contract.pdfUrl)
    }

    // Se existe contrato com conteúdo HTML, retornar HTML
    if (contract.content) {
      return new NextResponse(contract.content, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Disposition': `attachment; filename="contrato-${params.rentalId}.html"`,
        },
      })
    }

    return NextResponse.json(
      { error: 'Contrato não disponível para download' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error downloading contract:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
