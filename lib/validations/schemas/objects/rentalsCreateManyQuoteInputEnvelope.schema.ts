/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateManyQuoteInputObjectSchema as rentalsCreateManyQuoteInputObjectSchema } from './rentalsCreateManyQuoteInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => rentalsCreateManyQuoteInputObjectSchema), z.lazy(() => rentalsCreateManyQuoteInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const rentalsCreateManyQuoteInputEnvelopeObjectSchema: z.ZodType<Prisma.rentalsCreateManyQuoteInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateManyQuoteInputEnvelope>;
export const rentalsCreateManyQuoteInputEnvelopeObjectZodSchema = makeSchema();
