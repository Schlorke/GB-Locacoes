import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { rentalsOrderByWithRelationInputObjectSchema } from './objects/rentalsOrderByWithRelationInput.schema'
import { rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema'
import { rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema'
import { RentalsCountAggregateInputObjectSchema } from './objects/RentalsCountAggregateInput.schema'

export const rentalsCountSchema: z.ZodType<Prisma.rentalsCountArgs> = z
  .object({
    orderBy: z
      .union([
        rentalsOrderByWithRelationInputObjectSchema,
        rentalsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: rentalsWhereInputObjectSchema.optional(),
    cursor: rentalsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), RentalsCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.rentalsCountArgs>

export const rentalsCountZodSchema = z
  .object({
    orderBy: z
      .union([
        rentalsOrderByWithRelationInputObjectSchema,
        rentalsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: rentalsWhereInputObjectSchema.optional(),
    cursor: rentalsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), RentalsCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict()
