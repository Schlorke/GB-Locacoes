import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Buscar configurações públicas (telefones, endereço, etc.)
export async function GET() {
  try {
    const settings = await prisma.setting.findFirst({
      select: {
        companyPhone: true,
        whatsappNumber: true,
        contactEmail: true,
        companyAddress: true,
        companyIconUrl: true,
        marketingEmail: true,
        socialLinks: true,
      },
    })

    // Valores padrão caso não exista configuração no banco
    const defaultSettings = {
      companyPhone: '(51) 2313-6262',
      whatsappNumber: '(51) 99820-5163',
      contactEmail: 'contato@locacoesgb.com.br',
      marketingEmail: 'comercial@locacoesgb.com.br',
      companyAddress:
        'Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS - CEP 90240-100',
      companyIconUrl: '', // Vazio = usa logo padrão "GB"
      socialLinks: {},
    }

    // Retornar settings ou valores padrão, garantindo que valores vazios sejam substituídos por padrões
    const result = settings
      ? {
          companyPhone: settings.companyPhone || defaultSettings.companyPhone,
          whatsappNumber:
            settings.whatsappNumber || defaultSettings.whatsappNumber,
          contactEmail: settings.contactEmail || defaultSettings.contactEmail,
          marketingEmail:
            settings.marketingEmail || defaultSettings.marketingEmail,
          companyAddress:
            settings.companyAddress || defaultSettings.companyAddress,
          companyIconUrl: settings.companyIconUrl || '',
          socialLinks: settings.socialLinks || {},
        }
      : defaultSettings

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erro ao buscar configurações públicas:', error)
    // Retornar valores padrão em caso de erro
    return NextResponse.json({
      companyPhone: '(51) 2313-6262',
      whatsappNumber: '(51) 99820-5163',
      contactEmail: 'contato@locacoesgb.com.br',
      marketingEmail: 'comercial@locacoesgb.com.br',
      companyAddress:
        'Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS - CEP 90240-100',
      companyIconUrl: '', // Vazio = usa logo padrão "GB"
      socialLinks: {},
    })
  }
}
