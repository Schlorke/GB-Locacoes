import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutEquipmentsInput, Prisma.CategoryUncheckedCreateWithoutEquipmentsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  iconColor: z.string().optional(),
  bgColor: z.string().optional(),
  fontColor: z.string().optional(),
  slug: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const CategoryUncheckedCreateWithoutEquipmentsInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  iconColor: z.string().optional(),
  bgColor: z.string().optional(),
  fontColor: z.string().optional(),
  slug: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
