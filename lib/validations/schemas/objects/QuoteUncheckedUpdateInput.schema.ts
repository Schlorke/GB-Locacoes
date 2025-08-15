import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { EnumQuoteStatusFieldUpdateOperationsInputObjectSchema } from './EnumQuoteStatusFieldUpdateOperationsInput.schema';
import { QuoteItemUncheckedUpdateManyWithoutQuoteNestedInputObjectSchema } from './QuoteItemUncheckedUpdateManyWithoutQuoteNestedInput.schema'

export const QuoteUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.QuoteUncheckedUpdateInput, Prisma.QuoteUncheckedUpdateInput> = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  phone: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  company: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  message: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  total: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([QuoteStatusSchema, z.lazy(() => EnumQuoteStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  items: z.lazy(() => QuoteItemUncheckedUpdateManyWithoutQuoteNestedInputObjectSchema).optional()
}).strict();
export const QuoteUncheckedUpdateInputObjectZodSchema = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  phone: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  company: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  message: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  total: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([QuoteStatusSchema, z.lazy(() => EnumQuoteStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  items: z.lazy(() => QuoteItemUncheckedUpdateManyWithoutQuoteNestedInputObjectSchema).optional()
}).strict();
