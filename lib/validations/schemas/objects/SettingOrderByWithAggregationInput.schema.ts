import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SettingCountOrderByAggregateInputObjectSchema } from './SettingCountOrderByAggregateInput.schema'
import { SettingMaxOrderByAggregateInputObjectSchema } from './SettingMaxOrderByAggregateInput.schema'
import { SettingMinOrderByAggregateInputObjectSchema } from './SettingMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: SortOrderSchema.optional(),
      companyPhone: SortOrderSchema.optional(),
      companyIconUrl: SortOrderSchema.optional(),
      aboutUsText: SortOrderSchema.optional(),
      companyAddress: SortOrderSchema.optional(),
      heroCarousel: SortOrderSchema.optional(),
      contactEmail: SortOrderSchema.optional(),
      socialLinks: SortOrderSchema.optional(),
      seoTitle: SortOrderSchema.optional(),
      seoDescription: SortOrderSchema.optional(),
      themeColorPrimary: SortOrderSchema.optional(),
      maintenanceMode: SortOrderSchema.optional(),
      analyticsTrackingId: SortOrderSchema.optional(),
      footerText: SortOrderSchema.optional(),
      businessHours: SortOrderSchema.optional(),
      supportChat: SortOrderSchema.optional(),
      whatsappNumber: SortOrderSchema.optional(),
      favicon: SortOrderSchema.optional(),
      logoSecondary: SortOrderSchema.optional(),
      defaultLanguage: SortOrderSchema.optional(),
      baseCurrency: SortOrderSchema.optional(),
      maintenanceMessage: SortOrderSchema.optional(),
      smtpConfig: SortOrderSchema.optional(),
      uploadLimits: SortOrderSchema.optional(),
      securityConfig: SortOrderSchema.optional(),
      customCss: SortOrderSchema.optional(),
      customJs: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => SettingCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => SettingMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => SettingMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict()
export const SettingOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.SettingOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.SettingOrderByWithAggregationInput>
export const SettingOrderByWithAggregationInputObjectZodSchema = makeSchema()
