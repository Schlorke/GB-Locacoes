// 🎯 CONFIGURAÇÃO MÍNIMA DO BANCO - APENAS O ESSENCIAL
import { neon } from "@neondatabase/serverless"

async function minimalSetup() {
  console.log("🚀 CONFIGURAÇÃO MÍNIMA DO BANCO DE DADOS")

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL não encontrada!")
    return
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    // 1. VERIFICAR SE JÁ EXISTE ESTRUTURA
    console.log("🔍 Verificando estrutura existente...")
    const tables = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `

    const existingTables = tables.map((t) => t.table_name)
    console.log("📊 Tabelas existentes:", existingTables)

    // 2. CRIAR APENAS SE NECESSÁRIO
    const requiredTables = ["User", "Category", "Equipment", "Quote", "QuoteItem"]
    const missingTables = requiredTables.filter((t) => !existingTables.includes(t))

    if (missingTables.length === 0) {
      console.log("✅ Todas as tabelas já existem!")

      // 3. VERIFICAR DADOS ESSENCIAIS
      const adminCount = await sql`SELECT COUNT(*) as count FROM "User" WHERE role = 'ADMIN'`
      const categoryCount = await sql`SELECT COUNT(*) as count FROM "Category"`
      const equipmentCount = await sql`SELECT COUNT(*) as count FROM "Equipment"`

      console.log(`👤 Admins: ${adminCount[0].count}`)
      console.log(`📂 Categorias: ${categoryCount[0].count}`)
      console.log(`🔧 Equipamentos: ${equipmentCount[0].count}`)

      if (adminCount[0].count === 0) {
        console.log("⚠️ Criando usuário admin...")
        await createAdminUser(sql)
      }

      if (categoryCount[0].count === 0) {
        console.log("⚠️ Criando categorias...")
        await createCategories(sql)
      }

      console.log("🎉 BANCO PRONTO PARA USO!")
    } else {
      console.log("⚠️ Tabelas faltando:", missingTables)
      console.log("🔨 Execute o Prisma para criar as tabelas:")
      console.log("   npx prisma db push")
    }
  } catch (error) {
    console.error("❌ Erro:", error.message)
  }
}

async function createAdminUser(sql) {
  const bcrypt = await import("bcryptjs")
  const hashedPassword = await bcrypt.hash("admin123", 12)

  await sql`
    INSERT INTO "User" (name, email, password, role)
    VALUES ('Administrador', 'admin@gblocacoes.com', ${hashedPassword}, 'ADMIN')
  `
  console.log("✅ Admin criado: admin@gblocacoes.com / admin123")
}

async function createCategories(sql) {
  const categories = [
    { name: "Andaimes e Escadas", icon: "Ladder", color: "#3b82f6" },
    { name: "Betoneiras", icon: "Settings", color: "#ef4444" },
    { name: "Compressores", icon: "Zap", color: "#f59e0b" },
    { name: "Ferramentas Elétricas", icon: "Wrench", color: "#10b981" },
    { name: "Geradores", icon: "Battery", color: "#8b5cf6" },
  ]

  for (const cat of categories) {
    await sql`
      INSERT INTO "Category" (name, description, icon, color)
      VALUES (${cat.name}, ${"Equipamentos de " + cat.name.toLowerCase()}, ${cat.icon}, ${cat.color})
    `
  }
  console.log("✅ Categorias criadas!")
}

minimalSetup()
