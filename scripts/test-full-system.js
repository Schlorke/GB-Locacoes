const { neon } = require("@neondatabase/serverless")

async function testFullSystem() {
  console.log("🚀 [FULL-TEST] Testando sistema completo...")

  // 1. Verificar DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL não encontrada")
    return
  }

  console.log("✅ DATABASE_URL configurada!")

  try {
    const sql = neon(process.env.DATABASE_URL)

    // 2. Testar conexão
    console.log("🔌 Testando conexão...")
    const timeResult = await sql`SELECT NOW() as current_time`
    console.log("✅ Conexão OK! Hora:", timeResult[0].current_time)

    // 3. Verificar tabelas existentes
    console.log("\n📋 Verificando estrutura do banco...")
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `

    console.log("📊 Tabelas encontradas:")
    tables.forEach((table) => {
      console.log(`  • ${table.table_name}`)
    })

    // 4. Verificar se precisa criar tabelas
    const requiredTables = ["User", "Category", "Equipment", "Quote"]
    const existingTables = tables.map((t) => t.table_name)
    const missingTables = requiredTables.filter((t) => !existingTables.includes(t))

    if (missingTables.length > 0) {
      console.log("\n⚠️ Tabelas faltando:", missingTables.join(", "))
      console.log("🔨 Criando tabelas necessárias...")

      // Criar tabelas básicas
      await createBasicTables(sql)
    }

    // 5. Verificar/criar usuário admin
    console.log("\n👤 Verificando usuário admin...")
    await ensureAdminUser(sql)

    // 6. Verificar/criar categorias
    console.log("\n📂 Verificando categorias...")
    await ensureCategories(sql)

    console.log("\n🎉 SISTEMA PRONTO!")
    console.log("👉 Próximos passos:")
    console.log("   • Acesse /admin/login")
    console.log("   • Email: admin@gblocacoes.com")
    console.log("   • Senha: admin123")
    console.log("   • Crie equipamentos no painel")
  } catch (error) {
    console.error("❌ Erro:", error.message)
  }
}

async function createBasicTables(sql) {
  // Criar enum UserRole se não existir
  try {
    await sql`CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER')`
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
    console.log("⚠️ Erro ao criar User:", e.message)
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
    console.log("⚠️ Erro ao criar Category:", e.message)
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
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("categoryId") REFERENCES "Category"(id)
      )
    `
    console.log("✅ Tabela Equipment criada")
  } catch (e) {
    console.log("⚠️ Erro ao criar Equipment:", e.message)
  }
}

async function ensureAdminUser(sql) {
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

async function ensureCategories(sql) {
  try {
    const categoryCheck = await sql`SELECT COUNT(*) as count FROM "Category"`

    if (categoryCheck[0].count == 0) {
      const categories = [
        { name: "Andaimes e Escadas", slug: "andaimes-escadas" },
        { name: "Betoneiras", slug: "betoneiras" },
        { name: "Compressores", slug: "compressores" },
        { name: "Ferramentas Elétricas", slug: "ferramentas-eletricas" },
        { name: "Geradores", slug: "geradores" },
      ]

      for (const cat of categories) {
        await sql`
          INSERT INTO "Category" (name, description, slug)
          VALUES (${cat.name}, ${"Equipamentos de " + cat.name.toLowerCase()}, ${cat.slug})
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

testFullSystem()
