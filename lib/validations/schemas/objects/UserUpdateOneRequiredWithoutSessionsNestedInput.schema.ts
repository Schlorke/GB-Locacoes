import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserCreateWithoutSessionsInputObjectSchema } from './UserCreateWithoutSessionsInput.schema'
import { UserUncheckedCreateWithoutSessionsInputObjectSchema } from './UserUncheckedCreateWithoutSessionsInput.schema'
import { UserCreateOrConnectWithoutSessionsInputObjectSchema } from './UserCreateOrConnectWithoutSessionsInput.schema'
import { UserUpsertWithoutSessionsInputObjectSchema } from './UserUpsertWithoutSessionsInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateToOneWithWhereWithoutSessionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutSessionsInput.schema'
import { UserUpdateWithoutSessionsInputObjectSchema } from './UserUpdateWithoutSessionsInput.schema'
import { UserUncheckedUpdateWithoutSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutSessionsInput.schema'

export const UserUpdateOneRequiredWithoutSessionsNestedInputObjectSchema: z.ZodType<
  Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput,
  Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput
> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutSessionsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutSessionsInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutSessionsInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputObjectSchema),
        z.lazy(() => UserUpdateWithoutSessionsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputObjectSchema),
      ])
      .optional(),
  })
  .strict()
export const UserUpdateOneRequiredWithoutSessionsNestedInputObjectZodSchema = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutSessionsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutSessionsInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutSessionsInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputObjectSchema),
        z.lazy(() => UserUpdateWithoutSessionsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputObjectSchema),
      ])
      .optional(),
  })
  .strict()
