/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array().optional(),
  push: z.union([z.string(), z.string().array()]).optional()
}).strict();
export const EquipmentUpdateimagesInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateimagesInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateimagesInput>;
export const EquipmentUpdateimagesInputObjectZodSchema = makeSchema();
