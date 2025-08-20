import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const SessionUncheckedCreateInputObjectSchema: z.ZodType<
  Prisma.SessionUncheckedCreateInput,
  Prisma.SessionUncheckedCreateInput
> = z
  .object({
    id: z.string().optional(),
    sessionToken: z.string(),
    userId: z.string(),
    expires: z.date(),
  })
  .strict()
export const SessionUncheckedCreateInputObjectZodSchema = z
  .object({
    id: z.string().optional(),
    sessionToken: z.string(),
    userId: z.string(),
    expires: z.date(),
  })
  .strict()
