/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SettingOrderByWithRelationInputObjectSchema as SettingOrderByWithRelationInputObjectSchema } from './objects/SettingOrderByWithRelationInput.schema';
import { SettingWhereInputObjectSchema as SettingWhereInputObjectSchema } from './objects/SettingWhereInput.schema';
import { SettingWhereUniqueInputObjectSchema as SettingWhereUniqueInputObjectSchema } from './objects/SettingWhereUniqueInput.schema';
import { SettingScalarFieldEnumSchema } from './enums/SettingScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SettingFindManySelectSchema: z.ZodType<Prisma.SettingSelect> = z.object({
    id: z.boolean().optional(),
    companyPhone: z.boolean().optional(),
    companyIconUrl: z.boolean().optional(),
    aboutUsText: z.boolean().optional(),
    companyAddress: z.boolean().optional(),
    heroCarousel: z.boolean().optional(),
    contactEmail: z.boolean().optional(),
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
  }).strict() as unknown as z.ZodType<Prisma.SettingSelect>;

export const SettingFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    companyPhone: z.boolean().optional(),
    companyIconUrl: z.boolean().optional(),
    aboutUsText: z.boolean().optional(),
    companyAddress: z.boolean().optional(),
    heroCarousel: z.boolean().optional(),
    contactEmail: z.boolean().optional(),
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

export const SettingFindManySchema: z.ZodType<Prisma.SettingFindManyArgs> = z.object({ select: SettingFindManySelectSchema.optional(), include: , orderBy: z.union([SettingOrderByWithRelationInputObjectSchema, SettingOrderByWithRelationInputObjectSchema.array()]).optional(), where: SettingWhereInputObjectSchema.optional(), cursor: SettingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SettingScalarFieldEnumSchema, SettingScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.SettingFindManyArgs>;

export const SettingFindManyZodSchema = z.object({ select: SettingFindManySelectSchema.optional(), include: , orderBy: z.union([SettingOrderByWithRelationInputObjectSchema, SettingOrderByWithRelationInputObjectSchema.array()]).optional(), where: SettingWhereInputObjectSchema.optional(), cursor: SettingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SettingScalarFieldEnumSchema, SettingScalarFieldEnumSchema.array()]).optional() }).strict();