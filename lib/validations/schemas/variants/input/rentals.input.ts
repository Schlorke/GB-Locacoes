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
    quoteId: z.string().optional().nullable(),
    quote: z.unknown().optional().nullable(),
    lateFee: z.number().optional().nullable(),
    extensionDays: z.number().int().optional().nullable(),
    extensionFee: z.number().optional().nullable(),
    checkInAt: z.date().optional().nullable(),
    checkOutAt: z.date().optional().nullable(),
    notes: z.string().optional().nullable(),
    rental_items: z.array(z.unknown()),
    users: z.unknown(),
    payments: z.array(z.unknown()),
    deliveries: z.array(z.unknown()),
    contract: z.unknown().optional().nullable()
}).strict();

export type rentalsInputType = z.infer<typeof rentalsInputSchema>;
