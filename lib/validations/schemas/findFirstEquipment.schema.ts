import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentOrderByWithRelationInputObjectSchema } from './objects/EquipmentOrderByWithRelationInput.schema';
import { EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema';
import { EquipmentScalarFieldEnumSchema } from './enums/EquipmentScalarFieldEnum.schema';
import { EquipmentCountOutputTypeArgsObjectSchema } from './objects/EquipmentCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EquipmentFindFirstSelectSchema: z.ZodType<Prisma.EquipmentSelect> = z.object({
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
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.EquipmentSelect>;

export const EquipmentFindFirstSelectZodSchema = z.object({
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
    _count: z.boolean().optional()
  }).strict();

export const EquipmentFindFirstSchema: z.ZodType<Prisma.EquipmentFindFirstArgs> = z.object({ select: EquipmentFindFirstSelectSchema.optional(), include: z.lazy(() => EquipmentIncludeObjectSchema.optional()), orderBy: z.union([EquipmentOrderByWithRelationInputObjectSchema, EquipmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentWhereInputObjectSchema.optional(), cursor: EquipmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.EquipmentScalarFieldEnum), z.nativeEnum(Prisma.EquipmentScalarFieldEnum).array()]).optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentFindFirstArgs>;

export const EquipmentFindFirstZodSchema = z.object({ select: EquipmentFindFirstSelectSchema.optional(), include: z.lazy(() => EquipmentIncludeObjectSchema.optional()), orderBy: z.union([EquipmentOrderByWithRelationInputObjectSchema, EquipmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentWhereInputObjectSchema.optional(), cursor: EquipmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.EquipmentScalarFieldEnum), z.nativeEnum(Prisma.EquipmentScalarFieldEnum).array()]).optional() }).strict();