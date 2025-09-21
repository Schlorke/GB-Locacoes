import { z } from 'zod';
export const AccountDeleteManyResultSchema = z.object({
  count: z.number()
});