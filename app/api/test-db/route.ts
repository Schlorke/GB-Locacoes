import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    console.log("🔍 [TEST-DB] Iniciando teste de conexão...")

    // Teste de conexão
    await prisma.$connect()
    console.log("✅ [TEST-DB] Conexão estabelecida!")

    // Teste de contagem
    const equipmentCount = await prisma.equipment.count()
    const categoryCount = await prisma.category.count()
    const quoteCount = await prisma.quote.count()

    console.log("📊 [TEST-DB] Contagens obtidas:", { equipmentCount, categoryCount, quoteCount })

    // Teste de busca
    const categories = await prisma.category.findMany({
      take: 5,
      select: { id: true, name: true, icon: true },
    })

    console.log("📋 [TEST-DB] Categorias encontradas:", categories.length)

    // Teste de equipamentos
    const equipments = await prisma.equipment.findMany({
      take: 3,
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    })

    console.log("🔧 [TEST-DB] Equipamentos encontrados:", equipments.length)

    const result = {
      success: true,
      message: "Conexão com banco de dados funcionando!",
      stats: {
        equipments: equipmentCount,
        categories: categoryCount,
        quotes: quoteCount,
      },
      sampleData: {
        categories: categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon })),
        equipments: equipments.map((e) => ({
          id: e.id,
          name: e.name,
          price: e.pricePerDay,
          category: e.category?.name,
        })),
      },
    }

    console.log("🎉 [TEST-DB] Teste concluído com sucesso!")
    return NextResponse.json(result)
  } catch (error) {
    console.error("❌ [TEST-DB] ERRO:", error)

    const errorInfo = {
      success: false,
      error: "Erro na conexão com o banco de dados",
      details: error instanceof Error ? error.message : String(error),
      code: error?.code || "UNKNOWN",
    }

    return NextResponse.json(errorInfo, { status: 500 })
  }
}
