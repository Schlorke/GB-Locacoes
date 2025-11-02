/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
export const CategoryCountOutputTypeCountEquipmentsArgsObjectSchema = makeSchema();
export const CategoryCountOutputTypeCountEquipmentsArgsObjectZodSchema = makeSchema();
