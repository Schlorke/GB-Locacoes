/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  phone: z.boolean().optional(),
  cnh: z.boolean().optional(),
  cnhCategory: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const DriverSelectObjectSchema: z.ZodType<Prisma.DriverSelect> = makeSchema() as unknown as z.ZodType<Prisma.DriverSelect>;
export const DriverSelectObjectZodSchema = makeSchema();
