import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUpdateWithoutEquipmentsInput.schema';
import { CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedUpdateWithoutEquipmentsInput.schema';
import { CategoryCreateWithoutEquipmentsInputObjectSchema } from './CategoryCreateWithoutEquipmentsInput.schema';
import { CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedCreateWithoutEquipmentsInput.schema';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => CategoryUpdateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema)]),
  where: z.lazy(() => CategoryWhereInputObjectSchema).optional()
}).strict();
export const CategoryUpsertWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.CategoryUpsertWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUpsertWithoutEquipmentsInput>;
export const CategoryUpsertWithoutEquipmentsInputObjectZodSchema = makeSchema();
