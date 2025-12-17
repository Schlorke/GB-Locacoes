import * as z from 'zod';
export const PermissionUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  role: z.unknown(),
  module: z.string(),
  action: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}));