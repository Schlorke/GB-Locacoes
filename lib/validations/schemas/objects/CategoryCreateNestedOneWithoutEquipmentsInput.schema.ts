import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateWithoutEquipmentsInputObjectSchema as CategoryCreateWithoutEquipmentsInputObjectSchema } from './CategoryCreateWithoutEquipmentsInput.schema';
import { CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema as CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedCreateWithoutEquipmentsInput.schema';
import { CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema as CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema } from './CategoryCreateOrConnectWithoutEquipmentsInput.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional()
}).strict();
export const CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateNestedOneWithoutEquipmentsInput>;
export const CategoryCreateNestedOneWithoutEquipmentsInputObjectZodSchema = makeSchema();
