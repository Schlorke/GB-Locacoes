/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict()
export const CartCountAggregateInputObjectSchema: z.ZodType<Prisma.CartCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.CartCountAggregateInputType>
export const CartCountAggregateInputObjectZodSchema = makeSchema()
