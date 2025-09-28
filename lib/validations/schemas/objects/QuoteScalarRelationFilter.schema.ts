/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => QuoteWhereInputObjectSchema).optional()
}).strict();
export const QuoteScalarRelationFilterObjectSchema: z.ZodType<Prisma.QuoteScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.QuoteScalarRelationFilter>;
export const QuoteScalarRelationFilterObjectZodSchema = makeSchema();
