import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function fixAdminLogin() {
  try {
    console.log("🔧 Corrigindo login do admin...")

    // Delete existing admin if exists
    await prisma.user.deleteMany({
      where: { email: "admin@gblocacoes.com.br" },
    })

    // Create new admin with correct password
    const hashedPassword = await bcrypt.hash("admin123", 12)

    const admin = await prisma.user.create({
      data: {
        email: "admin@gblocacoes.com.br",
        name: "Administrador",
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    })

    console.log("✅ Admin criado com sucesso:", {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    })

    // Test password verification
    const isValid = await bcrypt.compare("admin123", admin.password)
    console.log("🔑 Teste de senha:", isValid ? "PASSOU" : "FALHOU")
  } catch (error) {
    console.error("❌ Erro:", error)
  } finally {
    await prisma.$disconnect()
  }
}

fixAdminLogin()
