import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteItemSelectObjectSchema } from './QuoteItemSelect.schema';
import { QuoteItemIncludeObjectSchema } from './QuoteItemInclude.schema'

export const QuoteItemArgsObjectSchema = z.object({
  select: z.lazy(() => QuoteItemSelectObjectSchema).optional(),
  include: z.lazy(() => QuoteItemIncludeObjectSchema).optional()
}).strict();
export const QuoteItemArgsObjectZodSchema = z.object({
  select: z.lazy(() => QuoteItemSelectObjectSchema).optional(),
  include: z.lazy(() => QuoteItemIncludeObjectSchema).optional()
}).strict();
