const { PrismaClient } = require("@prisma/client")

async function fixPrices() {
  const prisma = new PrismaClient()

  try {
    console.log("🔄 Buscando equipamentos...")

    const equipments = await prisma.equipment.findMany()
    console.log(`📊 Encontrados ${equipments.length} equipamentos`)

    for (const equipment of equipments) {
      let newPrice = equipment.dailyPrice

      // Se preço > 1000, dividir por 100
      if (equipment.dailyPrice > 1000) {
        newPrice = Math.round(equipment.dailyPrice / 100)

        await prisma.equipment.update({
          where: { id: equipment.id },
          data: { dailyPrice: newPrice },
        })

        console.log(`💰 ${equipment.name}: R$ ${equipment.dailyPrice} → R$ ${newPrice}`)
      } else {
        console.log(`✅ ${equipment.name}: R$ ${equipment.dailyPrice} (OK)`)
      }
    }

    console.log("✅ Concluído!")
  } catch (error) {
    console.error("❌ Erro:", error)
  } finally {
    await prisma.$disconnect()
  }
}

fixPrices()
