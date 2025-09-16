import { z } from 'zod';

// prettier-ignore
export const rentalsModelSchema = z.object({
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

export type rentalsModelType = z.infer<typeof rentalsModelSchema>;
