import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { rental_itemsWhereInputObjectSchema } from './objects/rental_itemsWhereInput.schema'
import { rental_itemsOrderByWithAggregationInputObjectSchema } from './objects/rental_itemsOrderByWithAggregationInput.schema'
import { rental_itemsScalarWhereWithAggregatesInputObjectSchema } from './objects/rental_itemsScalarWhereWithAggregatesInput.schema'
import { RentalItemsScalarFieldEnumSchema } from './enums/RentalItemsScalarFieldEnum.schema'
import { Rental_itemsCountAggregateInputObjectSchema } from './objects/Rental_itemsCountAggregateInput.schema'
import { Rental_itemsMinAggregateInputObjectSchema } from './objects/Rental_itemsMinAggregateInput.schema'
import { Rental_itemsMaxAggregateInputObjectSchema } from './objects/Rental_itemsMaxAggregateInput.schema'
import { Rental_itemsAvgAggregateInputObjectSchema } from './objects/Rental_itemsAvgAggregateInput.schema'
import { Rental_itemsSumAggregateInputObjectSchema } from './objects/Rental_itemsSumAggregateInput.schema'

export const rental_itemsGroupBySchema: z.ZodType<Prisma.rental_itemsGroupByArgs> =
  z
    .object({
      where: rental_itemsWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          rental_itemsOrderByWithAggregationInputObjectSchema,
          rental_itemsOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having: rental_itemsScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(RentalItemsScalarFieldEnumSchema),
      _count: z
        .union([z.literal(true), Rental_itemsCountAggregateInputObjectSchema])
        .optional(),
      _min: Rental_itemsMinAggregateInputObjectSchema.optional(),
      _max: Rental_itemsMaxAggregateInputObjectSchema.optional(),
      _avg: Rental_itemsAvgAggregateInputObjectSchema.optional(),
      _sum: Rental_itemsSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.rental_itemsGroupByArgs>

export const rental_itemsGroupByZodSchema = z
  .object({
    where: rental_itemsWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        rental_itemsOrderByWithAggregationInputObjectSchema,
        rental_itemsOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: rental_itemsScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RentalItemsScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), Rental_itemsCountAggregateInputObjectSchema])
      .optional(),
    _min: Rental_itemsMinAggregateInputObjectSchema.optional(),
    _max: Rental_itemsMaxAggregateInputObjectSchema.optional(),
    _avg: Rental_itemsAvgAggregateInputObjectSchema.optional(),
    _sum: Rental_itemsSumAggregateInputObjectSchema.optional(),
  })
  .strict()
