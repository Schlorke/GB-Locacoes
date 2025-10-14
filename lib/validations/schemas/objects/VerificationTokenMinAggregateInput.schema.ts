/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      identifier: z.literal(true).optional(),
      token: z.literal(true).optional(),
      expires: z.literal(true).optional(),
    })
    .strict()
export const VerificationTokenMinAggregateInputObjectSchema: z.ZodType<Prisma.VerificationTokenMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenMinAggregateInputType>
export const VerificationTokenMinAggregateInputObjectZodSchema = makeSchema()
