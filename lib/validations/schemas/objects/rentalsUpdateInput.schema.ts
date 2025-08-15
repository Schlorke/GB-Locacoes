import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { rental_itemsUpdateManyWithoutRentalsNestedInputObjectSchema } from './rental_itemsUpdateManyWithoutRentalsNestedInput.schema';
import { UserUpdateOneRequiredWithoutRentalsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutRentalsNestedInput.schema'

export const rentalsUpdateInputObjectSchema: z.ZodType<Prisma.rentalsUpdateInput, Prisma.rentalsUpdateInput> = z.object({
  startdate: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  enddate: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  total: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdat: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  updatedat: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  rental_items: z.lazy(() => rental_itemsUpdateManyWithoutRentalsNestedInputObjectSchema).optional(),
  users: z.lazy(() => UserUpdateOneRequiredWithoutRentalsNestedInputObjectSchema).optional()
}).strict();
export const rentalsUpdateInputObjectZodSchema = z.object({
  startdate: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  enddate: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  total: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdat: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  updatedat: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  rental_items: z.lazy(() => rental_itemsUpdateManyWithoutRentalsNestedInputObjectSchema).optional(),
  users: z.lazy(() => UserUpdateOneRequiredWithoutRentalsNestedInputObjectSchema).optional()
}).strict();
