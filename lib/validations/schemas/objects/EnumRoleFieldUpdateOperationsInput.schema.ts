import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { RoleSchema } from '../enums/Role.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      set: RoleSchema.optional(),
    })
    .strict()
export const EnumRoleFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput>
export const EnumRoleFieldUpdateOperationsInputObjectZodSchema = makeSchema()
