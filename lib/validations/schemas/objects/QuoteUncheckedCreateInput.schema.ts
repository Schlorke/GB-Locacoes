import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateNestedManyWithoutQuoteInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().nullish(),
  message: z.string().nullish(),
  total: z.number().optional(),
  status: QuoteStatusSchema.optional(),
  userId: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  items: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema).optional()
}).strict();
export const QuoteUncheckedCreateInputObjectSchema: z.ZodType<Prisma.QuoteUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUncheckedCreateInput>;
export const QuoteUncheckedCreateInputObjectZodSchema = makeSchema();
