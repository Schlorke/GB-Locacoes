import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleTypeSchema } from '../enums/VehicleType.schema';
import { VehicleStatusSchema } from '../enums/VehicleStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  plate: z.string(),
  brand: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  year: z.number().int().optional().nullable(),
  type: VehicleTypeSchema.optional(),
  status: VehicleStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const VehicleCreateManyInputObjectSchema: z.ZodType<Prisma.VehicleCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.VehicleCreateManyInput>;
export const VehicleCreateManyInputObjectZodSchema = makeSchema();
