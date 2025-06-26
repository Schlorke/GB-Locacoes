const { PrismaClient, Role } = require("@prisma/client");

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log("🌐 Iniciando teste de conexão com o banco Vercel...");

    await prisma.$connect();
    console.log("✅ Conexão estabelecida com sucesso!");

    const now = await prisma.$queryRaw`SELECT NOW()`;
    console.log("📅 Hora atual do banco:", now);

    console.log("🎉 Teste finalizado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco:");
    console.error("📋", {
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
