import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const VerificationTokenCreateInputObjectSchema: z.ZodType<
  Prisma.VerificationTokenCreateInput,
  Prisma.VerificationTokenCreateInput
> = z
  .object({
    identifier: z.string(),
    token: z.string(),
    expires: z.date(),
  })
  .strict()
export const VerificationTokenCreateInputObjectZodSchema = z
  .object({
    identifier: z.string(),
    token: z.string(),
    expires: z.date(),
  })
  .strict()
