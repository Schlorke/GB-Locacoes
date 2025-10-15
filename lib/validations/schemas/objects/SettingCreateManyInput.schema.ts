/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  companyPhone: z.string().optional(),
  companyIconUrl: z.string().optional(),
  aboutUsText: z.string().optional(),
  companyAddress: z.string().optional(),
  heroCarousel: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  contactEmail: z.string().optional(),
  socialLinks: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  themeColorPrimary: z.string().optional(),
  maintenanceMode: z.boolean().optional(),
  analyticsTrackingId: z.string().optional(),
  footerText: z.string().optional(),
  businessHours: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  supportChat: z.boolean().optional(),
  whatsappNumber: z.string().optional(),
  favicon: z.string().optional(),
  logoSecondary: z.string().optional(),
  defaultLanguage: z.string().optional(),
  baseCurrency: z.string().optional(),
  maintenanceMessage: z.string().optional(),
  smtpConfig: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  uploadLimits: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  securityConfig: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  customCss: z.string().optional(),
  customJs: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const SettingCreateManyInputObjectSchema: z.ZodType<Prisma.SettingCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.SettingCreateManyInput>;
export const SettingCreateManyInputObjectZodSchema = makeSchema();
