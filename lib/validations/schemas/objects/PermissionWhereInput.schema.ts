/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumRoleFilterObjectSchema as EnumRoleFilterObjectSchema } from './EnumRoleFilter.schema';
import { RoleSchema } from '../enums/Role.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const permissionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PermissionWhereInputObjectSchema), z.lazy(() => PermissionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PermissionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PermissionWhereInputObjectSchema), z.lazy(() => PermissionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => EnumRoleFilterObjectSchema), RoleSchema]).optional(),
  module: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  action: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PermissionWhereInputObjectSchema: z.ZodType<Prisma.PermissionWhereInput> = permissionwhereinputSchema as unknown as z.ZodType<Prisma.PermissionWhereInput>;
export const PermissionWhereInputObjectZodSchema = permissionwhereinputSchema;
