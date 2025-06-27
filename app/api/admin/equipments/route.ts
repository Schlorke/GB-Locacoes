import { type NextRequest, NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"

// GET /api/admin/equipments - List all equipments with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    console.log("[API GET /admin/equipments] Iniciando requisição...")

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search")
    const categoryId = searchParams.get("categoryId")
    const availableParam = searchParams.get("available")

    console.log("[API GET /admin/equipments] Parâmetros:", { page, limit, search, categoryId, availableParam })

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ error: "Parâmetro 'page' inválido." }, { status: 400 })
    }
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json({ error: "Parâmetro 'limit' inválido." }, { status: 400 })
    }

    const skip = (page - 1) * limit
    const where: Prisma.EquipmentWhereInput = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (categoryId && categoryId !== "all") {
      where.categoryId = categoryId
    }

    if (availableParam !== null && availableParam !== undefined && availableParam !== "all") {
      where.available = availableParam === "true"
    }

    console.log("[API GET /admin/equipments] Filtros aplicados:", JSON.stringify(where, null, 2))

    // Teste de conexão com o banco
    console.log("[API GET /admin/equipments] Testando conexão com banco...")
    await prisma.$connect()
    console.log("[API GET /admin/equipments] Conexão estabelecida!")

    const equipments = await prisma.equipment.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
        _count: {
          select: {
            reviews: true,
            quoteItems: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    console.log(`[API GET /admin/equipments] Equipamentos encontrados: ${equipments.length}`)

    const totalItems = await prisma.equipment.count({ where })
    const totalPages = Math.ceil(totalItems / limit)

    console.log(`[API GET /admin/equipments] Total de itens: ${totalItems}, Total de páginas: ${totalPages}`)

    const response = {
      equipments,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("[API GET /admin/equipments] ERRO CRÍTICO:", error)

    // Log detalhado do erro
    if (error instanceof Error) {
      console.error("[API GET /admin/equipments] Mensagem do erro:", error.message)
      console.error("[API GET /admin/equipments] Stack trace:", error.stack)
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("[API GET /admin/equipments] Erro do Prisma - Código:", error.code)
      console.error("[API GET /admin/equipments] Erro do Prisma - Meta:", error.meta)
    }

    return NextResponse.json(
      {
        error: "Erro interno do servidor ao buscar equipamentos.",
        details:
          process.env.NODE_ENV === "development" ? (error instanceof Error ? error.message : String(error)) : undefined,
      },
      { status: 500 },
    )
  }
}

// POST /api/admin/equipments - Create new equipment
export async function POST(request: NextRequest) {
  try {
    console.log("[API POST /admin/equipments] Iniciando criação de equipamento...")

    const body = await request.json()
    const { name, description, pricePerDay, categoryId, images, available, specifications } = body

    console.log("[API POST /admin/equipments] Dados recebidos:", {
      name,
      description,
      pricePerDay,
      categoryId,
      images,
      available,
    })

    // Validações
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Nome do equipamento é obrigatório." }, { status: 400 })
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
      return NextResponse.json({ error: "Descrição do equipamento é obrigatória." }, { status: 400 })
    }
    if (!categoryId || typeof categoryId !== "string") {
      return NextResponse.json({ error: "ID da categoria é obrigatório." }, { status: 400 })
    }
    if (pricePerDay === undefined || pricePerDay === null) {
      return NextResponse.json({ error: "Preço por dia é obrigatório." }, { status: 400 })
    }

    const parsedPrice = Number.parseFloat(String(pricePerDay))
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json({ error: "Preço por dia inválido. Deve ser um número positivo." }, { status: 400 })
    }

    // Verificar se a categoria existe
    const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } })
    if (!categoryExists) {
      return NextResponse.json({ error: "Categoria não encontrada." }, { status: 404 })
    }

    const equipment = await prisma.equipment.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        pricePerDay: parsedPrice,
        categoryId,
        images: Array.isArray(images) ? images.filter((img) => typeof img === "string" && img.trim() !== "") : [],
        available: typeof available === "boolean" ? available : true,
        specifications: specifications && typeof specifications === "object" ? specifications : Prisma.JsonNull,
      },
      include: {
        category: true,
      },
    })

    console.log("[API POST /admin/equipments] Equipamento criado com sucesso:", equipment.id)
    return NextResponse.json(equipment, { status: 201 })
  } catch (error) {
    console.error("[API POST /admin/equipments] ERRO ao criar equipamento:", error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("[API POST /admin/equipments] Erro do Prisma - Código:", error.code)
      return NextResponse.json(
        {
          error: "Erro ao processar dados do equipamento.",
          details: process.env.NODE_ENV === "development" ? `Prisma Error ${error.code}: ${error.message}` : undefined,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: "Erro interno do servidor ao criar equipamento.",
        details:
          process.env.NODE_ENV === "development" ? (error instanceof Error ? error.message : String(error)) : undefined,
      },
      { status: 500 },
    )
  }
}
