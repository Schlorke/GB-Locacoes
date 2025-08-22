import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumRoleFilterObjectSchema } from './NestedEnumRoleFilter.schema'

export const NestedEnumRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter, Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: RoleSchema.optional(),
  in: RoleSchema.array().optional(),
  notIn: RoleSchema.array().optional(),
  not: z.union([RoleSchema, z.lazy(() => NestedEnumRoleWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterObjectSchema).optional()
}).strict();
export const NestedEnumRoleWithAggregatesFilterObjectZodSchema = z.object({
  equals: RoleSchema.optional(),
  in: RoleSchema.array().optional(),
  notIn: RoleSchema.array().optional(),
  not: z.union([RoleSchema, z.lazy(() => NestedEnumRoleWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterObjectSchema).optional()
}).strict();
