/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  companyPhone: z.boolean().optional(),
  companyIconUrl: z.boolean().optional(),
  aboutUsText: z.boolean().optional(),
  companyAddress: z.boolean().optional(),
  heroCarousel: z.boolean().optional(),
  contactEmail: z.boolean().optional(),
  marketingEmail: z.boolean().optional(),
  socialLinks: z.boolean().optional(),
  seoTitle: z.boolean().optional(),
  seoDescription: z.boolean().optional(),
  themeColorPrimary: z.boolean().optional(),
  maintenanceMode: z.boolean().optional(),
  analyticsTrackingId: z.boolean().optional(),
  footerText: z.boolean().optional(),
  businessHours: z.boolean().optional(),
  supportChat: z.boolean().optional(),
  whatsappNumber: z.boolean().optional(),
  favicon: z.boolean().optional(),
  logoSecondary: z.boolean().optional(),
  defaultLanguage: z.boolean().optional(),
  baseCurrency: z.boolean().optional(),
  maintenanceMessage: z.boolean().optional(),
  smtpConfig: z.boolean().optional(),
  uploadLimits: z.boolean().optional(),
  securityConfig: z.boolean().optional(),
  customCss: z.boolean().optional(),
  customJs: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const SettingSelectObjectSchema: z.ZodType<Prisma.SettingSelect> = makeSchema() as unknown as z.ZodType<Prisma.SettingSelect>;
export const SettingSelectObjectZodSchema = makeSchema();
