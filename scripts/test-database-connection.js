const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log("🔍 Testando conexão com o banco de dados...")

    // Teste básico de conexão
    await prisma.$connect()
    console.log("✅ Conexão estabelecida com sucesso!")

    // Teste de contagem de tabelas
    const equipmentCount = await prisma.equipment.count()
    const categoryCount = await prisma.category.count()

    console.log(`📊 Estatísticas do banco:`)
    console.log(`   - Equipamentos: ${equipmentCount}`)
    console.log(`   - Categorias: ${categoryCount}`)

    // Teste de busca simples
    const categories = await prisma.category.findMany({
      take: 3,
      select: { id: true, name: true },
    })

    console.log(`📋 Primeiras categorias:`)
    categories.forEach((cat) => console.log(`   - ${cat.name} (${cat.id})`))

    console.log("🎉 Todos os testes passaram!")
  } catch (error) {
    console.error("❌ Erro na conexão com o banco:", error)
    if (error.code) {
      console.error(`   Código do erro: ${error.code}`)
    }
    if (error.message) {
      console.error(`   Mensagem: ${error.message}`)
    }
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
