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
    checkInAt: z.date().optional().nullable(),
    checkOutAt: z.date().optional().nullable(),
    extensionDays: z.number().int().optional().nullable(),
    extensionFee: z.number().optional().nullable(),
    lateFee: z.number().optional().nullable(),
    notes: z.string().optional().nullable(),
    quoteId: z.string().optional().nullable(),
    contract: z.unknown().optional().nullable(),
    deliveries: z.array(z.unknown()),
    payments: z.array(z.unknown()),
    rental_items: z.array(z.unknown()),
    quote: z.unknown().optional().nullable(),
    users: z.unknown()
}).strict();

export type rentalsInputType = z.infer<typeof rentalsInputSchema>;
