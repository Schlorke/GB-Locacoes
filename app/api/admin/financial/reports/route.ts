import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const ReportQuerySchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  clientId: z.string().optional(),
  categoryId: z.string().optional(),
  format: z.enum(['json', 'pdf', 'excel']).optional().default('json'),
})

// GET - Gerar relatórios financeiros detalhados
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const validatedData = ReportQuerySchema.parse({
      startDate: searchParams.get('startDate'),
      endDate: searchParams.get('endDate'),
      clientId: searchParams.get('clientId'),
      categoryId: searchParams.get('categoryId'),
      format: searchParams.get('format') || 'json',
    })

    const where: {
      paidAt?: { gte?: Date; lte?: Date }
      rental?: {
        userid?: string
        rental_items?: { some?: { equipments?: { categoryId?: string } } }
      }
    } = {}

    if (validatedData.startDate || validatedData.endDate) {
      where.paidAt = {}
      if (validatedData.startDate)
        where.paidAt.gte = new Date(validatedData.startDate)
      if (validatedData.endDate)
        where.paidAt.lte = new Date(validatedData.endDate)
    }

    if (validatedData.clientId) {
      where.rental = { userid: validatedData.clientId }
    }

    if (validatedData.categoryId) {
      where.rental = {
        ...where.rental,
        rental_items: {
          some: {
            equipments: {
              categoryId: validatedData.categoryId,
            },
          },
        },
      }
    }

    // Relatório por período
    const paymentsByPeriod = await prisma.payment.findMany({
      where: {
        ...where,
        status: 'PAID',
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
          },
        },
      },
      orderBy: {
        paidAt: 'desc',
      },
    })

    // Relatório por cliente
    const paymentsByClient = await prisma.payment.groupBy({
      by: ['rentalId'],
      where: {
        ...where,
        status: 'PAID',
        rentalId: { not: null },
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    })

    // Buscar dados dos clientes
    const clientReports = await Promise.all(
      paymentsByClient.map(async (group) => {
        if (!group.rentalId) return null
        const rental = await prisma.rentals.findUnique({
          where: { id: group.rentalId },
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        })
        return {
          clientId: rental?.userid,
          clientName: rental?.users.name,
          clientEmail: rental?.users.email,
          totalAmount: Number(group._sum.amount || 0),
          paymentCount: group._count.id,
        }
      })
    )

    // Relatório por categoria
    const paymentsByCategory = await prisma.payment.findMany({
      where: {
        ...where,
        status: 'PAID',
        rental: {
          rental_items: {
            some: {},
          },
        },
      },
      include: {
        rental: {
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
          },
        },
      },
    })

    // Agrupar por categoria
    const categoryReports = paymentsByCategory.reduce(
      (acc, payment) => {
        payment.rental?.rental_items.forEach((item) => {
          const categoryId = item.equipments.category?.id || 'unknown'
          const categoryName = item.equipments.category?.name || 'Sem categoria'
          if (!acc[categoryId]) {
            acc[categoryId] = {
              categoryId,
              categoryName,
              totalAmount: 0,
              rentalCount: 0,
            }
          }
          acc[categoryId].totalAmount += Number(payment.amount)
          acc[categoryId].rentalCount += 1
        })
        return acc
      },
      {} as Record<
        string,
        {
          categoryId: string
          categoryName: string
          totalAmount: number
          rentalCount: number
        }
      >
    )

    // Controle de margens (receita vs custo estimado)
    const marginReports = await Promise.all(
      Object.values(categoryReports).map(async (category) => {
        // Buscar equipamentos da categoria para calcular custos
        const equipment = await prisma.equipment.findMany({
          where: {
            categoryId: category.categoryId,
          },
        })

        // Calcular custo estimado (depreciação + manutenção média)
        const estimatedCost = equipment.reduce((sum, eq) => {
          const purchasePrice = Number(eq.purchasePrice || 0)
          const depreciationRate = Number(eq.depreciationRate || 0.1) // 10% ao ano
          const annualDepreciation = purchasePrice * depreciationRate
          const monthlyDepreciation = annualDepreciation / 12

          // Buscar custo médio de manutenção
          const maintenanceCost = 0 // TODO: Calcular baseado em histórico

          return sum + monthlyDepreciation + maintenanceCost
        }, 0)

        const revenue = category.totalAmount
        const margin = revenue - estimatedCost
        const marginPercentage = revenue > 0 ? (margin / revenue) * 100 : 0

        return {
          ...category,
          estimatedCost,
          margin,
          marginPercentage,
        }
      })
    )

    const report = {
      period: {
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
      },
      summary: {
        totalRevenue: paymentsByPeriod.reduce(
          (sum, p) => sum + Number(p.amount),
          0
        ),
        totalPayments: paymentsByPeriod.length,
        averagePayment:
          paymentsByPeriod.length > 0
            ? paymentsByPeriod.reduce((sum, p) => sum + Number(p.amount), 0) /
              paymentsByPeriod.length
            : 0,
      },
      byClient: clientReports.filter(Boolean),
      byCategory: marginReports,
      byPeriod: paymentsByPeriod.map((p) => ({
        id: p.id,
        amount: Number(p.amount),
        method: p.method,
        paidAt: p.paidAt,
        client: p.rental?.users.name || 'N/A',
        equipment:
          p.rental?.rental_items
            .map((item) => item.equipments.name)
            .join(', ') || 'N/A',
      })),
    }

    // Se formato for PDF ou Excel, retornar dados para processamento no frontend
    // (A geração real de PDF/Excel deve ser feita no frontend ou via biblioteca server-side)
    if (validatedData.format === 'pdf' || validatedData.format === 'excel') {
      return NextResponse.json({
        ...report,
        format: validatedData.format,
        note: 'Para gerar PDF/Excel, use os dados retornados no frontend com bibliotecas apropriadas',
      })
    }

    return NextResponse.json(report)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error generating financial report:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
