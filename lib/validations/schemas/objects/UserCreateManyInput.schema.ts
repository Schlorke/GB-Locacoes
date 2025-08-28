import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { RoleSchema } from '../enums/Role.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string().optional(),
      name: z.string().nullish(),
      email: z.string(),
      password: z.string().nullish(),
      role: RoleSchema.optional(),
      emailVerified: z.date().nullish(),
      image: z.string().nullish(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    })
    .strict()
export const UserCreateManyInputObjectSchema: z.ZodType<Prisma.UserCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateManyInput>
export const UserCreateManyInputObjectZodSchema = makeSchema()
