/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceCreateWithoutEquipmentInputObjectSchema as MaintenanceCreateWithoutEquipmentInputObjectSchema } from './MaintenanceCreateWithoutEquipmentInput.schema';
import { MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema as MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema } from './MaintenanceUncheckedCreateWithoutEquipmentInput.schema';
import { MaintenanceCreateOrConnectWithoutEquipmentInputObjectSchema as MaintenanceCreateOrConnectWithoutEquipmentInputObjectSchema } from './MaintenanceCreateOrConnectWithoutEquipmentInput.schema';
import { MaintenanceUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema as MaintenanceUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema } from './MaintenanceUpsertWithWhereUniqueWithoutEquipmentInput.schema';
import { MaintenanceCreateManyEquipmentInputEnvelopeObjectSchema as MaintenanceCreateManyEquipmentInputEnvelopeObjectSchema } from './MaintenanceCreateManyEquipmentInputEnvelope.schema';
import { MaintenanceWhereUniqueInputObjectSchema as MaintenanceWhereUniqueInputObjectSchema } from './MaintenanceWhereUniqueInput.schema';
import { MaintenanceUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema as MaintenanceUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema } from './MaintenanceUpdateWithWhereUniqueWithoutEquipmentInput.schema';
import { MaintenanceUpdateManyWithWhereWithoutEquipmentInputObjectSchema as MaintenanceUpdateManyWithWhereWithoutEquipmentInputObjectSchema } from './MaintenanceUpdateManyWithWhereWithoutEquipmentInput.schema';
import { MaintenanceScalarWhereInputObjectSchema as MaintenanceScalarWhereInputObjectSchema } from './MaintenanceScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaintenanceCreateWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaintenanceCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MaintenanceUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaintenanceCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MaintenanceWhereUniqueInputObjectSchema), z.lazy(() => MaintenanceWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MaintenanceWhereUniqueInputObjectSchema), z.lazy(() => MaintenanceWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MaintenanceWhereUniqueInputObjectSchema), z.lazy(() => MaintenanceWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MaintenanceWhereUniqueInputObjectSchema), z.lazy(() => MaintenanceWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MaintenanceUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MaintenanceUpdateManyWithWhereWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceUpdateManyWithWhereWithoutEquipmentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MaintenanceScalarWhereInputObjectSchema), z.lazy(() => MaintenanceScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MaintenanceUncheckedUpdateManyWithoutEquipmentNestedInputObjectSchema: z.ZodType<Prisma.MaintenanceUncheckedUpdateManyWithoutEquipmentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceUncheckedUpdateManyWithoutEquipmentNestedInput>;
export const MaintenanceUncheckedUpdateManyWithoutEquipmentNestedInputObjectZodSchema = makeSchema();
