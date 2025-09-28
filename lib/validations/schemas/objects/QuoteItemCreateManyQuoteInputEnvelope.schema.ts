/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemCreateManyQuoteInputObjectSchema as QuoteItemCreateManyQuoteInputObjectSchema } from './QuoteItemCreateManyQuoteInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => QuoteItemCreateManyQuoteInputObjectSchema), z.lazy(() => QuoteItemCreateManyQuoteInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const QuoteItemCreateManyQuoteInputEnvelopeObjectSchema: z.ZodType<Prisma.QuoteItemCreateManyQuoteInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateManyQuoteInputEnvelope>;
export const QuoteItemCreateManyQuoteInputEnvelopeObjectZodSchema = makeSchema();
