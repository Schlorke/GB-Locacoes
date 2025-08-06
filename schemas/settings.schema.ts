import { z } from 'zod'

// Schema para itens do carousel
export const HeroCarouselItemSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().min(1, 'URL da imagem é obrigatória'),
  title: z.string().optional(),
  description: z.string().optional(),
  link: z.string().optional(),
  order: z.number().optional(),
})

// Schema para links sociais
export const SocialLinksSchema = z.object({
  facebook: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  whatsapp: z.string().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
})

// Schema para horário de funcionamento
export const BusinessHoursSchema = z.object({
  monday: z
    .object({
      open: z.string().optional(),
      close: z.string().optional(),
      closed: z.boolean().default(false),
    })
    .optional(),
  tuesday: z
    .object({
      open: z.string().optional(),
      close: z.string().optional(),
      closed: z.boolean().default(false),
    })
    .optional(),
  wednesday: z
    .object({
      open: z.string().optional(),
      close: z.string().optional(),
      closed: z.boolean().default(false),
    })
    .optional(),
  thursday: z
    .object({
      open: z.string().optional(),
      close: z.string().optional(),
      closed: z.boolean().default(false),
    })
    .optional(),
  friday: z
    .object({
      open: z.string().optional(),
      close: z.string().optional(),
      closed: z.boolean().default(false),
    })
    .optional(),
  saturday: z
    .object({
      open: z.string().optional(),
      close: z.string().optional(),
      closed: z.boolean().default(false),
    })
    .optional(),
  sunday: z
    .object({
      open: z.string().optional(),
      close: z.string().optional(),
      closed: z.boolean().default(false),
    })
    .optional(),
})

// Schema para configurações SMTP
export const SmtpConfigSchema = z.object({
  host: z.string().optional(),
  port: z.number().optional(),
  secure: z.boolean().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fromEmail: z.string().email().optional().or(z.literal('')),
  fromName: z.string().optional(),
})

// Schema para limites de upload
export const UploadLimitsSchema = z.object({
  maxFileSize: z.number().positive().optional(),
  allowedTypes: z.array(z.string()).optional(),
  maxFiles: z.number().positive().optional(),
})

// Schema para configurações de segurança
export const SecurityConfigSchema = z.object({
  enableRecaptcha: z.boolean().optional(),
  recaptchaSiteKey: z.string().optional(),
  recaptchaSecretKey: z.string().optional(),
  enable2FA: z.boolean().optional(),
  sessionTimeout: z.number().positive().optional(),
  maxLoginAttempts: z.number().positive().optional(),
})

// Schema principal para configurações
export const SettingsSchema = z.object({
  // Informações da empresa
  companyPhone: z.string().optional(),
  companyIconUrl: z.string().url().optional().or(z.literal('')),
  aboutUsText: z.string().optional(),
  companyAddress: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  whatsappNumber: z.string().optional(),

  // Hero Carousel
  heroCarousel: z.array(HeroCarouselItemSchema).optional(),

  // Redes sociais
  socialLinks: SocialLinksSchema.optional(),

  // SEO
  seoTitle: z
    .string()
    .min(1, 'Título SEO é obrigatório')
    .max(60, 'Título muito longo'),
  seoDescription: z
    .string()
    .min(1, 'Descrição SEO é obrigatória')
    .max(160, 'Descrição muito longa'),

  // Tema e aparência
  themeColorPrimary: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, 'Cor deve ser em formato hexadecimal'),
  favicon: z.string().url().optional().or(z.literal('')),
  logoSecondary: z.string().url().optional().or(z.literal('')),

  // Manutenção
  maintenanceMode: z.boolean().default(false),
  maintenanceMessage: z.string().optional(),

  // Analytics
  analyticsTrackingId: z.string().optional(),

  // Conteúdo
  footerText: z.string().optional(),

  // Horário de funcionamento
  businessHours: BusinessHoursSchema.optional(),

  // Suporte
  supportChat: z.boolean().default(true),

  // Localização
  defaultLanguage: z.string().default('pt-BR'),
  baseCurrency: z.string().default('BRL'),

  // Configurações técnicas
  smtpConfig: SmtpConfigSchema.optional(),
  uploadLimits: UploadLimitsSchema.optional(),
  securityConfig: SecurityConfigSchema.optional(),

  // Customização
  customCss: z.string().optional(),
  customJs: z.string().optional(),
})

export type SettingsInput = z.infer<typeof SettingsSchema>
export type HeroCarouselItem = z.infer<typeof HeroCarouselItemSchema>
export type SocialLinks = z.infer<typeof SocialLinksSchema>
export type BusinessHours = z.infer<typeof BusinessHoursSchema>
export type SmtpConfig = z.infer<typeof SmtpConfigSchema>
export type UploadLimits = z.infer<typeof UploadLimitsSchema>
export type SecurityConfig = z.infer<typeof SecurityConfigSchema>
