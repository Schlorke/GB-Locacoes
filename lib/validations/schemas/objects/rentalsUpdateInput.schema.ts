import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { rental_itemsUpdateManyWithoutRentalsNestedInputObjectSchema } from './rental_itemsUpdateManyWithoutRentalsNestedInput.schema';
import { UserUpdateOneRequiredWithoutRentalsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutRentalsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  startdate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  enddate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  total: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdat: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  updatedat: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  rental_items: z.lazy(() => rental_itemsUpdateManyWithoutRentalsNestedInputObjectSchema).optional(),
  users: z.lazy(() => UserUpdateOneRequiredWithoutRentalsNestedInputObjectSchema).optional()
}).strict();
export const rentalsUpdateInputObjectSchema: z.ZodType<Prisma.rentalsUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateInput>;
export const rentalsUpdateInputObjectZodSchema = makeSchema();
