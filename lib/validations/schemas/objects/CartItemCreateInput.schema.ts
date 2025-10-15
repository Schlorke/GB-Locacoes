/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCreateNestedOneWithoutItemsInputObjectSchema as CartCreateNestedOneWithoutItemsInputObjectSchema } from './CartCreateNestedOneWithoutItemsInput.schema';
import { EquipmentCreateNestedOneWithoutCartItemsInputObjectSchema as EquipmentCreateNestedOneWithoutCartItemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.number(),
  finalPrice: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  cart: z.lazy(() => CartCreateNestedOneWithoutItemsInputObjectSchema),
  equipment: z.lazy(() => EquipmentCreateNestedOneWithoutCartItemsInputObjectSchema)
}).strict();
export const CartItemCreateInputObjectSchema: z.ZodType<Prisma.CartItemCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateInput>;
export const CartItemCreateInputObjectZodSchema = makeSchema();
