import { z } from 'zod';

// prettier-ignore
export const CartResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    items: z.array(z.unknown()).array(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CartResultType = z.infer<typeof CartResultSchema>;
