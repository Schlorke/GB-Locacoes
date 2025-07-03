import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !["ADMIN", "OPERATOR"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [totalEquipments, availableEquipments, totalCategories] = await Promise.all([
      prisma.equipment.count(),
      prisma.equipment.count({ where: { available: true } }),
      prisma.category.count(),
    ])

    const [totalQuotes, pendingQuotes, approvedQuotes, rejectedQuotes, completedQuotes] = await Promise.all([
      prisma.quote.count(),
      prisma.quote.count({ where: { status: "PENDING" } }),
      prisma.quote.count({ where: { status: "APPROVED" } }),
      prisma.quote.count({ where: { status: "REJECTED" } }),
      prisma.quote.count({ where: { status: "COMPLETED" } }),
    ])

    const totalRevenueAgg = await prisma.quote.aggregate({
      _sum: { totalAmount: true },
    })
    const totalRevenue = totalRevenueAgg._sum.totalAmount || 0

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0,0,0,0)

    const monthlyRevenueAgg = await prisma.quote.aggregate({
      _sum: { totalAmount: true },
      where: { createdAt: { gte: startOfMonth } },
    })
    const monthlyRevenue = monthlyRevenueAgg._sum.totalAmount || 0

    const data = {
      totalEquipments,
      availableEquipments,
      totalCategories,
      totalQuotes,
      pendingQuotes,
      approvedQuotes,
      rejectedQuotes,
      completedQuotes,
      totalRevenue: typeof totalRevenue === "object" ? (totalRevenue as any).toNumber?.() ?? 0 : (totalRevenue as number),
      monthlyRevenue: typeof monthlyRevenue === "object" ? (monthlyRevenue as any).toNumber?.() ?? 0 : (monthlyRevenue as number),
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
