import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { RoleSchema } from '../enums/Role.schema'

const makeSchema = () =>
  z
    .object({
      set: RoleSchema.optional(),
    })
    .strict()
export const EnumRoleFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput>
export const EnumRoleFieldUpdateOperationsInputObjectZodSchema = makeSchema()
