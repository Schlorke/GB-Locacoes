/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

// prettier-ignore
export const rentalsResultSchema = z.object({
    id: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    total: z.number(),
    status: z.string().nullable(),
    userid: z.string(),
    createdat: z.date().nullable(),
    updatedat: z.date().nullable(),
    rental_items: z.array(z.unknown()),
    users: z.unknown()
}).strict();

export type rentalsResultType = z.infer<typeof rentalsResultSchema>;
