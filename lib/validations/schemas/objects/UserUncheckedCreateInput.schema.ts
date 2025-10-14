/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { RoleSchema } from '../enums/Role.schema'
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema as AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema'
import { QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema as QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './QuoteUncheckedCreateNestedManyWithoutUserInput.schema'
import { rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema as rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateNestedManyWithoutUsersInput.schema'
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema'
import { AddressUncheckedCreateNestedManyWithoutUserInputObjectSchema as AddressUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AddressUncheckedCreateNestedManyWithoutUserInput.schema'
import { CartUncheckedCreateNestedOneWithoutUserInputObjectSchema as CartUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './CartUncheckedCreateNestedOneWithoutUserInput.schema'

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
      addresses: z.lazy(
        () => AddressUncheckedCreateNestedManyWithoutUserInputObjectSchema
      ),
      cart: z
        .lazy(() => CartUncheckedCreateNestedOneWithoutUserInputObjectSchema)
        .optional(),
    })
    .strict()
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>
export const UserUncheckedCreateInputObjectZodSchema = makeSchema()
