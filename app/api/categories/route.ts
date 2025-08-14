import { NextResponse } from 'next/server'
import { getPrismaClient } from '@/lib/prisma'

// Ensure this route always runs on Node.js with no caching
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function GET() {
  try {
    const prisma = getPrismaClient()

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            equipments: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
