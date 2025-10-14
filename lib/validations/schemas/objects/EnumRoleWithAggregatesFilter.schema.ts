/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { RoleSchema } from '../enums/Role.schema'
import { NestedEnumRoleWithAggregatesFilterObjectSchema as NestedEnumRoleWithAggregatesFilterObjectSchema } from './NestedEnumRoleWithAggregatesFilter.schema'
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema'
import { NestedEnumRoleFilterObjectSchema as NestedEnumRoleFilterObjectSchema } from './NestedEnumRoleFilter.schema'

const makeSchema = () =>
  z
    .object({
      equals: RoleSchema.optional(),
      in: RoleSchema.array().optional(),
      notIn: RoleSchema.array().optional(),
      not: z
        .union([
          RoleSchema,
          z.lazy(() => NestedEnumRoleWithAggregatesFilterObjectSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedEnumRoleFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedEnumRoleFilterObjectSchema).optional(),
    })
    .strict()
export const EnumRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumRoleWithAggregatesFilter>
export const EnumRoleWithAggregatesFilterObjectZodSchema = makeSchema()
