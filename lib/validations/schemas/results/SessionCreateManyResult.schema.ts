import { z } from 'zod';
export const SessionCreateManyResultSchema = z.object({
  count: z.number()
});