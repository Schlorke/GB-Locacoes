import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCountOutputTypeSelectObjectSchema as QuoteCountOutputTypeSelectObjectSchema } from './QuoteCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => QuoteCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const QuoteCountOutputTypeArgsObjectSchema = makeSchema();
export const QuoteCountOutputTypeArgsObjectZodSchema = makeSchema();
