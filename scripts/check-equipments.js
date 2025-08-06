// Script de verificação dos equipamentos no banco
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verificarEquipamentos() {
  try {
    console.error('🔍 Verificando equipamentos no banco...')

    const equipamentos = await prisma.equipment.findMany({
      include: {
        category: true,
      },
    })

    console.error(`✅ Total de equipamentos: ${equipamentos.length}`)

    if (equipamentos.length > 0) {
      console.error('📋 Equipamentos encontrados:')
      equipamentos.forEach((eq, index) => {
        console.error(
          `${index + 1}. ${eq.name} - R$ ${eq.pricePerDay}/dia - ${eq.category.name}`
        )
      })
    } else {
      console.error('❌ Nenhum equipamento encontrado. Execute: pnpm db:seed')
    }
  } catch (error) {
    console.error('❌ Erro ao verificar:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

verificarEquipamentos()
