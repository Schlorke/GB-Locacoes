import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.literal(true).optional(),
      companyPhone: z.literal(true).optional(),
      companyIconUrl: z.literal(true).optional(),
      aboutUsText: z.literal(true).optional(),
      companyAddress: z.literal(true).optional(),
      contactEmail: z.literal(true).optional(),
      seoTitle: z.literal(true).optional(),
      seoDescription: z.literal(true).optional(),
      themeColorPrimary: z.literal(true).optional(),
      maintenanceMode: z.literal(true).optional(),
      analyticsTrackingId: z.literal(true).optional(),
      footerText: z.literal(true).optional(),
      supportChat: z.literal(true).optional(),
      whatsappNumber: z.literal(true).optional(),
      favicon: z.literal(true).optional(),
      logoSecondary: z.literal(true).optional(),
      defaultLanguage: z.literal(true).optional(),
      baseCurrency: z.literal(true).optional(),
      maintenanceMessage: z.literal(true).optional(),
      customCss: z.literal(true).optional(),
      customJs: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict()
export const SettingMinAggregateInputObjectSchema: z.ZodType<Prisma.SettingMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.SettingMinAggregateInputType>
export const SettingMinAggregateInputObjectZodSchema = makeSchema()
