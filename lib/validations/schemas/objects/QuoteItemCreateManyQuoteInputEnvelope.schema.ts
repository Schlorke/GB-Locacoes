import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteItemCreateManyQuoteInputObjectSchema } from './QuoteItemCreateManyQuoteInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      data: z.union([
        z.lazy(() => QuoteItemCreateManyQuoteInputObjectSchema),
        z.lazy(() => QuoteItemCreateManyQuoteInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()
export const QuoteItemCreateManyQuoteInputEnvelopeObjectSchema: z.ZodType<Prisma.QuoteItemCreateManyQuoteInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateManyQuoteInputEnvelope>
export const QuoteItemCreateManyQuoteInputEnvelopeObjectZodSchema = makeSchema()
