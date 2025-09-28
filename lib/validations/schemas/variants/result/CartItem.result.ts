/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

// prettier-ignore
export const CartItemResultSchema = z.object({
    id: z.string(),
    cartId: z.string(),
    cart: z.unknown(),
    equipmentId: z.string(),
    equipment: z.unknown(),
    quantity: z.number().int(),
    days: z.number().int(),
    pricePerDay: z.number(),
    finalPrice: z.number().nullable(),
    createdAt: z.date()
}).strict();

export type CartItemResultType = z.infer<typeof CartItemResultSchema>;
