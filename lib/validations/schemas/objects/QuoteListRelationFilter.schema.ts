import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

export const QuoteListRelationFilterObjectSchema: z.ZodType<Prisma.QuoteListRelationFilter, Prisma.QuoteListRelationFilter> = z.object({
  every: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  some: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  none: z.lazy(() => QuoteWhereInputObjectSchema).optional()
}).strict();
export const QuoteListRelationFilterObjectZodSchema = z.object({
  every: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  some: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  none: z.lazy(() => QuoteWhereInputObjectSchema).optional()
}).strict();
