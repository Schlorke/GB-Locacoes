/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleSelectObjectSchema as VehicleSelectObjectSchema } from './VehicleSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => VehicleSelectObjectSchema).optional()
}).strict();
export const VehicleArgsObjectSchema = makeSchema();
export const VehicleArgsObjectZodSchema = makeSchema();
