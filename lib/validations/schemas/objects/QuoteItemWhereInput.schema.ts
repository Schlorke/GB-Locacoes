import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EquipmentScalarRelationFilterObjectSchema as EquipmentScalarRelationFilterObjectSchema } from './EquipmentScalarRelationFilter.schema';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema';
import { QuoteScalarRelationFilterObjectSchema as QuoteScalarRelationFilterObjectSchema } from './QuoteScalarRelationFilter.schema';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const quoteitemwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => QuoteItemWhereInputObjectSchema), z.lazy(() => QuoteItemWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteItemWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteItemWhereInputObjectSchema), z.lazy(() => QuoteItemWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quoteId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  days: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  pricePerDay: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'pricePerDay' must be a Decimal",
})]).optional(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
})]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  equipment: z.union([z.lazy(() => EquipmentScalarRelationFilterObjectSchema), z.lazy(() => EquipmentWhereInputObjectSchema)]).optional(),
  quote: z.union([z.lazy(() => QuoteScalarRelationFilterObjectSchema), z.lazy(() => QuoteWhereInputObjectSchema)]).optional()
}).strict();
export const QuoteItemWhereInputObjectSchema: z.ZodType<Prisma.QuoteItemWhereInput> = quoteitemwhereinputSchema as unknown as z.ZodType<Prisma.QuoteItemWhereInput>;
export const QuoteItemWhereInputObjectZodSchema = quoteitemwhereinputSchema;
