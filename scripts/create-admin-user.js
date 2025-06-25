import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    console.log("🔐 Criando usuário administrador...")

    // Hash da senha
    const hashedPassword = await bcrypt.hash("admin123", 12)

    // Verificar se já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: "admin@gblocacoes.com.br" },
    })

    if (existingUser) {
      console.log("✅ Usuário admin já existe!")
      console.log("Email:", existingUser.email)
      console.log("Role:", existingUser.role)
      return
    }

    // Criar usuário admin
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@gblocacoes.com.br",
        name: "Administrador",
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    })

    console.log("✅ Usuário administrador criado com sucesso!")
    console.log("Email:", adminUser.email)
    console.log("Senha: admin123")
    console.log("Role:", adminUser.role)
  } catch (error) {
    console.error("❌ Erro ao criar usuário admin:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()
