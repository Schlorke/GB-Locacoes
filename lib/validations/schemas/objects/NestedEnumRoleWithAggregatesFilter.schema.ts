import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumRoleFilterObjectSchema } from './NestedEnumRoleFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: RoleSchema.optional(),
  in: RoleSchema.array().optional(),
  notIn: RoleSchema.array().optional(),
  not: z.union([RoleSchema, z.lazy(makeSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterObjectSchema).optional()
}).strict();
export const NestedEnumRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter>;
export const NestedEnumRoleWithAggregatesFilterObjectZodSchema = makeSchema();
