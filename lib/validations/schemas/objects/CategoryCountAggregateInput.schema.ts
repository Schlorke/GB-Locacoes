import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const CategoryCountAggregateInputObjectSchema: z.ZodType<
  Prisma.CategoryCountAggregateInputType,
  Prisma.CategoryCountAggregateInputType
> = z
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
    _all: z.literal(true).optional(),
  })
  .strict()
export const CategoryCountAggregateInputObjectZodSchema = z
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
    _all: z.literal(true).optional(),
  })
  .strict()
