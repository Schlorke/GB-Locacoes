/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
export const CartDeleteManyResultSchema = z.object({
  count: z.number()
});