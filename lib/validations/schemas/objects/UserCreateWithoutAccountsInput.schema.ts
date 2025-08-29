import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { RoleSchema } from '../enums/Role.schema'
import { QuoteCreateNestedManyWithoutUserInputObjectSchema } from './QuoteCreateNestedManyWithoutUserInput.schema'
import { rentalsCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsCreateNestedManyWithoutUsersInput.schema'
import { SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema'

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
      quotes: z
        .lazy(() => QuoteCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      rentals: z
        .lazy(() => rentalsCreateNestedManyWithoutUsersInputObjectSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
    })
    .strict()
export const UserCreateWithoutAccountsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutAccountsInput>
export const UserCreateWithoutAccountsInputObjectZodSchema = makeSchema()
