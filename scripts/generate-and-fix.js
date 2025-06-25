const { exec } = require("child_process")
const util = require("util")
const execPromise = util.promisify(exec)

async function generateAndFix() {
  try {
    console.log("🔄 Gerando Prisma Client...")
    await execPromise("npx prisma generate")
    console.log("✅ Prisma Client gerado!")

    // Agora importa o Prisma após gerar
    const { PrismaClient } = require("@prisma/client")
    const prisma = new PrismaClient()

    console.log("🔄 Buscando equipamentos...")
    const equipments = await prisma.equipment.findMany()
    console.log(`📊 Encontrados ${equipments.length} equipamentos`)

    for (const equipment of equipments) {
      let newPrice = equipment.pricePerDay

      // Se preço > 1000, dividir por 100
      if (equipment.pricePerDay > 1000) {
        newPrice = Math.round(equipment.pricePerDay / 100)

        await prisma.equipment.update({
          where: { id: equipment.id },
          data: { pricePerDay: newPrice },
        })

        console.log(`💰 ${equipment.name}: R$ ${equipment.pricePerDay} → R$ ${newPrice}`)
      } else {
        console.log(`✅ ${equipment.name}: R$ ${equipment.pricePerDay} (OK)`)
      }
    }

    console.log("✅ Preços corrigidos!")
    await prisma.$disconnect()
  } catch (error) {
    console.error("❌ Erro:", error)
  }
}

generateAndFix()
