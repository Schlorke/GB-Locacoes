import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { RoleSchema } from '../enums/Role.schema'

export const EnumRoleFieldUpdateOperationsInputObjectSchema: z.ZodType<
  Prisma.EnumRoleFieldUpdateOperationsInput,
  Prisma.EnumRoleFieldUpdateOperationsInput
> = z
  .object({
    set: RoleSchema.optional(),
  })
  .strict()
export const EnumRoleFieldUpdateOperationsInputObjectZodSchema = z
  .object({
    set: RoleSchema.optional(),
  })
  .strict()
