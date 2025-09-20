import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { RoleSchema } from '../enums/Role.schema'
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema'
import { QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './QuoteUncheckedCreateNestedManyWithoutUserInput.schema'
import { rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateNestedManyWithoutUsersInput.schema'
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      password: z.string().optional().nullable(),
      role: RoleSchema.optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      accounts: z.lazy(
        () => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema
      ),
      quotes: z.lazy(
        () => QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema
      ),
      rentals: z.lazy(
        () => rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema
      ),
      sessions: z.lazy(
        () => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema
      ),
    })
    .strict()
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>
export const UserUncheckedCreateInputObjectZodSchema = makeSchema()
