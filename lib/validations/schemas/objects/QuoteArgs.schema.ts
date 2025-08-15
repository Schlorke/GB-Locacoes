import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteSelectObjectSchema } from './QuoteSelect.schema';
import { QuoteIncludeObjectSchema } from './QuoteInclude.schema'

export const QuoteArgsObjectSchema = z.object({
  select: z.lazy(() => QuoteSelectObjectSchema).optional(),
  include: z.lazy(() => QuoteIncludeObjectSchema).optional()
}).strict();
export const QuoteArgsObjectZodSchema = z.object({
  select: z.lazy(() => QuoteSelectObjectSchema).optional(),
  include: z.lazy(() => QuoteIncludeObjectSchema).optional()
}).strict();
