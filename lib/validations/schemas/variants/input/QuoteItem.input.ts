/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

// prettier-ignore
export const QuoteItemInputSchema = z.object({
    id: z.string(),
    quoteId: z.string(),
    equipmentId: z.string(),
    quantity: z.number().int(),
    days: z.number().int(),
    pricePerDay: z.number(),
    total: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    equipment: z.unknown(),
    quote: z.unknown()
}).strict();

export type QuoteItemInputType = z.infer<typeof QuoteItemInputSchema>;
