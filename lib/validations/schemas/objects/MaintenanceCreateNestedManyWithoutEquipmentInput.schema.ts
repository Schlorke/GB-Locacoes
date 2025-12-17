import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceCreateWithoutEquipmentInputObjectSchema as MaintenanceCreateWithoutEquipmentInputObjectSchema } from './MaintenanceCreateWithoutEquipmentInput.schema';
import { MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema as MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema } from './MaintenanceUncheckedCreateWithoutEquipmentInput.schema';
import { MaintenanceCreateOrConnectWithoutEquipmentInputObjectSchema as MaintenanceCreateOrConnectWithoutEquipmentInputObjectSchema } from './MaintenanceCreateOrConnectWithoutEquipmentInput.schema';
import { MaintenanceCreateManyEquipmentInputEnvelopeObjectSchema as MaintenanceCreateManyEquipmentInputEnvelopeObjectSchema } from './MaintenanceCreateManyEquipmentInputEnvelope.schema';
import { MaintenanceWhereUniqueInputObjectSchema as MaintenanceWhereUniqueInputObjectSchema } from './MaintenanceWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaintenanceCreateWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaintenanceCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaintenanceCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MaintenanceWhereUniqueInputObjectSchema), z.lazy(() => MaintenanceWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MaintenanceCreateNestedManyWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.MaintenanceCreateNestedManyWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceCreateNestedManyWithoutEquipmentInput>;
export const MaintenanceCreateNestedManyWithoutEquipmentInputObjectZodSchema = makeSchema();
