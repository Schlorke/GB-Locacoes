import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { rentals, User, rental_items, Equipment } from '@prisma/client'

const COMPANY_ADDRESS =
  'Rua Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre - RS, Brasil'

type RentalWithRelations = rentals & {
  users: User | null
  rental_items: Array<
    rental_items & {
      equipments: Equipment | null
    }
  >
}

function buildContractContent(rental: RentalWithRelations) {
  const customerName =
    rental?.users?.name || rental?.users?.email || 'Cliente não informado'
  const customerEmail = rental?.users?.email || 'Sem e-mail'
  const customerPhone = rental?.users?.phone || 'Sem telefone'
  const rentalPeriod = `${new Date(rental.startdate).toLocaleDateString(
    'pt-BR'
  )} até ${new Date(rental.enddate).toLocaleDateString('pt-BR')}`
  const items =
    rental?.rental_items?.map(
      (item: rental_items & { equipments: Equipment | null }) =>
        `- ${item.equipments?.name || 'Equipamento'} | Qtde: ${
          item.quantity
        } | Dias: ${item.totaldays} | Valor: R$ ${Number(
          item.totalprice
        ).toFixed(2)}`
    ) || []

  return `
    CONTRATO DE LOCAÇÃO DE EQUIPAMENTOS
    ------------------------------------------------------------------
    Locador: GB Locações
    Endereço: ${COMPANY_ADDRESS}

    Locatário: ${customerName}
    E-mail: ${customerEmail}
    Telefone: ${customerPhone}

    Período de locação: ${rentalPeriod}
    Valor total: R$ ${Number(rental.total || 0).toFixed(2)}

    Equipamentos:
    ${items.join('\n')}

    Condições principais:
    - Uso adequado e devolução em perfeito estado.
    - Multa por atraso conforme tabela vigente.
    - Responsabilidade por danos, perdas ou mau uso.
    - Checklists de saída e entrada com fotos para validação.
    - Garantia/caução conforme política do locador.

    Declaro que li e aceito os termos deste contrato.
  `.trim()
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const rental = await prisma.rentals.findUnique({
      where: { id },
      include: {
        users: true,
        rental_items: {
          include: {
            equipments: true,
          },
        },
      },
    })

    if (!rental) {
      return NextResponse.json({ error: 'Rental not found' }, { status: 404 })
    }

    const content = buildContractContent(rental)

    const existing = await prisma.contract.findUnique({
      where: { rentalId: id },
    })

    const contract = existing
      ? await prisma.contract.update({
          where: { rentalId: id },
          data: {
            template: 'default-v1',
            content,
            status: 'SENT',
          },
        })
      : await prisma.contract.create({
          data: {
            rentalId: id,
            template: 'default-v1',
            content,
            status: 'SENT',
          },
        })

    return NextResponse.json({ contract })
  } catch (error) {
    console.error('Error generating contract:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const contract = await prisma.contract.findUnique({
      where: { rentalId: id },
    })

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    return NextResponse.json({ contract })
  } catch (error) {
    console.error('Error fetching contract:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
