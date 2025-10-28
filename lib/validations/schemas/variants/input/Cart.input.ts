/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const CartInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    items: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CartInputType = z.infer<typeof CartInputSchema>;
