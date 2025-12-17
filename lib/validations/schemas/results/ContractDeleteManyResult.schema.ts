import * as z from 'zod';
export const ContractDeleteManyResultSchema = z.object({
  count: z.number()
});