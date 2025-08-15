import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './QuoteUpdateOneRequiredWithoutItemsNestedInput.schema'

export const QuoteItemUpdateWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateWithoutEquipmentInput, Prisma.QuoteItemUpdateWithoutEquipmentInput> = z.object({
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  days: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  pricePerDay: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  total: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional()
}).strict();
export const QuoteItemUpdateWithoutEquipmentInputObjectZodSchema = z.object({
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  days: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  pricePerDay: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  total: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional()
}).strict();
