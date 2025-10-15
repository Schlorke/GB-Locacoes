/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateNestedManyWithoutCategoryInputObjectSchema as EquipmentCreateNestedManyWithoutCategoryInputObjectSchema } from './EquipmentCreateNestedManyWithoutCategoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  iconColor: z.string().optional(),
  bgColor: z.string().optional(),
  fontColor: z.string().optional(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  equipments: z.lazy(() => EquipmentCreateNestedManyWithoutCategoryInputObjectSchema)
}).strict();
export const CategoryCreateInputObjectSchema: z.ZodType<Prisma.CategoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateInput>;
export const CategoryCreateInputObjectZodSchema = makeSchema();
