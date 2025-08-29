import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentCreateWithoutCategoryInputObjectSchema } from './EquipmentCreateWithoutCategoryInput.schema';
import { EquipmentUncheckedCreateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateWithoutCategoryInput.schema';
import { EquipmentCreateOrConnectWithoutCategoryInputObjectSchema } from './EquipmentCreateOrConnectWithoutCategoryInput.schema';
import { EquipmentUpsertWithWhereUniqueWithoutCategoryInputObjectSchema } from './EquipmentUpsertWithWhereUniqueWithoutCategoryInput.schema';
import { EquipmentCreateManyCategoryInputEnvelopeObjectSchema } from './EquipmentCreateManyCategoryInputEnvelope.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateWithWhereUniqueWithoutCategoryInputObjectSchema } from './EquipmentUpdateWithWhereUniqueWithoutCategoryInput.schema';
import { EquipmentUpdateManyWithWhereWithoutCategoryInputObjectSchema } from './EquipmentUpdateManyWithWhereWithoutCategoryInput.schema';
import { EquipmentScalarWhereInputObjectSchema } from './EquipmentScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema).array(), z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EquipmentCreateOrConnectWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentCreateOrConnectWithoutCategoryInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => EquipmentUpsertWithWhereUniqueWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUpsertWithWhereUniqueWithoutCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EquipmentCreateManyCategoryInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => EquipmentWhereUniqueInputObjectSchema), z.lazy(() => EquipmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => EquipmentWhereUniqueInputObjectSchema), z.lazy(() => EquipmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => EquipmentWhereUniqueInputObjectSchema), z.lazy(() => EquipmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => EquipmentWhereUniqueInputObjectSchema), z.lazy(() => EquipmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => EquipmentUpdateWithWhereUniqueWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUpdateWithWhereUniqueWithoutCategoryInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => EquipmentUpdateManyWithWhereWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUpdateManyWithWhereWithoutCategoryInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => EquipmentScalarWhereInputObjectSchema), z.lazy(() => EquipmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const EquipmentUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedUpdateManyWithoutCategoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUncheckedUpdateManyWithoutCategoryNestedInput>;
export const EquipmentUncheckedUpdateManyWithoutCategoryNestedInputObjectZodSchema = makeSchema();
