import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema as QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateNestedManyWithoutQuoteInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  total: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
}).optional(),
  status: QuoteStatusSchema.optional(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  items: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema)
}).strict();
export const QuoteUncheckedCreateInputObjectSchema: z.ZodType<Prisma.QuoteUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUncheckedCreateInput>;
export const QuoteUncheckedCreateInputObjectZodSchema = makeSchema();
