/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  role: z.boolean().optional(),
  module: z.boolean().optional(),
  action: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const PermissionSelectObjectSchema: z.ZodType<Prisma.PermissionSelect> = makeSchema() as unknown as z.ZodType<Prisma.PermissionSelect>;
export const PermissionSelectObjectZodSchema = makeSchema();
