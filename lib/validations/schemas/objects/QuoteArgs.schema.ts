import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteSelectObjectSchema } from './QuoteSelect.schema';
import { QuoteIncludeObjectSchema } from './QuoteInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => QuoteSelectObjectSchema).optional(),
  include: z.lazy(() => QuoteIncludeObjectSchema).optional()
}).strict();
export const QuoteArgsObjectSchema = makeSchema();
export const QuoteArgsObjectZodSchema = makeSchema();
