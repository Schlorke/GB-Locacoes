import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const UserCountAggregateInputObjectSchema: z.ZodType<
  Prisma.UserCountAggregateInputType,
  Prisma.UserCountAggregateInputType
> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    email: z.literal(true).optional(),
    password: z.literal(true).optional(),
    role: z.literal(true).optional(),
    emailVerified: z.literal(true).optional(),
    image: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()
export const UserCountAggregateInputObjectZodSchema = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    email: z.literal(true).optional(),
    password: z.literal(true).optional(),
    role: z.literal(true).optional(),
    emailVerified: z.literal(true).optional(),
    image: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()
