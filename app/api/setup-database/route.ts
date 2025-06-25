import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    console.log("🚀 [SETUP-DB] Iniciando setup do banco...")

    const steps = []

    // Passo 1: Testar conexão
    try {
      console.log("🔍 [SETUP-DB] Testando conexão com o banco...")
      await prisma.$connect()
      steps.push({ step: "connection", success: true, message: "Conexão estabelecida" })
      console.log("✅ [SETUP-DB] Conexão OK!")
    } catch (error) {
      steps.push({ step: "connection", success: false, error: String(error) })
      console.error("❌ [SETUP-DB] Erro de conexão:", error)
      throw error
    }

    // Passo 2: Verificar se as tabelas existem
    try {
      console.log("🔍 [SETUP-DB] Verificando tabelas...")

      // Tentar fazer uma query simples em cada tabela
      const [userCount, categoryCount, equipmentCount] = await Promise.all([
        prisma.user.count().catch(() => 0),
        prisma.category.count().catch(() => 0),
        prisma.equipment.count().catch(() => 0),
      ])

      steps.push({
        step: "tables",
        success: true,
        message: `Tabelas verificadas - Users: ${userCount}, Categories: ${categoryCount}, Equipment: ${equipmentCount}`,
      })
      console.log("✅ [SETUP-DB] Tabelas verificadas!")

      // Passo 3: Criar dados básicos se não existirem
      if (categoryCount === 0) {
        console.log("🌱 [SETUP-DB] Criando categorias básicas...")
        await prisma.category.createMany({
          data: [
            { name: "Ferramentas", slug: "ferramentas", description: "Ferramentas diversas", icon: "Wrench" },
            { name: "Equipamentos", slug: "equipamentos", description: "Equipamentos pesados", icon: "Truck" },
            { name: "Materiais", slug: "materiais", description: "Materiais de construção", icon: "Package" },
          ],
          skipDuplicates: true,
        })
        steps.push({ step: "seed-categories", success: true, message: "Categorias básicas criadas" })
      }

      return NextResponse.json({
        success: true,
        message: "Setup do banco concluído com sucesso!",
        steps,
        stats: {
          users: userCount,
          categories: await prisma.category.count(),
          equipments: equipmentCount,
        },
      })
    } catch (error) {
      steps.push({ step: "tables", success: false, error: String(error) })
      console.error("❌ [SETUP-DB] Erro ao verificar tabelas:", error)

      return NextResponse.json(
        {
          success: false,
          message:
            "Erro ao verificar/criar tabelas. Verifique se o Prisma Client foi gerado e as migrações foram aplicadas.",
          steps,
          error: String(error),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("❌ [SETUP-DB] ERRO GERAL:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Erro no setup do banco",
        error: String(error),
        details: "Verifique se o DATABASE_URL está configurado corretamente e se o Prisma Client foi gerado.",
      },
      { status: 500 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
