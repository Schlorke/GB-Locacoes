import { z } from 'zod';

export const quote_statusSchema = z.enum(['pending', 'approved', 'rejected', 'expired'])

export type quote_status = z.infer<typeof quote_statusSchema>;