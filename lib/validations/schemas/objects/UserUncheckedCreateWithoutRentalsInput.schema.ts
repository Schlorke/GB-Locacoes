import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { RoleSchema } from '../enums/Role.schema'
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema'
import { QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './QuoteUncheckedCreateNestedManyWithoutUserInput.schema'
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema'

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
      accounts: z
        .lazy(
          () => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema
        )
        .optional(),
      quotes: z
        .lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      sessions: z
        .lazy(
          () => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema
        )
        .optional(),
    })
    .strict()
export const UserUncheckedCreateWithoutRentalsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRentalsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutRentalsInput>
export const UserUncheckedCreateWithoutRentalsInputObjectZodSchema =
  makeSchema()
