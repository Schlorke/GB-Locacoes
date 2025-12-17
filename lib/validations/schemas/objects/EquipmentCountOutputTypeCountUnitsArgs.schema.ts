import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitWhereInputObjectSchema as EquipmentUnitWhereInputObjectSchema } from './EquipmentUnitWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentUnitWhereInputObjectSchema).optional()
}).strict();
export const EquipmentCountOutputTypeCountUnitsArgsObjectSchema = makeSchema();
export const EquipmentCountOutputTypeCountUnitsArgsObjectZodSchema = makeSchema();
