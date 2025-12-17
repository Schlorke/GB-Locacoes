/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitCreateWithoutEquipmentInputObjectSchema as EquipmentUnitCreateWithoutEquipmentInputObjectSchema } from './EquipmentUnitCreateWithoutEquipmentInput.schema';
import { EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema as EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema } from './EquipmentUnitUncheckedCreateWithoutEquipmentInput.schema';
import { EquipmentUnitCreateOrConnectWithoutEquipmentInputObjectSchema as EquipmentUnitCreateOrConnectWithoutEquipmentInputObjectSchema } from './EquipmentUnitCreateOrConnectWithoutEquipmentInput.schema';
import { EquipmentUnitUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema as EquipmentUnitUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema } from './EquipmentUnitUpsertWithWhereUniqueWithoutEquipmentInput.schema';
import { EquipmentUnitCreateManyEquipmentInputEnvelopeObjectSchema as EquipmentUnitCreateManyEquipmentInputEnvelopeObjectSchema } from './EquipmentUnitCreateManyEquipmentInputEnvelope.schema';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './EquipmentUnitWhereUniqueInput.schema';
import { EquipmentUnitUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema as EquipmentUnitUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema } from './EquipmentUnitUpdateWithWhereUniqueWithoutEquipmentInput.schema';
import { EquipmentUnitUpdateManyWithWhereWithoutEquipmentInputObjectSchema as EquipmentUnitUpdateManyWithWhereWithoutEquipmentInputObjectSchema } from './EquipmentUnitUpdateManyWithWhereWithoutEquipmentInput.schema';
import { EquipmentUnitScalarWhereInputObjectSchema as EquipmentUnitScalarWhereInputObjectSchema } from './EquipmentUnitScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentUnitCreateWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EquipmentUnitCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => EquipmentUnitUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EquipmentUnitCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema), z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema), z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema), z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema), z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => EquipmentUnitUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => EquipmentUnitUpdateManyWithWhereWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitUpdateManyWithWhereWithoutEquipmentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => EquipmentUnitScalarWhereInputObjectSchema), z.lazy(() => EquipmentUnitScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const EquipmentUnitUncheckedUpdateManyWithoutEquipmentNestedInputObjectSchema: z.ZodType<Prisma.EquipmentUnitUncheckedUpdateManyWithoutEquipmentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitUncheckedUpdateManyWithoutEquipmentNestedInput>;
export const EquipmentUnitUncheckedUpdateManyWithoutEquipmentNestedInputObjectZodSchema = makeSchema();
