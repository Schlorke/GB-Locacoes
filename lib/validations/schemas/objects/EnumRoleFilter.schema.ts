import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { NestedEnumRoleFilterObjectSchema } from './NestedEnumRoleFilter.schema'

export const EnumRoleFilterObjectSchema: z.ZodType<Prisma.EnumRoleFilter, Prisma.EnumRoleFilter> = z.object({
  equals: RoleSchema.optional(),
  in: RoleSchema.array().optional(),
  notIn: RoleSchema.array().optional(),
  not: z.union([RoleSchema, z.lazy(() => NestedEnumRoleFilterObjectSchema)]).optional()
}).strict();
export const EnumRoleFilterObjectZodSchema = z.object({
  equals: RoleSchema.optional(),
  in: RoleSchema.array().optional(),
  notIn: RoleSchema.array().optional(),
  not: z.union([RoleSchema, z.lazy(() => NestedEnumRoleFilterObjectSchema)]).optional()
}).strict();
