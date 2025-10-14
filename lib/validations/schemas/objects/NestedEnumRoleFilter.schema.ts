/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { RoleSchema } from '../enums/Role.schema'

const nestedenumrolefilterSchema = z
  .object({
    equals: RoleSchema.optional(),
    in: RoleSchema.array().optional(),
    notIn: RoleSchema.array().optional(),
    not: z
      .union([RoleSchema, z.lazy(() => NestedEnumRoleFilterObjectSchema)])
      .optional(),
  })
  .strict()
export const NestedEnumRoleFilterObjectSchema: z.ZodType<Prisma.NestedEnumRoleFilter> =
  nestedenumrolefilterSchema as unknown as z.ZodType<Prisma.NestedEnumRoleFilter>
export const NestedEnumRoleFilterObjectZodSchema = nestedenumrolefilterSchema
