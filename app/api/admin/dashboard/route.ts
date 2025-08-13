import { type NextRequest, NextResponse } from 'next/server'

// FIX: Dynamic imports to avoid Prisma initialization at build time
// This prevents the "@prisma/client did not initialize yet" error during 
// Vercel's "Collecting page data" phase with Next.js 15 + Prisma 6
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function GET(_request: NextRequest) {
  try {
    // Dynamic imports - only load at runtime, never during build
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const { prisma } = await import('@/lib/prisma')

    const session = await getServerSession(authOptions)

    if (!session?.user || !['ADMIN', 'OPERATOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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