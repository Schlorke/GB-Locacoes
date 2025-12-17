import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { NestedEnumRoleFilterObjectSchema as NestedEnumRoleFilterObjectSchema } from './NestedEnumRoleFilter.schema'

const makeSchema = () => z.object({
  equals: RoleSchema.optional(),
  in: RoleSchema.array().optional(),
  notIn: RoleSchema.array().optional(),
  not: z.union([RoleSchema, z.lazy(() => NestedEnumRoleFilterObjectSchema)]).optional()
}).strict();
export const EnumRoleFilterObjectSchema: z.ZodType<Prisma.EnumRoleFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumRoleFilter>;
export const EnumRoleFilterObjectZodSchema = makeSchema();
