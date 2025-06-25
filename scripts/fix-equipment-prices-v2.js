import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

async function fixEquipmentPrices() {
  try {
    console.log("🔄 Gerando Prisma Client...")
    await execAsync("npx prisma generate")
    console.log("✅ Prisma Client gerado com sucesso!")

    // Agora importa o Prisma
    const { PrismaClient } = await import("@prisma/client")
    const prisma = new PrismaClient()

    console.log("🔄 Conectando ao banco de dados...")

    // Buscar todos os equipamentos
    const equipments = await prisma.equipment.findMany()
    console.log(`📊 Encontrados ${equipments.length} equipamentos`)

    // Corrigir preços (dividir por 100 se estiver muito alto)
    for (const equipment of equipments) {
      let newPrice = equipment.dailyPrice

      // Se o preço for maior que 1000, dividir por 100
      if (equipment.dailyPrice > 1000) {
        newPrice = Math.round(equipment.dailyPrice / 100)

        await prisma.equipment.update({
          where: { id: equipment.id },
          data: { dailyPrice: newPrice },
        })

        console.log(`💰 ${equipment.name}: R$ ${equipment.dailyPrice} → R$ ${newPrice}`)
      } else {
        console.log(`✅ ${equipment.name}: R$ ${equipment.dailyPrice} (já está correto)`)
      }
    }

    console.log("✅ Preços corrigidos com sucesso!")
    await prisma.$disconnect()
  } catch (error) {
    console.error("❌ Erro:", error)
    process.exit(1)
  }
}

fixEquipmentPrices()
