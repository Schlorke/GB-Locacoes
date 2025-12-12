/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  role: z.literal(true).optional(),
  module: z.literal(true).optional(),
  action: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const PermissionMaxAggregateInputObjectSchema: z.ZodType<Prisma.PermissionMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PermissionMaxAggregateInputType>;
export const PermissionMaxAggregateInputObjectZodSchema = makeSchema();
