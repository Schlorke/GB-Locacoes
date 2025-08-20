import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const VerificationTokenMaxAggregateInputObjectSchema: z.ZodType<
  Prisma.VerificationTokenMaxAggregateInputType,
  Prisma.VerificationTokenMaxAggregateInputType
> = z
  .object({
    identifier: z.literal(true).optional(),
    token: z.literal(true).optional(),
    expires: z.literal(true).optional(),
  })
  .strict()
export const VerificationTokenMaxAggregateInputObjectZodSchema = z
  .object({
    identifier: z.literal(true).optional(),
    token: z.literal(true).optional(),
    expires: z.literal(true).optional(),
  })
  .strict()
