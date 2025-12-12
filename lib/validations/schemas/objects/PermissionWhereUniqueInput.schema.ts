/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PermissionRoleModuleActionCompoundUniqueInputObjectSchema as PermissionRoleModuleActionCompoundUniqueInputObjectSchema } from './PermissionRoleModuleActionCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  role_module_action: z.lazy(() => PermissionRoleModuleActionCompoundUniqueInputObjectSchema).optional()
}).strict();
export const PermissionWhereUniqueInputObjectSchema: z.ZodType<Prisma.PermissionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PermissionWhereUniqueInput>;
export const PermissionWhereUniqueInputObjectZodSchema = makeSchema();
