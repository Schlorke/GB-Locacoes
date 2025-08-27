import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { VerificationTokenSelectObjectSchema } from './VerificationTokenSelect.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      select: z.lazy(() => VerificationTokenSelectObjectSchema).optional(),
    })
    .strict()
export const VerificationTokenArgsObjectSchema = makeSchema()
export const VerificationTokenArgsObjectZodSchema = makeSchema()
