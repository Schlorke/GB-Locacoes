const { PrismaClient, Role } = require("@prisma/client");

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log("🔍 Testando conexão com o banco de dados...");

    // Testar conexão básica
    await prisma.$connect();
    console.log("✅ Conexão estabelecida com sucesso!");

    // Contar usuários no banco
    const userCount = await prisma.user.count();
    console.log(`📊 Usuários no banco: ${userCount}`);

    // Verificar roles disponíveis
    const availableRoles = Object.values(Role);
    console.log("📌 Roles disponíveis no banco:", availableRoles);

    const testRole = availableRoles[0]; // pega o primeiro valor disponível
    console.log("🔑 Role usada no teste:", testRole);

    // Criar e remover um usuário de teste
    console.log("🧪 Testando operação de escrita...");
    const testUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@test.com",
        role: testRole,
      },
    });
    console.log("✅ Usuário de teste criado:", testUser.id);

    await prisma.user.delete({
      where: { id: testUser.id },
    });
    console.log("🧹 Usuário de teste removido");

    console.log("🎉 Todos os testes passaram!");
  } catch (error) {
    console.error("❌ Erro na conexão:", error);
    console.error("📋 Detalhes do erro:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
