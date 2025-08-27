import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'
import { JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema'
import { BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema'
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
      OR: z.lazy(makeSchema).array().optional(),
      NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
      id: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      companyPhone: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      companyIconUrl: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      aboutUsText: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      companyAddress: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      heroCarousel: z
        .lazy(() => JsonWithAggregatesFilterObjectSchema)
        .optional(),
      contactEmail: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      socialLinks: z
        .lazy(() => JsonWithAggregatesFilterObjectSchema)
        .optional(),
      seoTitle: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      seoDescription: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      themeColorPrimary: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      maintenanceMode: z
        .union([
          z.lazy(() => BoolWithAggregatesFilterObjectSchema),
          z.boolean(),
        ])
        .optional(),
      analyticsTrackingId: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      footerText: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      businessHours: z
        .lazy(() => JsonWithAggregatesFilterObjectSchema)
        .optional(),
      supportChat: z
        .union([
          z.lazy(() => BoolWithAggregatesFilterObjectSchema),
          z.boolean(),
        ])
        .optional(),
      whatsappNumber: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      favicon: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      logoSecondary: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      defaultLanguage: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      baseCurrency: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      maintenanceMessage: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      smtpConfig: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
      uploadLimits: z
        .lazy(() => JsonWithAggregatesFilterObjectSchema)
        .optional(),
      securityConfig: z
        .lazy(() => JsonWithAggregatesFilterObjectSchema)
        .optional(),
      customCss: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      customJs: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
          z.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
          z.date(),
        ])
        .optional(),
    })
    .strict()
export const SettingScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.SettingScalarWhereWithAggregatesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.SettingScalarWhereWithAggregatesInput>
export const SettingScalarWhereWithAggregatesInputObjectZodSchema = makeSchema()
