import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceWhereUniqueInputObjectSchema as MaintenanceWhereUniqueInputObjectSchema } from './MaintenanceWhereUniqueInput.schema';
import { MaintenanceUpdateWithoutEquipmentInputObjectSchema as MaintenanceUpdateWithoutEquipmentInputObjectSchema } from './MaintenanceUpdateWithoutEquipmentInput.schema';
import { MaintenanceUncheckedUpdateWithoutEquipmentInputObjectSchema as MaintenanceUncheckedUpdateWithoutEquipmentInputObjectSchema } from './MaintenanceUncheckedUpdateWithoutEquipmentInput.schema';
import { MaintenanceCreateWithoutEquipmentInputObjectSchema as MaintenanceCreateWithoutEquipmentInputObjectSchema } from './MaintenanceCreateWithoutEquipmentInput.schema';
import { MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema as MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema } from './MaintenanceUncheckedCreateWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaintenanceWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MaintenanceUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceUncheckedUpdateWithoutEquipmentInputObjectSchema)]),
  create: z.union([z.lazy(() => MaintenanceCreateWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceUncheckedCreateWithoutEquipmentInputObjectSchema)])
}).strict();
export const MaintenanceUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.MaintenanceUpsertWithWhereUniqueWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceUpsertWithWhereUniqueWithoutEquipmentInput>;
export const MaintenanceUpsertWithWhereUniqueWithoutEquipmentInputObjectZodSchema = makeSchema();
