import * as z from 'zod';
export const AuditLogCreateManyResultSchema = z.object({
  count: z.number()
});