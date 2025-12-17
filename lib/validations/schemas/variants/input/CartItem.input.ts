import * as z from 'zod';
// prettier-ignore
export const CartItemInputSchema = z.object({
    id: z.string(),
    cartId: z.string(),
    equipmentId: z.string(),
    quantity: z.number().int(),
    days: z.number().int(),
    pricePerDay: z.number(),
    finalPrice: z.number().optional().nullable(),
    createdAt: z.date(),
    cart: z.unknown(),
    equipment: z.unknown()
}).strict();

export type CartItemInputType = z.infer<typeof CartItemInputSchema>;
