/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutCategoryInputObjectSchema as EquipmentCreateWithoutCategoryInputObjectSchema } from './EquipmentCreateWithoutCategoryInput.schema';
import { EquipmentUncheckedCreateWithoutCategoryInputObjectSchema as EquipmentUncheckedCreateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateWithoutCategoryInput.schema';
import { EquipmentCreateOrConnectWithoutCategoryInputObjectSchema as EquipmentCreateOrConnectWithoutCategoryInputObjectSchema } from './EquipmentCreateOrConnectWithoutCategoryInput.schema';
import { EquipmentUpsertWithWhereUniqueWithoutCategoryInputObjectSchema as EquipmentUpsertWithWhereUniqueWithoutCategoryInputObjectSchema } from './EquipmentUpsertWithWhereUniqueWithoutCategoryInput.schema';
import { EquipmentCreateManyCategoryInputEnvelopeObjectSchema as EquipmentCreateManyCategoryInputEnvelopeObjectSchema } from './EquipmentCreateManyCategoryInputEnvelope.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateWithWhereUniqueWithoutCategoryInputObjectSchema as EquipmentUpdateWithWhereUniqueWithoutCategoryInputObjectSchema } from './EquipmentUpdateWithWhereUniqueWithoutCategoryInput.schema';
import { EquipmentUpdateManyWithWhereWithoutCategoryInputObjectSchema as EquipmentUpdateManyWithWhereWithoutCategoryInputObjectSchema } from './EquipmentUpdateManyWithWhereWithoutCategoryInput.schema';
import { EquipmentScalarWhereInputObjectSchema as EquipmentScalarWhereInputObjectSchema } from './EquipmentScalarWhereInput.schema'

const makeSchema = () => z.object({
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
export const EquipmentUpdateManyWithoutCategoryNestedInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateManyWithoutCategoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateManyWithoutCategoryNestedInput>;
export const EquipmentUpdateManyWithoutCategoryNestedInputObjectZodSchema = makeSchema();
