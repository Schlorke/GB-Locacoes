import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateNestedManyWithoutQuoteInput.schema'

export const QuoteUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutUserInput, Prisma.QuoteUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().nullish(),
  message: z.string().nullish(),
  total: z.number().optional(),
  status: QuoteStatusSchema.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  items: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema).optional()
}).strict();
export const QuoteUncheckedCreateWithoutUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().nullish(),
  message: z.string().nullish(),
  total: z.number().optional(),
  status: QuoteStatusSchema.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  items: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema).optional()
}).strict();
