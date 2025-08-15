import type { Prisma } from '../../../node_modules/.prisma/client'
import { z } from 'zod'
import { QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema'
import { QuoteItemOrderByWithRelationInputObjectSchema } from './objects/QuoteItemOrderByWithRelationInput.schema'
import { QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema'
import { QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema'
import { QuoteItemScalarFieldEnumSchema } from './enums/QuoteItemScalarFieldEnum.schema'
import { EquipmentArgsObjectSchema } from './objects/EquipmentArgs.schema'
import { QuoteArgsObjectSchema } from './objects/QuoteArgs.schema'

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const QuoteItemFindManySelectSchema: z.ZodType<
  Prisma.QuoteItemSelect,
  Prisma.QuoteItemSelect
> = z
  .object({
    id: z.boolean().optional(),
    quoteId: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    days: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    total: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    equipment: z.boolean().optional(),
    quote: z.boolean().optional(),
  })
  .strict()

export const QuoteItemFindManySelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    quoteId: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    days: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    total: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    equipment: z.boolean().optional(),
    quote: z.boolean().optional(),
  })
  .strict()

export const QuoteItemFindManySchema: z.ZodType<
  Prisma.QuoteItemFindManyArgs,
  Prisma.QuoteItemFindManyArgs
> = z
  .object({
    select: QuoteItemFindManySelectSchema.optional(),
    include: z.lazy(() => QuoteItemIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        QuoteItemOrderByWithRelationInputObjectSchema,
        QuoteItemOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: QuoteItemWhereInputObjectSchema.optional(),
    cursor: QuoteItemWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        QuoteItemScalarFieldEnumSchema,
        QuoteItemScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict()

export const QuoteItemFindManyZodSchema = z
  .object({
    select: QuoteItemFindManySelectSchema.optional(),
    include: z.lazy(() => QuoteItemIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        QuoteItemOrderByWithRelationInputObjectSchema,
        QuoteItemOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: QuoteItemWhereInputObjectSchema.optional(),
    cursor: QuoteItemWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        QuoteItemScalarFieldEnumSchema,
        QuoteItemScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict()
