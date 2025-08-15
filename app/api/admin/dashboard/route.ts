import { type NextRequest, NextResponse } from 'next/server'
import { requireAdminOrOperator } from '@/middlewares/require-admin'
import { prisma } from '@/lib/prisma'

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

    // Buscar estatísticas gerais
    const [
      totalEquipments,
      totalCategories,
      totalQuotes,
      pendingQuotes,
      approvedQuotes,
      rejectedQuotes,
      completedQuotes,
      totalRevenue,
    ] = await Promise.all([
      prisma.equipment.count(),
      prisma.category.count(),
      prisma.quote.count(),
      prisma.quote.count({ where: { status: 'PENDING' } }),
      prisma.quote.count({ where: { status: 'APPROVED' } }),
      prisma.quote.count({ where: { status: 'REJECTED' } }),
      prisma.quote.count({ where: { status: 'COMPLETED' } }),
      prisma.quote.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { total: true },
      }),
    ])

    const stats = {
      totalEquipments,
      availableEquipments: totalEquipments, // Por enquanto consideramos todos disponíveis
      totalCategories,
      totalQuotes,
      pendingQuotes,
      approvedQuotes,
      rejectedQuotes,
      completedQuotes,
      totalRevenue: totalRevenue._sum.total || 0,
      monthlyRevenue: 0, // Pode ser calculado se necessário
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
