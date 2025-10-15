/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

// prettier-ignore
export const CartItemModelSchema = z.object({
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

export type CartItemPureType = z.infer<typeof CartItemModelSchema>;
