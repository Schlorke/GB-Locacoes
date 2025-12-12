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
    quoteId: z.string().nullable(),
    quote: z.unknown().nullable(),
    lateFee: z.number().nullable(),
    extensionDays: z.number().int().nullable(),
    extensionFee: z.number().nullable(),
    checkInAt: z.date().nullable(),
    checkOutAt: z.date().nullable(),
    notes: z.string().nullable(),
    rental_items: z.array(z.unknown()),
    users: z.unknown(),
    payments: z.array(z.unknown()),
    deliveries: z.array(z.unknown()),
    contract: z.unknown().nullable()
}).strict();

export type rentalsResultType = z.infer<typeof rentalsResultSchema>;
