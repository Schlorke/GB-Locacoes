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
        socialLinks: true,
      },
    })

    // Valores padrão caso não exista configuração no banco
    const defaultSettings = {
      companyPhone: '(51) 2313-6262',
      whatsappNumber: '(51) 99820-5163',
      contactEmail: 'contato@locacoesgb.com.br',
      companyAddress:
        'Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS - CEP 90240-100',
      socialLinks: {},
    }

    return NextResponse.json(settings || defaultSettings)
  } catch (error) {
    console.error('Erro ao buscar configurações públicas:', error)
    // Retornar valores padrão em caso de erro
    return NextResponse.json({
      companyPhone: '(51) 2313-6262',
      whatsappNumber: '(51) 99820-5163',
      contactEmail: 'contato@locacoesgb.com.br',
      companyAddress:
        'Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS - CEP 90240-100',
      socialLinks: {},
    })
  }
}
