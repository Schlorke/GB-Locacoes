/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema'

const makeSchema = () => z.object({
  role: RoleSchema,
  module: z.string(),
  action: z.string()
}).strict();
export const PermissionRoleModuleActionCompoundUniqueInputObjectSchema: z.ZodType<Prisma.PermissionRoleModuleActionCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PermissionRoleModuleActionCompoundUniqueInput>;
export const PermissionRoleModuleActionCompoundUniqueInputObjectZodSchema = makeSchema();
