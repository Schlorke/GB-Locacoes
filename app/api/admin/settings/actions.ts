'use server'

import { authOptions } from '@/lib/auth'
import { getPrisma } from '@/lib/prisma'
import { SettingsInput, SettingsSchema } from '@/schemas/settings.schema'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function getSettings() {
  try {
    const prisma = await getPrisma()
    // Busca a primeira configuração ou cria uma padrão
    let settings = await prisma.setting.findFirst()

    if (!settings) {
      settings = await prisma.setting.create({
        data: {
          seoTitle: 'GB Locações - Equipamentos para Construção',
          seoDescription:
            'Locação de equipamentos para construção civil com qualidade e segurança',
          themeColorPrimary: '#ea580c',
          heroCarousel: [],
          socialLinks: {},
          businessHours: {},
          smtpConfig: {},
          uploadLimits: {},
          securityConfig: {},
        },
      })
    }

    return {
      success: true,
      data: {
        ...settings,
        heroCarousel: Array.isArray(settings.heroCarousel)
          ? settings.heroCarousel
          : [],
        socialLinks:
          typeof settings.socialLinks === 'object' ? settings.socialLinks : {},
        businessHours:
          typeof settings.businessHours === 'object'
            ? settings.businessHours
            : {},
        smtpConfig:
          typeof settings.smtpConfig === 'object' ? settings.smtpConfig : {},
        uploadLimits:
          typeof settings.uploadLimits === 'object'
            ? settings.uploadLimits
            : {},
        securityConfig:
          typeof settings.securityConfig === 'object'
            ? settings.securityConfig
            : {},
      },
    }
  } catch (error) {
    console.error('Erro ao buscar configurações:', error)
    return {
      success: false,
      error: 'Erro ao carregar configurações',
    }
  }
}

export async function updateSettings(data: SettingsInput) {
  try {
    const prisma = await getPrisma()
    // Verificar autenticação
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return {
        success: false,
        error:
          'Acesso negado. Apenas administradores podem alterar configurações.',
      }
    }

    // Validar dados
    const validatedData = SettingsSchema.parse(data)

    // Buscar configuração existente ou criar uma nova
    const existingSettings = await prisma.setting.findFirst()

    let settings
    if (existingSettings) {
      settings = await prisma.setting.update({
        where: { id: existingSettings.id },
        data: {
          companyPhone: validatedData.companyPhone || '',
          companyIconUrl: validatedData.companyIconUrl || '',
          aboutUsText: validatedData.aboutUsText || '',
          companyAddress: validatedData.companyAddress || '',
          heroCarousel: validatedData.heroCarousel || [],
          contactEmail: validatedData.contactEmail || '',
          socialLinks: validatedData.socialLinks || {},
          seoTitle: validatedData.seoTitle,
          seoDescription: validatedData.seoDescription,
          themeColorPrimary: validatedData.themeColorPrimary,
          maintenanceMode: validatedData.maintenanceMode || false,
          analyticsTrackingId: validatedData.analyticsTrackingId || '',
          footerText: validatedData.footerText || '',
          businessHours: validatedData.businessHours || {},
          supportChat:
            validatedData.supportChat !== undefined
              ? validatedData.supportChat
              : true,
          whatsappNumber: validatedData.whatsappNumber || '',
          favicon: validatedData.favicon || '',
          logoSecondary: validatedData.logoSecondary || '',
          defaultLanguage: validatedData.defaultLanguage || 'pt-BR',
          baseCurrency: validatedData.baseCurrency || 'BRL',
          maintenanceMessage: validatedData.maintenanceMessage || '',
          smtpConfig: validatedData.smtpConfig || {},
          uploadLimits: validatedData.uploadLimits || {},
          securityConfig: validatedData.securityConfig || {},
          customCss: validatedData.customCss || '',
          customJs: validatedData.customJs || '',
        },
      })
    } else {
      settings = await prisma.setting.create({
        data: {
          companyPhone: validatedData.companyPhone || '',
          companyIconUrl: validatedData.companyIconUrl || '',
          aboutUsText: validatedData.aboutUsText || '',
          companyAddress: validatedData.companyAddress || '',
          heroCarousel: validatedData.heroCarousel || [],
          contactEmail: validatedData.contactEmail || '',
          socialLinks: validatedData.socialLinks || {},
          seoTitle: validatedData.seoTitle,
          seoDescription: validatedData.seoDescription,
          themeColorPrimary: validatedData.themeColorPrimary,
          maintenanceMode: validatedData.maintenanceMode || false,
          analyticsTrackingId: validatedData.analyticsTrackingId || '',
          footerText: validatedData.footerText || '',
          businessHours: validatedData.businessHours || {},
          supportChat:
            validatedData.supportChat !== undefined
              ? validatedData.supportChat
              : true,
          whatsappNumber: validatedData.whatsappNumber || '',
          favicon: validatedData.favicon || '',
          logoSecondary: validatedData.logoSecondary || '',
          defaultLanguage: validatedData.defaultLanguage || 'pt-BR',
          baseCurrency: validatedData.baseCurrency || 'BRL',
          maintenanceMessage: validatedData.maintenanceMessage || '',
          smtpConfig: validatedData.smtpConfig || {},
          uploadLimits: validatedData.uploadLimits || {},
          securityConfig: validatedData.securityConfig || {},
          customCss: validatedData.customCss || '',
          customJs: validatedData.customJs || '',
        },
      })
    }

    // Revalidar cache
    revalidatePath('/admin/settings')
    revalidatePath('/')

    return {
      success: true,
      data: settings,
      message: 'Configurações atualizadas com sucesso!',
    }
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Erro interno do servidor',
    }
  }
}

export async function toggleMaintenanceMode(enabled: boolean) {
  try {
    const prisma = await getPrisma()
    // Verificar autenticação
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return {
        success: false,
        error: 'Acesso negado.',
      }
    }

    const existingSettings = await prisma.setting.findFirst()

    let settings
    if (existingSettings) {
      settings = await prisma.setting.update({
        where: { id: existingSettings.id },
        data: { maintenanceMode: enabled },
      })
    } else {
      settings = await prisma.setting.create({
        data: {
          maintenanceMode: enabled,
          seoTitle: 'GB Locações - Equipamentos para Construção',
          seoDescription:
            'Locação de equipamentos para construção civil com qualidade e segurança',
          themeColorPrimary: '#ea580c',
        },
      })
    }

    revalidatePath('/admin/settings')
    revalidatePath('/')

    return {
      success: true,
      data: settings,
      message: `Modo manutenção ${enabled ? 'ativado' : 'desativado'} com sucesso!`,
    }
  } catch (error) {
    console.error('Erro ao alterar modo manutenção:', error)
    return {
      success: false,
      error: 'Erro interno do servidor',
    }
  }
}
