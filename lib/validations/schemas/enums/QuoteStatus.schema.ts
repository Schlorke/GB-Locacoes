import { z } from 'zod';

export const QuoteStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'])

export type QuoteStatus = z.infer<typeof QuoteStatusSchema>;