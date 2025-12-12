import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Obter locações do cliente logado
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where: {
      userid: string
      status?: string
    } = {
      userid: session.user.id,
    }
    if (status) where.status = status

    const rentals = await prisma.rentals.findMany({
      where,
      include: {
        rental_items: {
          include: {
            equipments: {
              include: {
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        payments: {
          orderBy: {
            dueDate: 'asc',
          },
        },
        deliveries: {
          orderBy: {
            scheduledAt: 'asc',
          },
        },
        quote: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdat: 'desc',
      },
    })

    return NextResponse.json({ rentals })
  } catch (error) {
    console.error('Error fetching client rentals:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

