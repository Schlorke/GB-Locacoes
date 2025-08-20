import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const SessionCountAggregateInputObjectSchema: z.ZodType<
  Prisma.SessionCountAggregateInputType,
  Prisma.SessionCountAggregateInputType
> = z
  .object({
    id: z.literal(true).optional(),
    sessionToken: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    expires: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()
export const SessionCountAggregateInputObjectZodSchema = z
  .object({
    id: z.literal(true).optional(),
    sessionToken: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    expires: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()
