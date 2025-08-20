import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const VerificationTokenSelectObjectSchema: z.ZodType<
  Prisma.VerificationTokenSelect,
  Prisma.VerificationTokenSelect
> = z
  .object({
    identifier: z.boolean().optional(),
    token: z.boolean().optional(),
    expires: z.boolean().optional(),
  })
  .strict()
export const VerificationTokenSelectObjectZodSchema = z
  .object({
    identifier: z.boolean().optional(),
    token: z.boolean().optional(),
    expires: z.boolean().optional(),
  })
  .strict()
