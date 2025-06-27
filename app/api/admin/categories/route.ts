import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/categories - List all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            equipments: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Erro ao buscar categorias" }, { status: 500 })
  }
}

// POST /api/admin/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, icon, iconColor, bgColor, fontColor } = body

    if (!name) {
      return NextResponse.json({ error: "Nome da categoria é obrigatório" }, { status: 400 })
    }

    // Verificar se já existe categoria com esse nome
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    })

    if (existingCategory) {
      return NextResponse.json({ error: "Já existe uma categoria com esse nome" }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || null,
        icon: icon || null,
        iconColor: iconColor || "#000000",
        bgColor: bgColor || "#e0e0e0",
        fontColor: fontColor || "#000000",
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Erro ao criar categoria" }, { status: 500 })
  }
}
