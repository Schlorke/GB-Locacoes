import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Obter contas a receber e métricas financeiras
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const status = searchParams.get('status')

    const where: {
      dueDate?: { gte?: Date; lte?: Date }
      status?: { in: string[] } | string
    } = {}
    if (startDate || endDate) {
      where.dueDate = {}
      if (startDate) where.dueDate.gte = new Date(startDate)
      if (endDate) where.dueDate.lte = new Date(endDate)
    }
    if (status) {
      where.status =
        status === 'PENDING' || status === 'OVERDUE' ? { in: [status] } : status
    }

    // Contas a receber
    const receivables = await prisma.payment.findMany({
      where: {
        ...where,
        status: {
          in: ['PENDING', 'OVERDUE'],
        },
      },
      include: {
        rental: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        quote: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    })

    // Métricas financeiras
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfYear = new Date(now.getFullYear(), 0, 1)

    const [
      totalReceivables,
      overdueAmount,
      monthlyRevenue,
      yearlyRevenue,
      paymentsByStatus,
      paymentsByMethod,
    ] = await Promise.all([
      // Total a receber
      prisma.payment.aggregate({
        where: {
          status: {
            in: ['PENDING', 'OVERDUE'],
          },
        },
        _sum: {
          amount: true,
        },
      }),

      // Valor em atraso
      prisma.payment.aggregate({
        where: {
          status: 'OVERDUE',
        },
        _sum: {
          amount: true,
        },
      }),

      // Receita do mês
      prisma.payment.aggregate({
        where: {
          status: 'PAID',
          paidAt: {
            gte: startOfMonth,
          },
        },
        _sum: {
          amount: true,
        },
      }),

      // Receita do ano
      prisma.payment.aggregate({
        where: {
          status: 'PAID',
          paidAt: {
            gte: startOfYear,
          },
        },
        _sum: {
          amount: true,
        },
      }),

      // Pagamentos por status
      prisma.payment.groupBy({
        by: ['status'],
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      }),

      // Pagamentos por método
      prisma.payment.groupBy({
        by: ['method'],
        where: {
          status: 'PAID',
        },
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      }),
    ])

    return NextResponse.json({
      receivables,
      metrics: {
        totalReceivables: totalReceivables._sum.amount || 0,
        overdueAmount: overdueAmount._sum.amount || 0,
        monthlyRevenue: monthlyRevenue._sum.amount || 0,
        yearlyRevenue: yearlyRevenue._sum.amount || 0,
        paymentsByStatus,
        paymentsByMethod,
      },
    })
  } catch (error) {
    console.error('Error fetching financial data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
