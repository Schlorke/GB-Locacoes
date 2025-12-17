/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const CartItemResultSchema = z.object({
    id: z.string(),
    cartId: z.string(),
    equipmentId: z.string(),
    quantity: z.number().int(),
    days: z.number().int(),
    pricePerDay: z.number(),
    finalPrice: z.number().nullable(),
    createdAt: z.date(),
    cart: z.unknown(),
    equipment: z.unknown()
}).strict();

export type CartItemResultType = z.infer<typeof CartItemResultSchema>;
