import * as z from 'zod';
// prettier-ignore
export const CartInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    items: z.array(z.unknown()),
    user: z.unknown()
}).strict();

export type CartInputType = z.infer<typeof CartInputSchema>;
