import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { EquipmentUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema } from './EquipmentUpdateOneRequiredWithoutRental_itemsNestedInput.schema';
import { rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema } from './rentalsUpdateOneRequiredWithoutRental_itemsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  priceperday: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  totaldays: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalprice: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdat: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  updatedat: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  equipments: z.lazy(() => EquipmentUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema).optional()
}).strict();
export const rental_itemsUpdateInputObjectSchema: z.ZodType<Prisma.rental_itemsUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUpdateInput>;
export const rental_itemsUpdateInputObjectZodSchema = makeSchema();
