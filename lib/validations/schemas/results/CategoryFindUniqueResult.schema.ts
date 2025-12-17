import * as z from 'zod';
export const CategoryFindUniqueResultSchema = z.nullable(z.object({
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
}));