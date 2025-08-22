import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { CategoryUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUpdateWithoutEquipmentsInput.schema';
import { CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedUpdateWithoutEquipmentsInput.schema';
import { CategoryCreateWithoutEquipmentsInputObjectSchema } from './CategoryCreateWithoutEquipmentsInput.schema';
import { CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedCreateWithoutEquipmentsInput.schema';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema'

export const CategoryUpsertWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.CategoryUpsertWithoutEquipmentsInput, Prisma.CategoryUpsertWithoutEquipmentsInput> = z.object({
  update: z.union([z.lazy(() => CategoryUpdateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema)]),
  where: z.lazy(() => CategoryWhereInputObjectSchema).optional()
}).strict();
export const CategoryUpsertWithoutEquipmentsInputObjectZodSchema = z.object({
  update: z.union([z.lazy(() => CategoryUpdateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema)]),
  where: z.lazy(() => CategoryWhereInputObjectSchema).optional()
}).strict();
