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
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const DriverCountAggregateInputObjectSchema: z.ZodType<Prisma.DriverCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DriverCountAggregateInputType>;
export const DriverCountAggregateInputObjectZodSchema = makeSchema();
