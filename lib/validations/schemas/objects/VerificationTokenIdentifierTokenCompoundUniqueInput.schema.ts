import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const VerificationTokenIdentifierTokenCompoundUniqueInputObjectSchema: z.ZodType<
  Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput,
  Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput
> = z
  .object({
    identifier: z.string(),
    token: z.string(),
  })
  .strict()
export const VerificationTokenIdentifierTokenCompoundUniqueInputObjectZodSchema =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
    })
    .strict()
