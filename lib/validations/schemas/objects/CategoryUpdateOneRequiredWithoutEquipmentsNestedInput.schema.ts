/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateWithoutEquipmentsInputObjectSchema as CategoryCreateWithoutEquipmentsInputObjectSchema } from './CategoryCreateWithoutEquipmentsInput.schema';
import { CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema as CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedCreateWithoutEquipmentsInput.schema';
import { CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema as CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema } from './CategoryCreateOrConnectWithoutEquipmentsInput.schema';
import { CategoryUpsertWithoutEquipmentsInputObjectSchema as CategoryUpsertWithoutEquipmentsInputObjectSchema } from './CategoryUpsertWithoutEquipmentsInput.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateToOneWithWhereWithoutEquipmentsInputObjectSchema as CategoryUpdateToOneWithWhereWithoutEquipmentsInputObjectSchema } from './CategoryUpdateToOneWithWhereWithoutEquipmentsInput.schema';
import { CategoryUpdateWithoutEquipmentsInputObjectSchema as CategoryUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUpdateWithoutEquipmentsInput.schema';
import { CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema as CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedUpdateWithoutEquipmentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutEquipmentsInputObjectSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CategoryUpdateToOneWithWhereWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUpdateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema)]).optional()
}).strict();
export const CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutEquipmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutEquipmentsNestedInput>;
export const CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectZodSchema = makeSchema();
