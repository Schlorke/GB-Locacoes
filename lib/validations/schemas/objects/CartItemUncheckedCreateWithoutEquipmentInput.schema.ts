/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  cartId: z.string(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.number(),
  finalPrice: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CartItemUncheckedCreateWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemUncheckedCreateWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUncheckedCreateWithoutEquipmentInput>;
export const CartItemUncheckedCreateWithoutEquipmentInputObjectZodSchema = makeSchema();
