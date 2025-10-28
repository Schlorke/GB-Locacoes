import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedCompanyPhones() {
  try {
    console.log('🔧 Populando banco de dados com telefones da empresa...')

    // Verificar se já existe configuração
    const existingSettings = await prisma.setting.findFirst()

    if (existingSettings) {
      // Atualizar configuração existente
      await prisma.setting.update({
        where: { id: existingSettings.id },
        data: {
          companyPhone: '(51) 2313-6262',
          whatsappNumber: '(51) 99820-5163',
          contactEmail: 'contato@locacoesgb.com.br',
          companyAddress:
            'Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS - CEP 90240-100',
        },
      })
      console.log('✅ Configurações atualizadas com sucesso!')
    } else {
      // Criar nova configuração
      await prisma.setting.create({
        data: {
          companyPhone: '(51) 2313-6262',
          whatsappNumber: '(51) 99820-5163',
          contactEmail: 'contato@locacoesgb.com.br',
          companyAddress:
            'Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS - CEP 90240-100',
          seoTitle: 'GB Locações - Equipamentos para Construção',
          seoDescription:
            'Locação de equipamentos para construção civil com qualidade e segurança',
          themeColorPrimary: '#ea580c',
          maintenanceMode: false,
          supportChat: true,
          defaultLanguage: 'pt-BR',
          baseCurrency: 'BRL',
        },
      })
      console.log('✅ Configurações criadas com sucesso!')
    }

    console.log('📞 Telefones da empresa:')
    console.log('   - Fixo: (51) 2313-6262')
    console.log('   - WhatsApp: (51) 99820-5163')
    console.log('✅ Seed executado com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao popular telefones:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedCompanyPhones()
