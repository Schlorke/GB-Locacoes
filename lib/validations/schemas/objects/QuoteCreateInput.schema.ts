/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema as QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemCreateNestedManyWithoutQuoteInput.schema';
import { UserCreateNestedOneWithoutQuotesInputObjectSchema as UserCreateNestedOneWithoutQuotesInputObjectSchema } from './UserCreateNestedOneWithoutQuotesInput.schema'

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
  createdAt: z.coerce.date().optional(),
  items: z.lazy(() => QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputObjectSchema).optional()
}).strict();
export const QuoteCreateInputObjectSchema: z.ZodType<Prisma.QuoteCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateInput>;
export const QuoteCreateInputObjectZodSchema = makeSchema();
