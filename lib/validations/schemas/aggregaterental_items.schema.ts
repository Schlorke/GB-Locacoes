/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { rental_itemsOrderByWithRelationInputObjectSchema as rental_itemsOrderByWithRelationInputObjectSchema } from './objects/rental_itemsOrderByWithRelationInput.schema'
import { rental_itemsWhereInputObjectSchema as rental_itemsWhereInputObjectSchema } from './objects/rental_itemsWhereInput.schema'
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './objects/rental_itemsWhereUniqueInput.schema'
import { Rental_itemsCountAggregateInputObjectSchema as Rental_itemsCountAggregateInputObjectSchema } from './objects/Rental_itemsCountAggregateInput.schema'
import { Rental_itemsMinAggregateInputObjectSchema as Rental_itemsMinAggregateInputObjectSchema } from './objects/Rental_itemsMinAggregateInput.schema'
import { Rental_itemsMaxAggregateInputObjectSchema as Rental_itemsMaxAggregateInputObjectSchema } from './objects/Rental_itemsMaxAggregateInput.schema'
import { Rental_itemsAvgAggregateInputObjectSchema as Rental_itemsAvgAggregateInputObjectSchema } from './objects/Rental_itemsAvgAggregateInput.schema'
import { Rental_itemsSumAggregateInputObjectSchema as Rental_itemsSumAggregateInputObjectSchema } from './objects/Rental_itemsSumAggregateInput.schema'

export const rental_itemsAggregateSchema: z.ZodType<Prisma.Rental_itemsAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          rental_itemsOrderByWithRelationInputObjectSchema,
          rental_itemsOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: rental_itemsWhereInputObjectSchema.optional(),
      cursor: rental_itemsWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([z.literal(true), Rental_itemsCountAggregateInputObjectSchema])
        .optional(),
      _min: Rental_itemsMinAggregateInputObjectSchema.optional(),
      _max: Rental_itemsMaxAggregateInputObjectSchema.optional(),
      _avg: Rental_itemsAvgAggregateInputObjectSchema.optional(),
      _sum: Rental_itemsSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.Rental_itemsAggregateArgs>

export const rental_itemsAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        rental_itemsOrderByWithRelationInputObjectSchema,
        rental_itemsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: rental_itemsWhereInputObjectSchema.optional(),
    cursor: rental_itemsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), Rental_itemsCountAggregateInputObjectSchema])
      .optional(),
    _min: Rental_itemsMinAggregateInputObjectSchema.optional(),
    _max: Rental_itemsMaxAggregateInputObjectSchema.optional(),
    _avg: Rental_itemsAvgAggregateInputObjectSchema.optional(),
    _sum: Rental_itemsSumAggregateInputObjectSchema.optional(),
  })
  .strict()
