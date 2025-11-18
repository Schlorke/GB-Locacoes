/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const CategoryCreateResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  iconColor: z.string(),
  bgColor: z.string(),
  fontColor: z.string(),
  slug: z.string(),
  placement: z.string().optional(),
  customIcon: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  equipments: z.array(z.unknown())
});