import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  plate: z.boolean().optional(),
  brand: z.boolean().optional(),
  model: z.boolean().optional(),
  year: z.boolean().optional(),
  type: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const VehicleSelectObjectSchema: z.ZodType<Prisma.VehicleSelect> = makeSchema() as unknown as z.ZodType<Prisma.VehicleSelect>;
export const VehicleSelectObjectZodSchema = makeSchema();
