import { z } from 'zod';
export const AccountCreateManyResultSchema = z.object({
  count: z.number()
});