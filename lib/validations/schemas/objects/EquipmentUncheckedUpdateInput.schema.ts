import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { EquipmentUpdateimagesInputObjectSchema } from './EquipmentUpdateimagesInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { QuoteItemUncheckedUpdateManyWithoutEquipmentNestedInputObjectSchema } from './QuoteItemUncheckedUpdateManyWithoutEquipmentNestedInput.schema';
import { rental_itemsUncheckedUpdateManyWithoutEquipmentsNestedInputObjectSchema } from './rental_itemsUncheckedUpdateManyWithoutEquipmentsNestedInput.schema'

export const EquipmentUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedUpdateInput, Prisma.EquipmentUncheckedUpdateInput> = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  pricePerDay: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  images: z.union([z.lazy(() => EquipmentUpdateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  categoryId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  category_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  quoteItems: z.lazy(() => QuoteItemUncheckedUpdateManyWithoutEquipmentNestedInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsUncheckedUpdateManyWithoutEquipmentsNestedInputObjectSchema).optional()
}).strict();
export const EquipmentUncheckedUpdateInputObjectZodSchema = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  pricePerDay: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  images: z.union([z.lazy(() => EquipmentUpdateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  categoryId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  category_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  quoteItems: z.lazy(() => QuoteItemUncheckedUpdateManyWithoutEquipmentNestedInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsUncheckedUpdateManyWithoutEquipmentsNestedInputObjectSchema).optional()
}).strict();
