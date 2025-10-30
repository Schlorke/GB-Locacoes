import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedCompanyDefaultData() {
  console.log('🌱 Iniciando seed dos dados padrão da empresa GB Locações...')

  try {
    // Buscar a configuração existente
    const existingSettings = await prisma.setting.findFirst()

    const defaultData = {
      companyPhone: '(51) 2313-6262',
      whatsappNumber: '(51) 99820-5163',
      contactEmail: 'contato@locacoesgb.com.br',
      marketingEmail: 'comercial@locacoesgb.com.br',
      companyAddress:
        'Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS - CEP 90240-100',
      aboutUsText:
        'Especializada em locação de equipamentos para construção civil em Porto Alegre há mais de 10 anos. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos para altura.',
      seoTitle: 'GB Locações - Equipamentos para Construção',
      seoDescription:
        'Locação de equipamentos para construção civil com qualidade e segurança',
      themeColorPrimary: '#ea580c',
    }

    if (!existingSettings) {
      // Criar nova configuração com dados padrão
      await prisma.setting.create({
        data: defaultData,
      })
      console.log('✅ Configuração criada com dados padrão da GB Locações')
    } else {
      // Atualizar apenas campos vazios/nulos
      const updates: Record<string, string> = {}

      if (!existingSettings.companyPhone) {
        updates.companyPhone = defaultData.companyPhone
      }
      if (!existingSettings.whatsappNumber) {
        updates.whatsappNumber = defaultData.whatsappNumber
      }
      if (!existingSettings.contactEmail) {
        updates.contactEmail = defaultData.contactEmail
      }
      if (!existingSettings.marketingEmail) {
        updates.marketingEmail = defaultData.marketingEmail
      }
      if (!existingSettings.companyAddress) {
        updates.companyAddress = defaultData.companyAddress
      }
      if (!existingSettings.aboutUsText) {
        updates.aboutUsText = defaultData.aboutUsText
      }

      if (Object.keys(updates).length > 0) {
        await prisma.setting.update({
          where: { id: existingSettings.id },
          data: updates,
        })
        console.log(
          `✅ ${Object.keys(updates).length} campo(s) atualizado(s) com valores padrão`
        )
        console.log('   Campos atualizados:', Object.keys(updates).join(', '))
      } else {
        console.log('ℹ️  Todos os campos já possuem valores no banco de dados')
      }
    }

    console.log('🎉 Seed concluído com sucesso!')
    console.log('\n📋 Valores padrão garantidos:')
    console.log('   📞 Telefone: (51) 2313-6262')
    console.log('   📱 WhatsApp: (51) 99820-5163')
    console.log('   📧 Email: contato@locacoesgb.com.br')
    console.log(
      '   📍 Endereço: Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS'
    )
    console.log('   📝 Sobre: Especializada em locação de equipamentos...')
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedCompanyDefaultData().catch((error) => {
  console.error(error)
  process.exit(1)
})
