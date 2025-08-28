import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { EquipmentUpdateimagesInputObjectSchema } from './EquipmentUpdateimagesInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema } from './CategoryUpdateOneRequiredWithoutEquipmentsNestedInput.schema';
import { QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema } from './QuoteItemUpdateManyWithoutEquipmentNestedInput.schema';
import { rental_itemsUpdateManyWithoutEquipmentsNestedInputObjectSchema } from './rental_itemsUpdateManyWithoutEquipmentsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  pricePerDay: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  images: z.union([z.lazy(() => EquipmentUpdateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  category_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema).optional(),
  quoteItems: z.lazy(() => QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsUpdateManyWithoutEquipmentsNestedInputObjectSchema).optional()
}).strict();
export const EquipmentUpdateInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateInput>;
export const EquipmentUpdateInputObjectZodSchema = makeSchema();
