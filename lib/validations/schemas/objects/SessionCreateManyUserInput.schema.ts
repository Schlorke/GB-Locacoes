import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string().optional(),
      sessionToken: z.string(),
      expires: z.date(),
    })
    .strict()
export const SessionCreateManyUserInputObjectSchema: z.ZodType<Prisma.SessionCreateManyUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.SessionCreateManyUserInput>
export const SessionCreateManyUserInputObjectZodSchema = makeSchema()
