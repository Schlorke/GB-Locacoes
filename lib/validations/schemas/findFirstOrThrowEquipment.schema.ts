/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { EquipmentIncludeObjectSchema as EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentOrderByWithRelationInputObjectSchema as EquipmentOrderByWithRelationInputObjectSchema } from './objects/EquipmentOrderByWithRelationInput.schema';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema';
import { EquipmentScalarFieldEnumSchema as EquipmentScalarFieldEnum } from './enums/EquipmentScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EquipmentFindFirstOrThrowSelectSchema: z.ZodType<Prisma.EquipmentSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    images: z.boolean().optional(),
    available: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    specifications: z.boolean().optional(),
    maxStock: z.boolean().optional(),
    dailyDiscount: z.boolean().optional(),
    weeklyDiscount: z.boolean().optional(),
    biweeklyDiscount: z.boolean().optional(),
    monthlyDiscount: z.boolean().optional(),
    popularPeriod: z.boolean().optional(),
    dailyDirectValue: z.boolean().optional(),
    weeklyDirectValue: z.boolean().optional(),
    biweeklyDirectValue: z.boolean().optional(),
    monthlyDirectValue: z.boolean().optional(),
    dailyUseDirectValue: z.boolean().optional(),
    weeklyUseDirectValue: z.boolean().optional(),
    biweeklyUseDirectValue: z.boolean().optional(),
    monthlyUseDirectValue: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    category: z.boolean().optional(),
    quoteItems: z.boolean().optional(),
    rental_items: z.boolean().optional(),
    cartItems: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.EquipmentSelect>;

export const EquipmentFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    images: z.boolean().optional(),
    available: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    specifications: z.boolean().optional(),
    maxStock: z.boolean().optional(),
    dailyDiscount: z.boolean().optional(),
    weeklyDiscount: z.boolean().optional(),
    biweeklyDiscount: z.boolean().optional(),
    monthlyDiscount: z.boolean().optional(),
    popularPeriod: z.boolean().optional(),
    dailyDirectValue: z.boolean().optional(),
    weeklyDirectValue: z.boolean().optional(),
    biweeklyDirectValue: z.boolean().optional(),
    monthlyDirectValue: z.boolean().optional(),
    dailyUseDirectValue: z.boolean().optional(),
    weeklyUseDirectValue: z.boolean().optional(),
    biweeklyUseDirectValue: z.boolean().optional(),
    monthlyUseDirectValue: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    category: z.boolean().optional(),
    quoteItems: z.boolean().optional(),
    rental_items: z.boolean().optional(),
    cartItems: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const EquipmentFindFirstOrThrowSchema: z.ZodType<Prisma.EquipmentFindFirstOrThrowArgs> = z.object({ select: EquipmentFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => EquipmentIncludeObjectSchema.optional()), orderBy: z.union([EquipmentOrderByWithRelationInputObjectSchema, EquipmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentWhereInputObjectSchema.optional(), cursor: EquipmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EquipmentScalarFieldEnum, EquipmentScalarFieldEnum.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentFindFirstOrThrowArgs>;

export const EquipmentFindFirstOrThrowZodSchema = z.object({ select: EquipmentFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => EquipmentIncludeObjectSchema.optional()), orderBy: z.union([EquipmentOrderByWithRelationInputObjectSchema, EquipmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentWhereInputObjectSchema.optional(), cursor: EquipmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EquipmentScalarFieldEnum, EquipmentScalarFieldEnum.array()]).optional() }).strict();