/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const QuoteStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'])

export type QuoteStatus = z.infer<typeof QuoteStatusSchema>;