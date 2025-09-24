import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CartItemUncheckedUpdateManyWithoutCartNestedInputObjectSchema } from './CartItemUncheckedUpdateManyWithoutCartNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  items: z.lazy(() => CartItemUncheckedUpdateManyWithoutCartNestedInputObjectSchema).optional()
}).strict();
export const CartUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.CartUncheckedUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUncheckedUpdateWithoutUserInput>;
export const CartUncheckedUpdateWithoutUserInputObjectZodSchema = makeSchema();
