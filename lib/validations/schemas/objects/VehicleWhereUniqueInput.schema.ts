import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  plate: z.string().optional()
}).strict();
export const VehicleWhereUniqueInputObjectSchema: z.ZodType<Prisma.VehicleWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.VehicleWhereUniqueInput>;
export const VehicleWhereUniqueInputObjectZodSchema = makeSchema();
