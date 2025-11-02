import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { EnumQuoteStatusFieldUpdateOperationsInputObjectSchema as EnumQuoteStatusFieldUpdateOperationsInputObjectSchema } from './EnumQuoteStatusFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneWithoutQuotesNestedInputObjectSchema as UserUpdateOneWithoutQuotesNestedInputObjectSchema } from './UserUpdateOneWithoutQuotesNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  phone: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  company: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  message: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  total: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([QuoteStatusSchema, z.lazy(() => EnumQuoteStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutQuotesNestedInputObjectSchema).optional()
}).strict();
export const QuoteUpdateWithoutItemsInputObjectSchema: z.ZodType<Prisma.QuoteUpdateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateWithoutItemsInput>;
export const QuoteUpdateWithoutItemsInputObjectZodSchema = makeSchema();
