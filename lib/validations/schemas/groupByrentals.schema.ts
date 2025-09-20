import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema'
import { rentalsOrderByWithAggregationInputObjectSchema } from './objects/rentalsOrderByWithAggregationInput.schema'
import { rentalsScalarWhereWithAggregatesInputObjectSchema } from './objects/rentalsScalarWhereWithAggregatesInput.schema'
import { RentalsScalarFieldEnumSchema } from './enums/RentalsScalarFieldEnum.schema'
import { RentalsCountAggregateInputObjectSchema } from './objects/RentalsCountAggregateInput.schema'
import { RentalsMinAggregateInputObjectSchema } from './objects/RentalsMinAggregateInput.schema'
import { RentalsMaxAggregateInputObjectSchema } from './objects/RentalsMaxAggregateInput.schema'
import { RentalsAvgAggregateInputObjectSchema } from './objects/RentalsAvgAggregateInput.schema'
import { RentalsSumAggregateInputObjectSchema } from './objects/RentalsSumAggregateInput.schema'

export const rentalsGroupBySchema: z.ZodType<Prisma.rentalsGroupByArgs> = z
  .object({
    where: rentalsWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        rentalsOrderByWithAggregationInputObjectSchema,
        rentalsOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: rentalsScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RentalsScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), RentalsCountAggregateInputObjectSchema])
      .optional(),
    _min: RentalsMinAggregateInputObjectSchema.optional(),
    _max: RentalsMaxAggregateInputObjectSchema.optional(),
    _avg: RentalsAvgAggregateInputObjectSchema.optional(),
    _sum: RentalsSumAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.rentalsGroupByArgs>

export const rentalsGroupByZodSchema = z
  .object({
    where: rentalsWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        rentalsOrderByWithAggregationInputObjectSchema,
        rentalsOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: rentalsScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RentalsScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), RentalsCountAggregateInputObjectSchema])
      .optional(),
    _min: RentalsMinAggregateInputObjectSchema.optional(),
    _max: RentalsMaxAggregateInputObjectSchema.optional(),
    _avg: RentalsAvgAggregateInputObjectSchema.optional(),
    _sum: RentalsSumAggregateInputObjectSchema.optional(),
  })
  .strict()
