import * as z from 'zod';
// prettier-ignore
export const QuoteItemInputSchema = z.object({
    id: z.string(),
    quoteId: z.string(),
    equipmentId: z.string(),
    quantity: z.number().int(),
    days: z.number().int(),
    pricePerDay: z.number(),
    total: z.number(),
    startDate: z.date().optional().nullable(),
    endDate: z.date().optional().nullable(),
    includeWeekends: z.boolean(),
    appliedDiscount: z.number().optional().nullable(),
    appliedPeriod: z.string().optional().nullable(),
    useDirectValue: z.boolean(),
    directValue: z.number().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    equipment: z.unknown(),
    quote: z.unknown()
}).strict();

export type QuoteItemInputType = z.infer<typeof QuoteItemInputSchema>;
