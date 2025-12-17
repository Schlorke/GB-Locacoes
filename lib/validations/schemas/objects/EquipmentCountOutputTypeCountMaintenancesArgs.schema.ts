import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceWhereInputObjectSchema as MaintenanceWhereInputObjectSchema } from './MaintenanceWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaintenanceWhereInputObjectSchema).optional()
}).strict();
export const EquipmentCountOutputTypeCountMaintenancesArgsObjectSchema = makeSchema();
export const EquipmentCountOutputTypeCountMaintenancesArgsObjectZodSchema = makeSchema();
