import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateWithoutCategoryInputObjectSchema } from './EquipmentUpdateWithoutCategoryInput.schema';
import { EquipmentUncheckedUpdateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedUpdateWithoutCategoryInput.schema';
import { EquipmentCreateWithoutCategoryInputObjectSchema } from './EquipmentCreateWithoutCategoryInput.schema';
import { EquipmentUncheckedCreateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateWithoutCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => EquipmentUpdateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutCategoryInputObjectSchema)]),
  create: z.union([z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema)])
}).strict();
export const EquipmentUpsertWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentUpsertWithWhereUniqueWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpsertWithWhereUniqueWithoutCategoryInput>;
export const EquipmentUpsertWithWhereUniqueWithoutCategoryInputObjectZodSchema = makeSchema();
