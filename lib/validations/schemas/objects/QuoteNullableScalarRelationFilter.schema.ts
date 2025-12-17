/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => QuoteWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => QuoteWhereInputObjectSchema).optional().nullable()
}).strict();
export const QuoteNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.QuoteNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.QuoteNullableScalarRelationFilter>;
export const QuoteNullableScalarRelationFilterObjectZodSchema = makeSchema();
