/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { RoleSchema } from '../enums/Role.schema'
import { QuoteCreateNestedManyWithoutUserInputObjectSchema as QuoteCreateNestedManyWithoutUserInputObjectSchema } from './QuoteCreateNestedManyWithoutUserInput.schema'
import { rentalsCreateNestedManyWithoutUsersInputObjectSchema as rentalsCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsCreateNestedManyWithoutUsersInput.schema'
import { SessionCreateNestedManyWithoutUserInputObjectSchema as SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema'
import { AddressCreateNestedManyWithoutUserInputObjectSchema as AddressCreateNestedManyWithoutUserInputObjectSchema } from './AddressCreateNestedManyWithoutUserInput.schema'
import { CartCreateNestedOneWithoutUserInputObjectSchema as CartCreateNestedOneWithoutUserInputObjectSchema } from './CartCreateNestedOneWithoutUserInput.schema'

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      password: z.string().optional().nullable(),
      phone: z.string().optional().nullable(),
      cpf: z.string().optional().nullable(),
      cnpj: z.string().optional().nullable(),
      role: RoleSchema.optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      quotes: z
        .lazy(() => QuoteCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      rentals: z
        .lazy(() => rentalsCreateNestedManyWithoutUsersInputObjectSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      addresses: z
        .lazy(() => AddressCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      cart: z
        .lazy(() => CartCreateNestedOneWithoutUserInputObjectSchema)
        .optional(),
    })
    .strict()
export const UserCreateWithoutAccountsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutAccountsInput>
export const UserCreateWithoutAccountsInputObjectZodSchema = makeSchema()
