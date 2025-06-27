import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  console.log("🚀 [SEED-ADMIN] Iniciando processo de criação do admin...")

  try {
    const adminEmail = "admin@gblocacoes.com.br"
    const adminPassword = "admin123"
    const adminName = "Admin"

    console.log("🔍 [SEED-ADMIN] Configurações:")
    console.log("   - Email:", adminEmail)
    console.log("   - Nome:", adminName)
    console.log("   - DATABASE_URL existe:", !!process.env.DATABASE_URL)
    console.log("   - DATABASE_URL length:", process.env.DATABASE_URL?.length || 0)

    // Test database connection first
    console.log("🔍 [SEED-ADMIN] Testando conexão com Prisma...")

    try {
      await prisma.$connect()
      console.log("✅ [SEED-ADMIN] Conexão Prisma estabelecida")
    } catch (connectError) {
      console.error("❌ [SEED-ADMIN] Erro na conexão Prisma:", connectError)
      throw new Error(`Falha na conexão: ${(connectError as Error).message}`)
    }

    // Test basic query
    console.log("🔍 [SEED-ADMIN] Testando query básica...")
    try {
      const userCount = await prisma.user.count()
      console.log("✅ [SEED-ADMIN] Query básica OK. Total de usuários:", userCount)
    } catch (queryError) {
      console.error("❌ [SEED-ADMIN] Erro na query básica:", queryError)
      throw new Error(`Falha na query: ${(queryError as Error).message}`)
    }

    // Check if admin user already exists
    console.log("🔍 [SEED-ADMIN] Verificando se admin já existe...")
    let existingAdmin
    try {
      existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
      })
      console.log("✅ [SEED-ADMIN] Verificação de admin existente OK")
    } catch (findError) {
      console.error("❌ [SEED-ADMIN] Erro ao buscar admin existente:", findError)
      throw new Error(`Falha ao verificar admin: ${(findError as Error).message}`)
    }

    if (existingAdmin) {
      console.log("ℹ️ [SEED-ADMIN] Admin já existe, retornando conflito")
      return NextResponse.json(
        {
          status: "error",
          message: "Admin já existe",
          data: {
            email: existingAdmin.email,
            name: existingAdmin.name,
            role: existingAdmin.role,
            createdAt: existingAdmin.createdAt,
          },
        },
        { status: 409 },
      )
    }

    // Hash the password
    console.log("🔐 [SEED-ADMIN] Gerando hash da senha...")
    let hashedPassword
    try {
      hashedPassword = await bcrypt.hash(adminPassword, 12)
      console.log("✅ [SEED-ADMIN] Hash da senha gerado com sucesso")
    } catch (hashError) {
      console.error("❌ [SEED-ADMIN] Erro ao gerar hash:", hashError)
      throw new Error(`Falha no hash: ${(hashError as Error).message}`)
    }

    // Create admin user
    console.log("👤 [SEED-ADMIN] Criando usuário admin...")
    let adminUser
    try {
      adminUser = await prisma.user.create({
        data: {
          name: adminName,
          email: adminEmail,
          password: hashedPassword,
          role: UserRole.ADMIN,
          emailVerified: new Date(),
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          emailVerified: true,
        },
      })
      console.log("✅ [SEED-ADMIN] Admin criado com sucesso:", adminUser.id)
    } catch (createError) {
      console.error("❌ [SEED-ADMIN] Erro ao criar admin:", createError)
      const err = createError as any
      console.error("❌ [SEED-ADMIN] Detalhes do erro:", {
        name: err.name,
        message: err.message,
        code: err.code,
        meta: err.meta,
      })
      throw new Error(`Falha ao criar admin: ${err.message}`)
    }

    console.log("🎉 [SEED-ADMIN] Processo concluído com sucesso!")

    return NextResponse.json(
      {
        status: "success",
        message: "Admin criado com sucesso",
        data: {
          id: adminUser.id,
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role,
          createdAt: adminUser.createdAt,
          emailVerified: adminUser.emailVerified,
        },
        credentials: {
          email: adminEmail,
          password: adminPassword,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("💥 [SEED-ADMIN] ERRO GERAL:", error)
    console.error("💥 [SEED-ADMIN] Stack trace:", (error as Error).stack)

    const err = error as any
    const errorDetails = {
      name: err.name || "Unknown",
      message: err.message || "Unknown error",
      code: err.code || "NO_CODE",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    }

    console.error("📋 [SEED-ADMIN] Detalhes completos do erro:", errorDetails)

    return NextResponse.json(
      {
        status: "error",
        message: `Erro interno: ${(error as Error).message}`,
        error: "INTERNAL_SERVER_ERROR",
        details: errorDetails,
      },
      { status: 500 },
    )
  } finally {
    try {
      await prisma.$disconnect()
      console.log("🔌 [SEED-ADMIN] Prisma desconectado")
    } catch (disconnectError) {
      console.error("⚠️ [SEED-ADMIN] Erro ao desconectar Prisma:", disconnectError)
    }
  }
}

// GET method remains the same
export async function GET(request: NextRequest) {
  try {
    console.log("🔍 [SEED-ADMIN-GET] Verificando status do admin...")

    const adminEmail = "admin@gblocacoes.com.br"

    await prisma.$connect()

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        emailVerified: true,
        // lastLogin não existe no schema atual
      },
    })

    if (existingAdmin) {
      console.log("✅ [SEED-ADMIN-GET] Admin encontrado:", existingAdmin.id)
      return NextResponse.json({
        status: "success",
        message: "Admin encontrado",
        exists: true,
        data: existingAdmin,
      })
    } else {
      console.log("ℹ️ [SEED-ADMIN-GET] Admin não encontrado")
      return NextResponse.json({
        status: "info",
        message: "Admin não encontrado",
        exists: false,
        data: null,
      })
    }
  } catch (error) {
    console.error("❌ [SEED-ADMIN-GET] Erro ao verificar admin:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Erro ao verificar admin",
        error: "VERIFICATION_ERROR",
        details: {
          name: error instanceof Error ? error.name : "Unknown",
          message: error instanceof Error ? error.message : "Unknown error",
          code: (error as any)?.code || "NO_CODE",
        },
      },
      { status: 500 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
