import { z } from 'zod';
export const QuoteItemDeleteManyResultSchema = z.object({
  count: z.number()
});