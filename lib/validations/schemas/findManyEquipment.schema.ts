import type { Prisma } from '../../../node_modules/.prisma/client'
import { z } from 'zod'
import { EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema'
import { EquipmentOrderByWithRelationInputObjectSchema } from './objects/EquipmentOrderByWithRelationInput.schema'
import { EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema'
import { EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema'
import { EquipmentScalarFieldEnumSchema } from './enums/EquipmentScalarFieldEnum.schema'
import { CategoryArgsObjectSchema } from './objects/CategoryArgs.schema'
import { QuoteItemArgsObjectSchema } from './objects/QuoteItemArgs.schema'
import { rental_itemsArgsObjectSchema } from './objects/rental_itemsArgs.schema'
import { EquipmentCountOutputTypeArgsObjectSchema } from './objects/EquipmentCountOutputTypeArgs.schema'

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EquipmentFindManySelectSchema: z.ZodType<
  Prisma.EquipmentSelect,
  Prisma.EquipmentSelect
> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    images: z.boolean().optional(),
    available: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    category_id: z.boolean().optional(),
    category: z.boolean().optional(),
    quoteItems: z.boolean().optional(),
    rental_items: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict()

export const EquipmentFindManySelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    images: z.boolean().optional(),
    available: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    category_id: z.boolean().optional(),
    category: z.boolean().optional(),
    quoteItems: z.boolean().optional(),
    rental_items: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict()

export const EquipmentFindManySchema: z.ZodType<
  Prisma.EquipmentFindManyArgs,
  Prisma.EquipmentFindManyArgs
> = z
  .object({
    select: EquipmentFindManySelectSchema.optional(),
    include: z.lazy(() => EquipmentIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        EquipmentOrderByWithRelationInputObjectSchema,
        EquipmentOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: EquipmentWhereInputObjectSchema.optional(),
    cursor: EquipmentWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        EquipmentScalarFieldEnumSchema,
        EquipmentScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict()

export const EquipmentFindManyZodSchema = z
  .object({
    select: EquipmentFindManySelectSchema.optional(),
    include: z.lazy(() => EquipmentIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        EquipmentOrderByWithRelationInputObjectSchema,
        EquipmentOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: EquipmentWhereInputObjectSchema.optional(),
    cursor: EquipmentWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        EquipmentScalarFieldEnumSchema,
        EquipmentScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict()
