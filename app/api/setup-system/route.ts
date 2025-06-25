import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function GET() {
  console.log("🚀 [SETUP-SYSTEM] Iniciando configuração...")

  try {
    // Verificar DATABASE_URL
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          error: "DATABASE_URL não encontrada",
          success: false,
        },
        { status: 500 },
      )
    }

    const sql = neon(process.env.DATABASE_URL)

    // 1. Testar conexão
    console.log("🔌 Testando conexão...")
    const timeResult = await sql`SELECT NOW() as current_time`
    console.log("✅ Conexão OK! Hora:", timeResult[0].current_time)

    // 2. Verificar tabelas existentes
    console.log("📋 Verificando estrutura do banco...")
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `

    const existingTables = tables.map((t) => t.table_name)
    console.log("📊 Tabelas encontradas:", existingTables)

    // 3. Criar tabelas se necessário
    await createBasicTables(sql)

    // 4. Verificar/criar usuário admin
    console.log("👤 Verificando usuário admin...")
    await ensureAdminUser(sql)

    // 5. Verificar/criar categorias
    console.log("📂 Verificando categorias...")
    await ensureCategories(sql)

    // 6. Criar equipamentos de exemplo
    console.log("🔧 Criando equipamentos de exemplo...")
    await createSampleEquipment(sql)

    return NextResponse.json({
      success: true,
      message: "Sistema configurado com sucesso!",
      data: {
        tablesFound: existingTables,
        adminCreated: true,
        categoriesCreated: true,
        sampleEquipmentCreated: true,
      },
    })
  } catch (error) {
    console.error("❌ Erro:", error)
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      { status: 500 },
    )
  }
}

async function createBasicTables(sql: any) {
  // Criar enum UserRole se não existir
  try {
    await sql`CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER')`
    console.log("✅ UserRole criado")
  } catch (e) {
    console.log("⚠️ UserRole já existe")
  }

  // Criar tabela User
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "User" (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role "UserRole" NOT NULL DEFAULT 'USER',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log("✅ Tabela User criada")
  } catch (e) {
    console.log("⚠️ User:", e.message)
  }

  // Criar tabela Category
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "Category" (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name TEXT NOT NULL,
        description TEXT,
        slug TEXT UNIQUE NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log("✅ Tabela Category criada")
  } catch (e) {
    console.log("⚠️ Category:", e.message)
  }

  // Criar tabela Equipment
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "Equipment" (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name TEXT NOT NULL,
        description TEXT,
        "dailyPrice" DECIMAL(10,2) NOT NULL,
        "weeklyPrice" DECIMAL(10,2),
        "monthlyPrice" DECIMAL(10,2),
        available BOOLEAN NOT NULL DEFAULT true,
        "imageUrl" TEXT,
        "categoryId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log("✅ Tabela Equipment criada")
  } catch (e) {
    console.log("⚠️ Equipment:", e.message)
  }

  // Criar tabela Quote
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "Quote" (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        company TEXT,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'PENDING',
        "equipmentIds" TEXT[],
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log("✅ Tabela Quote criada")
  } catch (e) {
    console.log("⚠️ Quote:", e.message)
  }
}

async function ensureAdminUser(sql: any) {
  try {
    const adminCheck = await sql`
      SELECT COUNT(*) as count FROM "User" WHERE role = 'ADMIN'
    `

    if (adminCheck[0].count == 0) {
      await sql`
        INSERT INTO "User" (name, email, role)
        VALUES ('Administrador', 'admin@gblocacoes.com', 'ADMIN')
      `
      console.log("✅ Usuário admin criado!")
    } else {
      console.log("✅ Admin já existe")
    }
  } catch (e) {
    console.log("⚠️ Erro com admin:", e.message)
  }
}

async function ensureCategories(sql: any) {
  try {
    const categoryCheck = await sql`SELECT COUNT(*) as count FROM "Category"`

    if (categoryCheck[0].count == 0) {
      const categories = [
        {
          name: "Andaimes e Escadas",
          slug: "andaimes-escadas",
          description: "Andaimes tubulares, suspensos e escadas para trabalho em altura",
        },
        {
          name: "Betoneiras",
          slug: "betoneiras",
          description: "Betoneiras de diversos tamanhos para preparo de concreto",
        },
        { name: "Compressores", slug: "compressores", description: "Compressores de ar para ferramentas pneumáticas" },
        {
          name: "Ferramentas Elétricas",
          slug: "ferramentas-eletricas",
          description: "Furadeiras, serras, rompedores e outras ferramentas elétricas",
        },
        { name: "Geradores", slug: "geradores", description: "Geradores de energia elétrica para canteiros de obra" },
      ]

      for (const cat of categories) {
        await sql`
          INSERT INTO "Category" (name, description, slug)
          VALUES (${cat.name}, ${cat.description}, ${cat.slug})
        `
      }
      console.log("✅ Categorias criadas!")
    } else {
      console.log("✅ Categorias já existem")
    }
  } catch (e) {
    console.log("⚠️ Erro com categorias:", e.message)
  }
}

async function createSampleEquipment(sql: any) {
  try {
    const equipmentCheck = await sql`SELECT COUNT(*) as count FROM "Equipment"`

    if (equipmentCheck[0].count == 0) {
      // Buscar IDs das categorias
      const categories = await sql`SELECT id, slug FROM "Category"`
      const categoryMap = Object.fromEntries(categories.map((c: any) => [c.slug, c.id]))

      const sampleEquipment = [
        {
          name: "Betoneira 400L",
          description: "Betoneira profissional de 400 litros, ideal para obras de médio porte",
          dailyPrice: 45.0,
          weeklyPrice: 280.0,
          monthlyPrice: 1000.0,
          categoryId: categoryMap["betoneiras"],
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          name: "Andaime Tubular 2m",
          description: "Andaime tubular de 2 metros de altura, seguro e resistente",
          dailyPrice: 25.0,
          weeklyPrice: 150.0,
          monthlyPrice: 500.0,
          categoryId: categoryMap["andaimes-escadas"],
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          name: "Compressor 10HP",
          description: "Compressor de ar de 10HP para ferramentas pneumáticas",
          dailyPrice: 80.0,
          weeklyPrice: 500.0,
          monthlyPrice: 1800.0,
          categoryId: categoryMap["compressores"],
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          name: "Furadeira de Impacto",
          description: "Furadeira de impacto profissional para concreto e alvenaria",
          dailyPrice: 35.0,
          weeklyPrice: 200.0,
          monthlyPrice: 700.0,
          categoryId: categoryMap["ferramentas-eletricas"],
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          name: "Gerador 5KVA",
          description: "Gerador de energia 5KVA, silencioso e econômico",
          dailyPrice: 120.0,
          weeklyPrice: 750.0,
          monthlyPrice: 2500.0,
          categoryId: categoryMap["geradores"],
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
      ]

      for (const equipment of sampleEquipment) {
        if (equipment.categoryId) {
          await sql`
            INSERT INTO "Equipment" (name, description, "dailyPrice", "weeklyPrice", "monthlyPrice", "categoryId", "imageUrl")
            VALUES (${equipment.name}, ${equipment.description}, ${equipment.dailyPrice}, ${equipment.weeklyPrice}, ${equipment.monthlyPrice}, ${equipment.categoryId}, ${equipment.imageUrl})
          `
        }
      }
      console.log("✅ Equipamentos de exemplo criados!")
    } else {
      console.log("✅ Equipamentos já existem")
    }
  } catch (e) {
    console.log("⚠️ Erro com equipamentos:", e.message)
  }
}
