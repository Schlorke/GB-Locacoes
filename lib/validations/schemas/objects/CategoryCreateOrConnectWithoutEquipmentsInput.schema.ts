import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryCreateWithoutEquipmentsInputObjectSchema } from './CategoryCreateWithoutEquipmentsInput.schema';
import { CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedCreateWithoutEquipmentsInput.schema'

export const CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutEquipmentsInput, Prisma.CategoryCreateOrConnectWithoutEquipmentsInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema)])
}).strict();
export const CategoryCreateOrConnectWithoutEquipmentsInputObjectZodSchema = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema)])
}).strict();
