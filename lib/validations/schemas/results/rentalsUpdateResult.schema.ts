import { z } from 'zod';
export const rentalsUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().optional(),
  userid: z.string(),
  createdat: z.date().optional(),
  updatedat: z.date().optional(),
  rental_items: z.array(z.unknown()),
  users: z.unknown()
}));