/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
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
    checkInAt: z.date().nullable(),
    checkOutAt: z.date().nullable(),
    extensionDays: z.number().int().nullable(),
    extensionFee: z.number().nullable(),
    lateFee: z.number().nullable(),
    notes: z.string().nullable(),
    quoteId: z.string().nullable(),
    contract: z.unknown().nullable(),
    deliveries: z.array(z.unknown()),
    payments: z.array(z.unknown()),
    rental_items: z.array(z.unknown()),
    quote: z.unknown().nullable(),
    users: z.unknown()
}).strict();

export type rentalsPureType = z.infer<typeof rentalsModelSchema>;
