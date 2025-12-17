/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateManyRejectedByUserInputObjectSchema as QuoteCreateManyRejectedByUserInputObjectSchema } from './QuoteCreateManyRejectedByUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => QuoteCreateManyRejectedByUserInputObjectSchema), z.lazy(() => QuoteCreateManyRejectedByUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const QuoteCreateManyRejectedByUserInputEnvelopeObjectSchema: z.ZodType<Prisma.QuoteCreateManyRejectedByUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateManyRejectedByUserInputEnvelope>;
export const QuoteCreateManyRejectedByUserInputEnvelopeObjectZodSchema = makeSchema();
