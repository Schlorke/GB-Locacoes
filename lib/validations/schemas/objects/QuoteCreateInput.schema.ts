import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemCreateNestedManyWithoutQuoteInput.schema';
import { UserCreateNestedOneWithoutQuotesInputObjectSchema } from './UserCreateNestedOneWithoutQuotesInput.schema'

export const QuoteCreateInputObjectSchema: z.ZodType<Prisma.QuoteCreateInput, Prisma.QuoteCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  total: z.number().optional(),
  status: QuoteStatusSchema.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  items: z.lazy(() => QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputObjectSchema).optional()
}).strict();
export const QuoteCreateInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  total: z.number().optional(),
  status: QuoteStatusSchema.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  items: z.lazy(() => QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputObjectSchema).optional()
}).strict();
