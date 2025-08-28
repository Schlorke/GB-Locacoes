import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateNestedManyWithoutCategoryInput.schema'

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
  updatedAt: z.date().optional(),
  equipments: z.lazy(() => EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const CategoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedCreateInput>;
export const CategoryUncheckedCreateInputObjectZodSchema = makeSchema();
