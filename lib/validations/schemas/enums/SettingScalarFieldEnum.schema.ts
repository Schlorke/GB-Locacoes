/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const SettingScalarFieldEnumSchema = z.enum(['id', 'companyPhone', 'companyIconUrl', 'aboutUsText', 'companyAddress', 'heroCarousel', 'contactEmail', 'socialLinks', 'seoTitle', 'seoDescription', 'themeColorPrimary', 'maintenanceMode', 'analyticsTrackingId', 'footerText', 'businessHours', 'supportChat', 'whatsappNumber', 'favicon', 'logoSecondary', 'defaultLanguage', 'baseCurrency', 'maintenanceMessage', 'smtpConfig', 'uploadLimits', 'securityConfig', 'customCss', 'customJs', 'createdAt', 'updatedAt'])

export type SettingScalarFieldEnum = z.infer<typeof SettingScalarFieldEnumSchema>;