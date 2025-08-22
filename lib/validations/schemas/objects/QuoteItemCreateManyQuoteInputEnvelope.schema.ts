import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteItemCreateManyQuoteInputObjectSchema } from './QuoteItemCreateManyQuoteInput.schema'

export const QuoteItemCreateManyQuoteInputEnvelopeObjectSchema: z.ZodType<Prisma.QuoteItemCreateManyQuoteInputEnvelope, Prisma.QuoteItemCreateManyQuoteInputEnvelope> = z.object({
  data: z.union([z.lazy(() => QuoteItemCreateManyQuoteInputObjectSchema), z.lazy(() => QuoteItemCreateManyQuoteInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const QuoteItemCreateManyQuoteInputEnvelopeObjectZodSchema = z.object({
  data: z.union([z.lazy(() => QuoteItemCreateManyQuoteInputObjectSchema), z.lazy(() => QuoteItemCreateManyQuoteInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
