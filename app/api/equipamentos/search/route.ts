import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json([])
    }

    // Buscar equipamentos que contenham o termo de busca no nome ou descrição
    const equipments = await prisma.equipment.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
        available: true, // Apenas equipamentos disponíveis
      },
      select: {
        id: true,
        name: true,
        description: true,
        pricePerDay: true,
        category: {
          select: {
            name: true,
          },
        },
        images: true,
      },
      take: 8, // Limitar a 8 sugestões para performance
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(equipments)
  } catch (error) {
    console.error('Erro na busca de equipamentos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
