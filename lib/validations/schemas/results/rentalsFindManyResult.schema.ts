import * as z from 'zod';
export const rentalsFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});