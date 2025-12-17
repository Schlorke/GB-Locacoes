/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemSelectObjectSchema as QuoteItemSelectObjectSchema } from './QuoteItemSelect.schema';
import { QuoteItemIncludeObjectSchema as QuoteItemIncludeObjectSchema } from './QuoteItemInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => QuoteItemSelectObjectSchema).optional(),
  include: z.lazy(() => QuoteItemIncludeObjectSchema).optional()
}).strict();
export const QuoteItemArgsObjectSchema = makeSchema();
export const QuoteItemArgsObjectZodSchema = makeSchema();
