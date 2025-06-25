const { neon } = require("@neondatabase/serverless")

async function seedCategories() {
  console.log("🌱 [SEED-CATEGORIES] Inserindo categorias...")

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL não encontrada")
    return
  }

  const sql = neon(process.env.DATABASE_URL)

  const categories = [
    {
      name: "Andaimes e Escadas",
      description: "Andaimes tubulares, suspensos e escadas para trabalho em altura",
      slug: "andaimes-escadas",
    },
    {
      name: "Betoneiras e Misturadores",
      description: "Betoneiras elétricas e a combustão para preparo de concreto",
      slug: "betoneiras-misturadores",
    },
    {
      name: "Compressores",
      description: "Compressores de ar para ferramentas pneumáticas",
      slug: "compressores",
    },
    {
      name: "Ferramentas Elétricas",
      description: "Furadeiras, serras, rompedores e outras ferramentas elétricas",
      slug: "ferramentas-eletricas",
    },
    {
      name: "Equipamentos de Elevação",
      description: "Guindastes, talhas e equipamentos para movimentação de cargas",
      slug: "equipamentos-elevacao",
    },
    {
      name: "Geradores",
      description: "Geradores de energia elétrica para obras",
      slug: "geradores",
    },
  ]

  try {
    // Check if categories already exist
    const existingCount = await sql`SELECT COUNT(*) as count FROM "Category"`

    if (existingCount[0].count > 0) {
      console.log(`ℹ️ Já existem ${existingCount[0].count} categorias no banco`)
      return
    }

    // Insert categories
    for (const category of categories) {
      await sql`
        INSERT INTO "Category" (id, name, description, slug, "createdAt", "updatedAt")
        VALUES (
          gen_random_uuid(),
          ${category.name},
          ${category.description}, 
          ${category.slug},
          NOW(),
          NOW()
        )
      `
      console.log(`✅ Categoria criada: ${category.name}`)
    }

    console.log("🎉 Todas as categorias foram criadas com sucesso!")
  } catch (error) {
    console.error("❌ Erro ao criar categorias:", error.message)
  }
}

seedCategories()
