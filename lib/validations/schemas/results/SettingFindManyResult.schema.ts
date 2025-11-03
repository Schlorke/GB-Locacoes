/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const SettingFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  companyPhone: z.string(),
  companyIconUrl: z.string(),
  aboutUsText: z.string(),
  companyAddress: z.string(),
  heroCarousel: z.unknown(),
  contactEmail: z.string(),
  marketingEmail: z.string(),
  socialLinks: z.unknown(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  themeColorPrimary: z.string(),
  maintenanceMode: z.boolean(),
  analyticsTrackingId: z.string(),
  footerText: z.string(),
  businessHours: z.unknown(),
  supportChat: z.boolean(),
  whatsappNumber: z.string(),
  favicon: z.string(),
  logoSecondary: z.string(),
  defaultLanguage: z.string(),
  baseCurrency: z.string(),
  maintenanceMessage: z.string(),
  smtpConfig: z.unknown(),
  uploadLimits: z.unknown(),
  securityConfig: z.unknown(),
  customCss: z.string(),
  customJs: z.string(),
  waveAnimation: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});