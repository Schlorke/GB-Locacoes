import { z } from 'zod';
export const CartItemFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  cartId: z.string(),
  cart: z.unknown(),
  equipmentId: z.string(),
  equipment: z.unknown(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.number(),
  finalPrice: z.number().optional(),
  createdAt: z.date()
}));