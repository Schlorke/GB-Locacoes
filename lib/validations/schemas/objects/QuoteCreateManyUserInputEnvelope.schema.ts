import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteCreateManyUserInputObjectSchema } from './QuoteCreateManyUserInput.schema'

export const QuoteCreateManyUserInputEnvelopeObjectSchema: z.ZodType<
  Prisma.QuoteCreateManyUserInputEnvelope,
  Prisma.QuoteCreateManyUserInputEnvelope
> = z
  .object({
    data: z.union([
      z.lazy(() => QuoteCreateManyUserInputObjectSchema),
      z.lazy(() => QuoteCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
export const QuoteCreateManyUserInputEnvelopeObjectZodSchema = z
  .object({
    data: z.union([
      z.lazy(() => QuoteCreateManyUserInputObjectSchema),
      z.lazy(() => QuoteCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
