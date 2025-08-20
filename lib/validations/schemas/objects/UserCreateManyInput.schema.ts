import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { RoleSchema } from '../enums/Role.schema'

export const UserCreateManyInputObjectSchema: z.ZodType<
  Prisma.UserCreateManyInput,
  Prisma.UserCreateManyInput
> = z
  .object({
    id: z.string().optional(),
    name: z.string().optional().nullable(),
    email: z.string(),
    password: z.string().optional().nullable(),
    role: RoleSchema.optional(),
    emailVerified: z.date().optional().nullable(),
    image: z.string().optional().nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()
export const UserCreateManyInputObjectZodSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional().nullable(),
    email: z.string(),
    password: z.string().optional().nullable(),
    role: RoleSchema.optional(),
    emailVerified: z.date().optional().nullable(),
    image: z.string().optional().nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()
