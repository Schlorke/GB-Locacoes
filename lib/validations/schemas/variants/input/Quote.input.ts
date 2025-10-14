/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

import { QuoteStatusSchema } from '../../enums/QuoteStatus.schema'
// prettier-ignore
export const QuoteInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string().optional().nullable(),
    message: z.string().optional().nullable(),
    total: z.number(),
    status: QuoteStatusSchema,
    userId: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    items: z.array(z.unknown()),
    user: z.unknown().optional().nullable()
}).strict();

export type QuoteInputType = z.infer<typeof QuoteInputSchema>
