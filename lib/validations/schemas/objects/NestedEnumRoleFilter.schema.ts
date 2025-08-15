import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { RoleSchema } from '../enums/Role.schema'

export const NestedEnumRoleFilterObjectSchema: z.ZodType<
  Prisma.NestedEnumRoleFilter,
  Prisma.NestedEnumRoleFilter
> = z
  .object({
    equals: RoleSchema.optional(),
    in: RoleSchema.array().optional(),
    notIn: RoleSchema.array().optional(),
    not: z
      .union([RoleSchema, z.lazy(() => NestedEnumRoleFilterObjectSchema)])
      .optional(),
  })
  .strict()
export const NestedEnumRoleFilterObjectZodSchema = z
  .object({
    equals: RoleSchema.optional(),
    in: RoleSchema.array().optional(),
    notIn: RoleSchema.array().optional(),
    not: z
      .union([RoleSchema, z.lazy(() => NestedEnumRoleFilterObjectSchema)])
      .optional(),
  })
  .strict()
