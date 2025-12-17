import * as z from 'zod';
export const DriverDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  cnh: z.string().optional(),
  cnhCategory: z.string().optional(),
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
}));