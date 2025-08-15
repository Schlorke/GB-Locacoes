import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const SessionMaxAggregateInputObjectSchema: z.ZodType<
  Prisma.SessionMaxAggregateInputType,
  Prisma.SessionMaxAggregateInputType
> = z
  .object({
    id: z.literal(true).optional(),
    sessionToken: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    expires: z.literal(true).optional(),
  })
  .strict()
export const SessionMaxAggregateInputObjectZodSchema = z
  .object({
    id: z.literal(true).optional(),
    sessionToken: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    expires: z.literal(true).optional(),
  })
  .strict()
