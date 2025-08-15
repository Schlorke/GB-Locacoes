import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'
import { JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema'
import { BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema'

export const SettingScalarWhereWithAggregatesInputObjectSchema: z.ZodType<
  Prisma.SettingScalarWhereWithAggregatesInput,
  Prisma.SettingScalarWhereWithAggregatesInput
> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SettingScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => SettingScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SettingScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SettingScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => SettingScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    companyPhone: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    companyIconUrl: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    aboutUsText: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    companyAddress: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    heroCarousel: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
    contactEmail: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    socialLinks: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
    seoTitle: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    seoDescription: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    themeColorPrimary: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    maintenanceMode: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    analyticsTrackingId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    footerText: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    businessHours: z
      .lazy(() => JsonWithAggregatesFilterObjectSchema)
      .optional(),
    supportChat: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    whatsappNumber: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    favicon: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    logoSecondary: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    defaultLanguage: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    baseCurrency: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    maintenanceMessage: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    smtpConfig: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
    uploadLimits: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
    securityConfig: z
      .lazy(() => JsonWithAggregatesFilterObjectSchema)
      .optional(),
    customCss: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    customJs: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict()
export const SettingScalarWhereWithAggregatesInputObjectZodSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => SettingScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => SettingScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SettingScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SettingScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => SettingScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    companyPhone: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    companyIconUrl: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    aboutUsText: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    companyAddress: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    heroCarousel: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
    contactEmail: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    socialLinks: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
    seoTitle: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    seoDescription: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    themeColorPrimary: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    maintenanceMode: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    analyticsTrackingId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    footerText: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    businessHours: z
      .lazy(() => JsonWithAggregatesFilterObjectSchema)
      .optional(),
    supportChat: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    whatsappNumber: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    favicon: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    logoSecondary: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    defaultLanguage: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    baseCurrency: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    maintenanceMessage: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    smtpConfig: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
    uploadLimits: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
    securityConfig: z
      .lazy(() => JsonWithAggregatesFilterObjectSchema)
      .optional(),
    customCss: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    customJs: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict()
