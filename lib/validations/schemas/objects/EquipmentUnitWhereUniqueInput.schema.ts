/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  uniqueCode: z.string().optional()
}).strict();
export const EquipmentUnitWhereUniqueInputObjectSchema: z.ZodType<Prisma.EquipmentUnitWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitWhereUniqueInput>;
export const EquipmentUnitWhereUniqueInputObjectZodSchema = makeSchema();
