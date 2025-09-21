import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectSchema } from './EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInput.schema';
import { QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './QuoteUpdateOneRequiredWithoutItemsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  days: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  pricePerDay: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  total: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  equipment: z.lazy(() => EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectSchema).optional(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional()
}).strict();
export const QuoteItemUpdateInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateInput>;
export const QuoteItemUpdateInputObjectZodSchema = makeSchema();
