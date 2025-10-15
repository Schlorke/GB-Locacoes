/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

// prettier-ignore
export const rentalsInputSchema = z.object({
    id: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    total: z.number(),
    status: z.string().optional().nullable(),
    userid: z.string(),
    createdat: z.date().optional().nullable(),
    updatedat: z.date().optional().nullable(),
    rental_items: z.array(z.unknown()),
    users: z.unknown()
}).strict();

export type rentalsInputType = z.infer<typeof rentalsInputSchema>;
