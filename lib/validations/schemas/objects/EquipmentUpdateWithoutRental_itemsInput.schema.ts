import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { EquipmentUpdateimagesInputObjectSchema } from './EquipmentUpdateimagesInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema } from './CategoryUpdateOneRequiredWithoutEquipmentsNestedInput.schema';
import { QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema } from './QuoteItemUpdateManyWithoutEquipmentNestedInput.schema'

export const EquipmentUpdateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateWithoutRental_itemsInput, Prisma.EquipmentUpdateWithoutRental_itemsInput> = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  pricePerDay: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  images: z.union([z.lazy(() => EquipmentUpdateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  category_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema).optional(),
  quoteItems: z.lazy(() => QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema).optional()
}).strict();
export const EquipmentUpdateWithoutRental_itemsInputObjectZodSchema = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  pricePerDay: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  images: z.union([z.lazy(() => EquipmentUpdateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  category_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema).optional(),
  quoteItems: z.lazy(() => QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema).optional()
}).strict();
