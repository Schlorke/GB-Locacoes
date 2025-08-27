import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { RoleSchema } from '../enums/Role.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      equals: RoleSchema.optional(),
      in: RoleSchema.array().optional(),
      notIn: RoleSchema.array().optional(),
      not: z.union([RoleSchema, z.lazy(makeSchema)]).optional(),
    })
    .strict()
export const NestedEnumRoleFilterObjectSchema: z.ZodType<Prisma.NestedEnumRoleFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.NestedEnumRoleFilter>
export const NestedEnumRoleFilterObjectZodSchema = makeSchema()
