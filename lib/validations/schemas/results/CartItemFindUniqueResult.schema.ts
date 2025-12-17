import * as z from 'zod';
export const CartItemFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  cartId: z.string(),
  equipmentId: z.string(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.number(),
  finalPrice: z.number().optional(),
  createdAt: z.date(),
  cart: z.unknown(),
  equipment: z.unknown()
}));