import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceWhereUniqueInputObjectSchema as MaintenanceWhereUniqueInputObjectSchema } from './MaintenanceWhereUniqueInput.schema';
import { MaintenanceUpdateWithoutEquipmentInputObjectSchema as MaintenanceUpdateWithoutEquipmentInputObjectSchema } from './MaintenanceUpdateWithoutEquipmentInput.schema';
import { MaintenanceUncheckedUpdateWithoutEquipmentInputObjectSchema as MaintenanceUncheckedUpdateWithoutEquipmentInputObjectSchema } from './MaintenanceUncheckedUpdateWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaintenanceWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MaintenanceUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => MaintenanceUncheckedUpdateWithoutEquipmentInputObjectSchema)])
}).strict();
export const MaintenanceUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.MaintenanceUpdateWithWhereUniqueWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceUpdateWithWhereUniqueWithoutEquipmentInput>;
export const MaintenanceUpdateWithWhereUniqueWithoutEquipmentInputObjectZodSchema = makeSchema();
