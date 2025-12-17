import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  role: RoleSchema,
  module: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PermissionCreateManyInputObjectSchema: z.ZodType<Prisma.PermissionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PermissionCreateManyInput>;
export const PermissionCreateManyInputObjectZodSchema = makeSchema();
