import * as z from 'zod';
export const PermissionFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  role: z.unknown(),
  module: z.string(),
  action: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}));