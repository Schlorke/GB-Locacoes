import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().nullish(),
  icon: z.string().nullish(),
  iconColor: z.string().optional(),
  bgColor: z.string().optional(),
  fontColor: z.string().optional(),
  slug: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedCreateWithoutEquipmentsInput>;
export const CategoryUncheckedCreateWithoutEquipmentsInputObjectZodSchema = makeSchema();
