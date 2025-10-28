/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema as EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutQuoteItemsInput.schema';
import { QuoteCreateNestedOneWithoutItemsInputObjectSchema as QuoteCreateNestedOneWithoutItemsInputObjectSchema } from './QuoteCreateNestedOneWithoutItemsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int().optional(),
  days: z.number().int().optional(),
  pricePerDay: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'pricePerDay' must be a Decimal',
}),
  total: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'total' must be a Decimal',
}),
  createdAt: z.coerce.date().optional(),
  equipment: z.lazy(() => EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutItemsInputObjectSchema)
}).strict();
export const QuoteItemCreateInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateInput>;
export const QuoteItemCreateInputObjectZodSchema = makeSchema();
