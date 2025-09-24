import { z } from 'zod';

// prettier-ignore
export const CartItemInputSchema = z.object({
    id: z.string(),
    cartId: z.string(),
    cart: z.unknown(),
    equipmentId: z.string(),
    equipment: z.unknown(),
    quantity: z.number().int(),
    days: z.number().int(),
    pricePerDay: z.number(),
    finalPrice: z.number().optional().nullable(),
    createdAt: z.date()
}).strict();

export type CartItemInputType = z.infer<typeof CartItemInputSchema>;
