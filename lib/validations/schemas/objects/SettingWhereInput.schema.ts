/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const settingwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => SettingWhereInputObjectSchema), z.lazy(() => SettingWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => SettingWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => SettingWhereInputObjectSchema), z.lazy(() => SettingWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  companyPhone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  companyIconUrl: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  aboutUsText: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  companyAddress: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  heroCarousel: z.lazy(() => JsonFilterObjectSchema).optional(),
  contactEmail: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  marketingEmail: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  socialLinks: z.lazy(() => JsonFilterObjectSchema).optional(),
  seoTitle: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  seoDescription: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  themeColorPrimary: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  maintenanceMode: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  analyticsTrackingId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  footerText: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  businessHours: z.lazy(() => JsonFilterObjectSchema).optional(),
  supportChat: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  whatsappNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  favicon: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  logoSecondary: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  defaultLanguage: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  baseCurrency: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  maintenanceMessage: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  smtpConfig: z.lazy(() => JsonFilterObjectSchema).optional(),
  uploadLimits: z.lazy(() => JsonFilterObjectSchema).optional(),
  securityConfig: z.lazy(() => JsonFilterObjectSchema).optional(),
  customCss: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  customJs: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const SettingWhereInputObjectSchema: z.ZodType<Prisma.SettingWhereInput> = settingwhereinputSchema as unknown as z.ZodType<Prisma.SettingWhereInput>;
export const SettingWhereInputObjectZodSchema = settingwhereinputSchema;
