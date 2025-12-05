/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
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
  cpf: z.string().optional().nullable(),
  cnpj: z.string().optional().nullable(),
  cep: z.string().optional().nullable(),
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
  updatedAt: z.coerce.date().optional(),
  items: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema).optional()
}).strict();
export const QuoteUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUncheckedCreateWithoutUserInput>;
export const QuoteUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
