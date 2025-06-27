import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log("🔍 Testando conexão com o banco de dados...")

    // Test basic connection
    await prisma.$connect()
    console.log("✅ Conexão estabelecida com sucesso!")

    // Test if we can query users
    const userCount = await prisma.user.count()
    console.log(`📊 Usuários no banco: ${userCount}`)

    // Test if we can create a simple record (and delete it)
    console.log("🧪 Testando operação de escrita...")

    const testUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@test.com",
        role: "CUSTOMER",
      },
    })
    console.log("✅ Usuário de teste criado:", testUser.id)

    // Clean up test user
    await prisma.user.delete({
      where: { id: testUser.id },
    })
    console.log("🧹 Usuário de teste removido")

    console.log("🎉 Todos os testes passaram!")
  } catch (error) {
    console.error("❌ Erro na conexão:", error)
    console.error("📋 Detalhes do erro:", {
      name: error.name,
      message: error.message,
      code: error.code,
    })
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
