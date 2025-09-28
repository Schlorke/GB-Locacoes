/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutCategoryInputObjectSchema as EquipmentCreateWithoutCategoryInputObjectSchema } from './EquipmentCreateWithoutCategoryInput.schema';
import { EquipmentUncheckedCreateWithoutCategoryInputObjectSchema as EquipmentUncheckedCreateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateWithoutCategoryInput.schema';
import { EquipmentCreateOrConnectWithoutCategoryInputObjectSchema as EquipmentCreateOrConnectWithoutCategoryInputObjectSchema } from './EquipmentCreateOrConnectWithoutCategoryInput.schema';
import { CategoryEquipmentCreateManyCategoryInputEnvelopeObjectSchema as EquipmentCreateManyCategoryInputEnvelopeObjectSchema } from './EquipmentCreateManyCategoryInputEnvelope.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema).array(), z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EquipmentCreateOrConnectWithoutCategoryInputObjectSchema), z.lazy(() => EquipmentCreateOrConnectWithoutCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EquipmentCreateManyCategoryInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => EquipmentWhereUniqueInputObjectSchema), z.lazy(() => EquipmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedCreateNestedManyWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUncheckedCreateNestedManyWithoutCategoryInput>;
export const EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectZodSchema = makeSchema();
