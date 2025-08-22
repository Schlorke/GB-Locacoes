import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentCreateWithoutCategoryInputObjectSchema } from './EquipmentCreateWithoutCategoryInput.schema';
import { EquipmentUncheckedCreateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateWithoutCategoryInput.schema';
import { EquipmentCreateOrConnectWithoutCategoryInputObjectSchema } from './EquipmentCreateOrConnectWithoutCategoryInput.schema';
import { EquipmentCreateManyCategoryInputEnvelopeObjectSchema } from './EquipmentCreateManyCategoryInputEnvelope.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'

export const EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedCreateNestedManyWithoutCategoryInput, Prisma.EquipmentUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema).array(), z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EquipmentCreateOrConnectWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentCreateOrConnectWithoutCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EquipmentCreateManyCategoryInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => EquipmentWhereUniqueInputObjectSchema), z.lazy(() => EquipmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema).array(), z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EquipmentCreateOrConnectWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentCreateOrConnectWithoutCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EquipmentCreateManyCategoryInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => EquipmentWhereUniqueInputObjectSchema), z.lazy(() => EquipmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
