import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  some: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  none: z.lazy(() => QuoteWhereInputObjectSchema).optional()
}).strict();
export const QuoteListRelationFilterObjectSchema: z.ZodType<Prisma.QuoteListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.QuoteListRelationFilter>;
export const QuoteListRelationFilterObjectZodSchema = makeSchema();
