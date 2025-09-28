/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateNestedOneWithoutCartItemsInputObjectSchema as EquipmentCreateNestedOneWithoutCartItemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.number(),
  finalPrice: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  equipment: z.lazy(() => EquipmentCreateNestedOneWithoutCartItemsInputObjectSchema)
}).strict();
export const CartItemCreateWithoutCartInputObjectSchema: z.ZodType<Prisma.CartItemCreateWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateWithoutCartInput>;
export const CartItemCreateWithoutCartInputObjectZodSchema = makeSchema();
