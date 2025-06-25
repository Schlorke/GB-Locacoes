const { neon } = require("@neondatabase/serverless")

async function createSampleEquipment() {
  console.log("🏗️ [SAMPLE-EQUIPMENT] Criando equipamentos de exemplo...")

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL não encontrada")
    return
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    // Get categories
    const categories = await sql`SELECT id, slug FROM "Category"`

    if (categories.length === 0) {
      console.log("⚠️ Nenhuma categoria encontrada. Execute seed-categories.js primeiro")
      return
    }

    const sampleEquipment = [
      {
        name: "Betoneira 400L Elétrica",
        description: "Betoneira elétrica de 400 litros, ideal para obras de médio porte",
        dailyPrice: 45.0,
        categorySlug: "betoneiras-misturadores",
        specifications: "Motor: 2HP, Capacidade: 400L, Voltagem: 220V",
      },
      {
        name: "Andaime Tubular 2m",
        description: "Andaime tubular galvanizado, altura 2 metros",
        dailyPrice: 25.0,
        categorySlug: "andaimes-escadas",
        specifications: "Altura: 2m, Material: Aço galvanizado, Carga: 200kg/m²",
      },
      {
        name: "Compressor 10 Pés",
        description: "Compressor de ar 10 pés cúbicos, ideal para ferramentas pneumáticas",
        dailyPrice: 35.0,
        categorySlug: "compressores",
        specifications: "Capacidade: 10 pés³, Pressão: 175 PSI, Motor: 2HP",
      },
      {
        name: "Furadeira de Impacto",
        description: "Furadeira de impacto profissional para concreto",
        dailyPrice: 20.0,
        categorySlug: "ferramentas-eletricas",
        specifications: "Potência: 850W, Mandril: 13mm, Impacto: 48.000 bpm",
      },
    ]

    // Check if equipment already exists
    const existingCount = await sql`SELECT COUNT(*) as count FROM "Equipment"`

    if (existingCount[0].count > 0) {
      console.log(`ℹ️ Já existem ${existingCount[0].count} equipamentos no banco`)
      return
    }

    // Insert equipment
    for (const equipment of sampleEquipment) {
      const category = categories.find((c) => c.slug === equipment.categorySlug)

      if (!category) {
        console.log(`⚠️ Categoria não encontrada: ${equipment.categorySlug}`)
        continue
      }

      await sql`
        INSERT INTO "Equipment" (
          id, name, description, "dailyPrice", "categoryId", 
          specifications, available, "createdAt", "updatedAt"
        )
        VALUES (
          gen_random_uuid(),
          ${equipment.name},
          ${equipment.description},
          ${equipment.dailyPrice},
          ${category.id},
          ${equipment.specifications},
          true,
          NOW(),
          NOW()
        )
      `
      console.log(`✅ Equipamento criado: ${equipment.name}`)
    }

    console.log("🎉 Equipamentos de exemplo criados com sucesso!")
  } catch (error) {
    console.error("❌ Erro ao criar equipamentos:", error.message)
  }
}

createSampleEquipment()
