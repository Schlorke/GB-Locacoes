import { z } from 'zod';
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
export const CartItemCreateManyEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemCreateManyEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateManyEquipmentInput>;
export const CartItemCreateManyEquipmentInputObjectZodSchema = makeSchema();
