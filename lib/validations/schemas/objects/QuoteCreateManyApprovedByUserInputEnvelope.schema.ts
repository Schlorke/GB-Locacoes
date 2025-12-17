import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateManyApprovedByUserInputObjectSchema as QuoteCreateManyApprovedByUserInputObjectSchema } from './QuoteCreateManyApprovedByUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => QuoteCreateManyApprovedByUserInputObjectSchema), z.lazy(() => QuoteCreateManyApprovedByUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const QuoteCreateManyApprovedByUserInputEnvelopeObjectSchema: z.ZodType<Prisma.QuoteCreateManyApprovedByUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateManyApprovedByUserInputEnvelope>;
export const QuoteCreateManyApprovedByUserInputEnvelopeObjectZodSchema = makeSchema();
