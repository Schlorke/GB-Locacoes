import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  phone: z.literal(true).optional(),
  cnh: z.literal(true).optional(),
  cnhCategory: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const DriverMinAggregateInputObjectSchema: z.ZodType<Prisma.DriverMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DriverMinAggregateInputType>;
export const DriverMinAggregateInputObjectZodSchema = makeSchema();
