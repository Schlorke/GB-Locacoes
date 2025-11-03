/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { QuoteStatusSchema } from '../../enums/QuoteStatus.schema';
// prettier-ignore
export const QuoteModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string().nullable(),
    message: z.string().nullable(),
    total: z.number(),
    status: QuoteStatusSchema,
    userId: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    items: z.array(z.unknown()),
    user: z.unknown().nullable()
}).strict();

export type QuotePureType = z.infer<typeof QuoteModelSchema>;
