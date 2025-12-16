/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const CartItemModelSchema = z.object({
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

export type CartItemPureType = z.infer<typeof CartItemModelSchema>;
