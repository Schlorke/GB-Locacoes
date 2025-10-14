/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      name: z.literal(true).optional(),
      description: z.literal(true).optional(),
      icon: z.literal(true).optional(),
      iconColor: z.literal(true).optional(),
      bgColor: z.literal(true).optional(),
      fontColor: z.literal(true).optional(),
      slug: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict()
export const CategoryMinAggregateInputObjectSchema: z.ZodType<Prisma.CategoryMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryMinAggregateInputType>
export const CategoryMinAggregateInputObjectZodSchema = makeSchema()
