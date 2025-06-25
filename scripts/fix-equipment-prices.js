const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function fixPrices() {
  try {
    console.log("🔧 Corrigindo preços dos equipamentos...")

    // Buscar todos os equipamentos
    const equipments = await prisma.equipment.findMany()

    console.log(`Encontrados ${equipments.length} equipamentos`)

    // Corrigir preços absurdos
    for (const equipment of equipments) {
      let newPrice = equipment.pricePerDay

      // Se o preço for muito alto, ajustar para valores realistas
      if (equipment.pricePerDay > 1000) {
        if (equipment.name.toLowerCase().includes("betoneira")) {
          newPrice = 80 // R$ 80/dia para betoneira
        } else if (equipment.name.toLowerCase().includes("escavadeira")) {
          newPrice = 350 // R$ 350/dia para escavadeira
        } else {
          newPrice = Math.min(equipment.pricePerDay / 100, 500) // Dividir por 100 ou máximo 500
        }

        await prisma.equipment.update({
          where: { id: equipment.id },
          data: { pricePerDay: newPrice },
        })

        console.log(`✅ ${equipment.name}: R$ ${equipment.pricePerDay} → R$ ${newPrice}`)
      }
    }

    console.log("✅ Preços corrigidos com sucesso!")
  } catch (error) {
    console.error("❌ Erro ao corrigir preços:", error)
  } finally {
    await prisma.$disconnect()
  }
}

fixPrices()
