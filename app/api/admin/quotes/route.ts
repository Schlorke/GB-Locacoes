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

    const quotes = await prisma.quote.findMany({
      include: {
        items: {
          include: {
            equipment: {
              select: {
                id: true,
                name: true,
                pricePerDay: true,
                category: {
                  select: {
                    name: true,
                    color: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(quotes)
  } catch (error) {
    console.error("Error fetching quotes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
