import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string().optional(),
      sessionToken: z.string(),
      userId: z.string(),
      expires: z.date(),
    })
    .strict()
export const SessionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.SessionUncheckedCreateInput>
export const SessionUncheckedCreateInputObjectZodSchema = makeSchema()
