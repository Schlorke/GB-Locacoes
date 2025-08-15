import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateWithoutCategoryInputObjectSchema } from './EquipmentUpdateWithoutCategoryInput.schema';
import { EquipmentUncheckedUpdateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedUpdateWithoutCategoryInput.schema'

export const EquipmentUpdateWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateWithWhereUniqueWithoutCategoryInput, Prisma.EquipmentUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => EquipmentUpdateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutCategoryInputObjectSchema)])
}).strict();
export const EquipmentUpdateWithWhereUniqueWithoutCategoryInputObjectZodSchema = z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => EquipmentUpdateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutCategoryInputObjectSchema)])
}).strict();
