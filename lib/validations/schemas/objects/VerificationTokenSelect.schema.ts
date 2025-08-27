import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      identifier: z.boolean().optional(),
      token: z.boolean().optional(),
      expires: z.boolean().optional(),
    })
    .strict()
export const VerificationTokenSelectObjectSchema: z.ZodType<Prisma.VerificationTokenSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenSelect>
export const VerificationTokenSelectObjectZodSchema = makeSchema()
