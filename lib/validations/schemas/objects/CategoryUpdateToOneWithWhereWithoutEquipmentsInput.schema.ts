/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema';
import { CategoryUpdateWithoutEquipmentsInputObjectSchema as CategoryUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUpdateWithoutEquipmentsInput.schema';
import { CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema as CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedUpdateWithoutEquipmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CategoryUpdateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema)])
}).strict();
export const CategoryUpdateToOneWithWhereWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutEquipmentsInput>;
export const CategoryUpdateToOneWithWhereWithoutEquipmentsInputObjectZodSchema = makeSchema();
