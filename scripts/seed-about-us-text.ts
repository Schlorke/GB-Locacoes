import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedAboutUsText() {
  console.log('🌱 Iniciando seed do campo aboutUsText...')

  try {
    // Buscar a configuração existente
    const existingSettings = await prisma.setting.findFirst()

    const defaultAboutUsText =
      'Especializada em locação de equipamentos para construção civil em Porto Alegre há mais de 10 anos. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos para altura.'

    if (!existingSettings) {
      // Criar nova configuração com aboutUsText
      await prisma.setting.create({
        data: {
          aboutUsText: defaultAboutUsText,
          seoTitle: 'GB Locações - Equipamentos para Construção',
          seoDescription:
            'Locação de equipamentos para construção civil com qualidade e segurança',
        },
      })
      console.log('✅ Configuração criada com aboutUsText padrão')
    } else if (!existingSettings.aboutUsText) {
      // Atualizar configuração existente
      await prisma.setting.update({
        where: { id: existingSettings.id },
        data: {
          aboutUsText: defaultAboutUsText,
        },
      })
      console.log('✅ aboutUsText atualizado com valor padrão')
    } else {
      console.log('ℹ️  aboutUsText já existe no banco de dados')
    }

    console.log('🎉 Seed concluído com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedAboutUsText().catch((error) => {
  console.error(error)
  process.exit(1)
})
