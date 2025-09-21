import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  companyPhone: SortOrderSchema.optional(),
  companyIconUrl: SortOrderSchema.optional(),
  aboutUsText: SortOrderSchema.optional(),
  companyAddress: SortOrderSchema.optional(),
  contactEmail: SortOrderSchema.optional(),
  seoTitle: SortOrderSchema.optional(),
  seoDescription: SortOrderSchema.optional(),
  themeColorPrimary: SortOrderSchema.optional(),
  maintenanceMode: SortOrderSchema.optional(),
  analyticsTrackingId: SortOrderSchema.optional(),
  footerText: SortOrderSchema.optional(),
  supportChat: SortOrderSchema.optional(),
  whatsappNumber: SortOrderSchema.optional(),
  favicon: SortOrderSchema.optional(),
  logoSecondary: SortOrderSchema.optional(),
  defaultLanguage: SortOrderSchema.optional(),
  baseCurrency: SortOrderSchema.optional(),
  maintenanceMessage: SortOrderSchema.optional(),
  customCss: SortOrderSchema.optional(),
  customJs: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const SettingMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SettingMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SettingMinOrderByAggregateInput>;
export const SettingMinOrderByAggregateInputObjectZodSchema = makeSchema();
