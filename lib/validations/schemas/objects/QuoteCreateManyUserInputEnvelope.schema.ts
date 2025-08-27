import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteCreateManyUserInputObjectSchema } from './QuoteCreateManyUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => QuoteCreateManyUserInputObjectSchema), z.lazy(() => QuoteCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const QuoteCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.QuoteCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateManyUserInputEnvelope>;
export const QuoteCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
