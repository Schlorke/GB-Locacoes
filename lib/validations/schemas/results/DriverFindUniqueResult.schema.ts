/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const DriverFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  cnh: z.string().optional(),
  cnhCategory: z.string().optional(),
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
}));