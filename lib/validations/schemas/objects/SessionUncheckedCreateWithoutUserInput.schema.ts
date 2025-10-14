/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      sessionToken: z.string(),
      expires: z.coerce.date(),
    })
    .strict()
export const SessionUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput>
export const SessionUncheckedCreateWithoutUserInputObjectZodSchema =
  makeSchema()
