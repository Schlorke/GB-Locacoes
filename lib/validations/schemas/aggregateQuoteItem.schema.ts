/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { QuoteItemOrderByWithRelationInputObjectSchema as QuoteItemOrderByWithRelationInputObjectSchema } from './objects/QuoteItemOrderByWithRelationInput.schema'
import { QuoteItemWhereInputObjectSchema as QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema'
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema'
import { QuoteItemCountAggregateInputObjectSchema as QuoteItemCountAggregateInputObjectSchema } from './objects/QuoteItemCountAggregateInput.schema'
import { QuoteItemMinAggregateInputObjectSchema as QuoteItemMinAggregateInputObjectSchema } from './objects/QuoteItemMinAggregateInput.schema'
import { QuoteItemMaxAggregateInputObjectSchema as QuoteItemMaxAggregateInputObjectSchema } from './objects/QuoteItemMaxAggregateInput.schema'
import { QuoteItemAvgAggregateInputObjectSchema as QuoteItemAvgAggregateInputObjectSchema } from './objects/QuoteItemAvgAggregateInput.schema'
import { QuoteItemSumAggregateInputObjectSchema as QuoteItemSumAggregateInputObjectSchema } from './objects/QuoteItemSumAggregateInput.schema'

export const QuoteItemAggregateSchema: z.ZodType<Prisma.QuoteItemAggregateArgs> =
  z
    .object({
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
      _count: z
        .union([z.literal(true), QuoteItemCountAggregateInputObjectSchema])
        .optional(),
      _min: QuoteItemMinAggregateInputObjectSchema.optional(),
      _max: QuoteItemMaxAggregateInputObjectSchema.optional(),
      _avg: QuoteItemAvgAggregateInputObjectSchema.optional(),
      _sum: QuoteItemSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.QuoteItemAggregateArgs>

export const QuoteItemAggregateZodSchema = z
  .object({
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
    _count: z
      .union([z.literal(true), QuoteItemCountAggregateInputObjectSchema])
      .optional(),
    _min: QuoteItemMinAggregateInputObjectSchema.optional(),
    _max: QuoteItemMaxAggregateInputObjectSchema.optional(),
    _avg: QuoteItemAvgAggregateInputObjectSchema.optional(),
    _sum: QuoteItemSumAggregateInputObjectSchema.optional(),
  })
  .strict()
