import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentScalarWhereInputObjectSchema } from './EquipmentScalarWhereInput.schema';
import { EquipmentUpdateManyMutationInputObjectSchema } from './EquipmentUpdateManyMutationInput.schema';
import { EquipmentUncheckedUpdateManyWithoutCategoryInputObjectSchema } from './EquipmentUncheckedUpdateManyWithoutCategoryInput.schema'

export const EquipmentUpdateManyWithWhereWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateManyWithWhereWithoutCategoryInput, Prisma.EquipmentUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => EquipmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => EquipmentUpdateManyMutationInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateManyWithoutCategoryInputObjectSchema)])
}).strict();
export const EquipmentUpdateManyWithWhereWithoutCategoryInputObjectZodSchema = z.object({
  where: z.lazy(() => EquipmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => EquipmentUpdateManyMutationInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateManyWithoutCategoryInputObjectSchema)])
}).strict();
