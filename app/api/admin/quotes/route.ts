import { requireAdminOrOperator } from '@/middlewares/require-admin'
import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação de admin ou operator
    const authResult = await requireAdminOrOperator(request)
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get('page') || '1')
    const limit = Number.parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Parâmetro 'page' inválido." },
        { status: 400 }
      )
    }

    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: "Parâmetro 'limit' inválido." },
        { status: 400 }
      )
    }

    const skip = (page - 1) * limit
    const where: {
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' }
        email?: { contains: string; mode: 'insensitive' }
        phone?: { contains: string; mode: 'insensitive' }
      }>
      status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
    } = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (status && status !== 'all') {
      where.status = status.toUpperCase() as
        | 'PENDING'
        | 'APPROVED'
        | 'REJECTED'
        | 'COMPLETED'
    }

    const quotes = await prisma.quote.findMany({
      where,
      skip,
      take: limit,
      include: {
        items: {
          include: {
            equipment: {
              select: {
                id: true,
                name: true,
                pricePerDay: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const totalItems = await prisma.quote.count({ where })
    const totalPages = Math.ceil(totalItems / limit)

    const [total, pending, approved, rejected, completed] = await Promise.all([
      prisma.quote.count(),
      prisma.quote.count({ where: { status: 'PENDING' } }),
      prisma.quote.count({ where: { status: 'APPROVED' } }),
      prisma.quote.count({ where: { status: 'REJECTED' } }),
      prisma.quote.count({ where: { status: 'COMPLETED' } }),
    ])

    const response = {
      quotes,
      pagination: { page, limit, totalItems, totalPages },
      stats: {
        total,
        pending,
        approved,
        rejected,
        expired: completed,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
