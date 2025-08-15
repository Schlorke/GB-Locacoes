import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteItemFindManySchema } from '../findManyQuoteItem.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { QuoteCountOutputTypeArgsObjectSchema } from './QuoteCountOutputTypeArgs.schema'

export const QuoteSelectObjectSchema: z.ZodType<Prisma.QuoteSelect, Prisma.QuoteSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  company: z.boolean().optional(),
  message: z.boolean().optional(),
  total: z.boolean().optional(),
  status: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  items: z.union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => QuoteCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const QuoteSelectObjectZodSchema = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  company: z.boolean().optional(),
  message: z.boolean().optional(),
  total: z.boolean().optional(),
  status: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  items: z.union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => QuoteCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
