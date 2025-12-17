import * as z from 'zod';
export const CartItemFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});