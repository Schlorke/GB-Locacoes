/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartArgsObjectSchema as CartArgsObjectSchema } from './CartArgs.schema';
import { EquipmentArgsObjectSchema as EquipmentArgsObjectSchema } from './EquipmentArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  cartId: z.boolean().optional(),
  cart: z.union([z.boolean(), z.lazy(() => CartArgsObjectSchema)]).optional(),
  equipmentId: z.boolean().optional(),
  equipment: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional(),
  quantity: z.boolean().optional(),
  days: z.boolean().optional(),
  pricePerDay: z.boolean().optional(),
  finalPrice: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const CartItemSelectObjectSchema: z.ZodType<Prisma.CartItemSelect> = makeSchema() as unknown as z.ZodType<Prisma.CartItemSelect>;
export const CartItemSelectObjectZodSchema = makeSchema();
