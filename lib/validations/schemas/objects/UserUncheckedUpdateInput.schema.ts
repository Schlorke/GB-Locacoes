import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { RoleSchema } from '../enums/Role.schema'
import { EnumRoleFieldUpdateOperationsInputObjectSchema } from './EnumRoleFieldUpdateOperationsInput.schema'
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AccountUncheckedUpdateManyWithoutUserNestedInput.schema'
import { QuoteUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './QuoteUncheckedUpdateManyWithoutUserNestedInput.schema'
import { rentalsUncheckedUpdateManyWithoutUsersNestedInputObjectSchema } from './rentalsUncheckedUpdateManyWithoutUsersNestedInput.schema'
import { SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './SessionUncheckedUpdateManyWithoutUserNestedInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .nullish(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .nullish(),
      role: z
        .union([
          RoleSchema,
          z.lazy(() => EnumRoleFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .nullish(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .nullish(),
      createdAt: z
        .union([
          z.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      accounts: z
        .lazy(
          () => AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema
        )
        .optional(),
      quotes: z
        .lazy(() => QuoteUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      rentals: z
        .lazy(
          () => rentalsUncheckedUpdateManyWithoutUsersNestedInputObjectSchema
        )
        .optional(),
      sessions: z
        .lazy(
          () => SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema
        )
        .optional(),
    })
    .strict()
export const UserUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateInput>
export const UserUncheckedUpdateInputObjectZodSchema = makeSchema()
