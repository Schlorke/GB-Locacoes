/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema as QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateNestedManyWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  total: z.number().optional(),
  status: QuoteStatusSchema.optional(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  items: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema)
}).strict();
export const QuoteUncheckedCreateInputObjectSchema: z.ZodType<Prisma.QuoteUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUncheckedCreateInput>;
export const QuoteUncheckedCreateInputObjectZodSchema = makeSchema();
