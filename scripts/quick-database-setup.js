const { neon } = require("@neondatabase/serverless")

async function quickSetup() {
  console.log("🚀 [QUICK-SETUP] Configuração rápida do banco...")

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL não encontrada")
    console.log("👉 Configure a integração do Neon primeiro!")
    return
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    // 1. Verificar se já existe admin
    console.log("👤 Verificando usuário admin...")
    let adminExists = false
    try {
      const adminCheck = await sql`
        SELECT COUNT(*) as count FROM "User" WHERE role = 'ADMIN'
      `
      adminExists = adminCheck[0].count > 0
      console.log(`👨‍💼 Admin existe: ${adminExists ? "SIM" : "NÃO"}`)
    } catch (error) {
      console.log("⚠️ Tabela User pode não existir ainda")
    }

    // 2. Criar admin se não existir
    if (!adminExists) {
      console.log("🔨 Criando usuário admin...")
      try {
        await sql`
          INSERT INTO "User" (id, name, email, role, "createdAt", "updatedAt")
          VALUES (
            gen_random_uuid(),
            'Administrador',
            'admin@gblocacoes.com',
            'ADMIN',
            NOW(),
            NOW()
          )
          ON CONFLICT (email) DO NOTHING
        `
        console.log("✅ Usuário admin criado!")
      } catch (error) {
        console.log("⚠️ Erro ao criar admin:", error.message)
      }
    }

    // 3. Verificar categorias
    console.log("📂 Verificando categorias...")
    let categoryCount = 0
    try {
      const categoryCheck = await sql`SELECT COUNT(*) as count FROM "Category"`
      categoryCount = categoryCheck[0].count
      console.log(`📁 Categorias existentes: ${categoryCount}`)
    } catch (error) {
      console.log("⚠️ Tabela Category pode não existir ainda")
    }

    // 4. Criar categorias se não existirem
    if (categoryCount === 0) {
      console.log("🌱 Criando categorias...")
      const categories = [
        { name: "Andaimes e Escadas", slug: "andaimes-escadas" },
        { name: "Betoneiras", slug: "betoneiras" },
        { name: "Compressores", slug: "compressores" },
        { name: "Ferramentas Elétricas", slug: "ferramentas-eletricas" },
        { name: "Geradores", slug: "geradores" },
      ]

      for (const cat of categories) {
        try {
          await sql`
            INSERT INTO "Category" (id, name, description, slug, "createdAt", "updatedAt")
            VALUES (
              gen_random_uuid(),
              ${cat.name},
              ${"Equipamentos de " + cat.name.toLowerCase()},
              ${cat.slug},
              NOW(),
              NOW()
            )
          `
          console.log(`✅ Categoria criada: ${cat.name}`)
        } catch (error) {
          console.log(`⚠️ Erro ao criar categoria ${cat.name}:`, error.message)
        }
      }
    }

    console.log("\n🎉 CONFIGURAÇÃO CONCLUÍDA!")
    console.log("👉 Agora você pode:")
    console.log("   • Acessar /admin/login")
    console.log("   • Email: admin@gblocacoes.com")
    console.log("   • Criar equipamentos no painel admin")
  } catch (error) {
    console.error("❌ Erro na configuração:", error.message)
  }
}

quickSetup()
