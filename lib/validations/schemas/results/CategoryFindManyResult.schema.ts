import * as z from 'zod';
export const CategoryFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  iconColor: z.string(),
  bgColor: z.string(),
  fontColor: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  placement: z.string().optional(),
  customIcon: z.unknown().optional(),
  equipments: z.array(z.unknown())
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