/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitCreateWithoutEquipmentInputObjectSchema as EquipmentUnitCreateWithoutEquipmentInputObjectSchema } from './EquipmentUnitCreateWithoutEquipmentInput.schema';
import { EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema as EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema } from './EquipmentUnitUncheckedCreateWithoutEquipmentInput.schema';
import { EquipmentUnitCreateOrConnectWithoutEquipmentInputObjectSchema as EquipmentUnitCreateOrConnectWithoutEquipmentInputObjectSchema } from './EquipmentUnitCreateOrConnectWithoutEquipmentInput.schema';
import { EquipmentUnitCreateManyEquipmentInputEnvelopeObjectSchema as EquipmentUnitCreateManyEquipmentInputEnvelopeObjectSchema } from './EquipmentUnitCreateManyEquipmentInputEnvelope.schema';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './EquipmentUnitWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentUnitCreateWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EquipmentUnitCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EquipmentUnitCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema), z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const EquipmentUnitUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.EquipmentUnitUncheckedCreateNestedManyWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitUncheckedCreateNestedManyWithoutEquipmentInput>;
export const EquipmentUnitUncheckedCreateNestedManyWithoutEquipmentInputObjectZodSchema = makeSchema();
