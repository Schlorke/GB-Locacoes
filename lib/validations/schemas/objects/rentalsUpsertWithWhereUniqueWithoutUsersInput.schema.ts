import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'
import { rentalsUpdateWithoutUsersInputObjectSchema } from './rentalsUpdateWithoutUsersInput.schema'
import { rentalsUncheckedUpdateWithoutUsersInputObjectSchema } from './rentalsUncheckedUpdateWithoutUsersInput.schema'
import { rentalsCreateWithoutUsersInputObjectSchema } from './rentalsCreateWithoutUsersInput.schema'
import { rentalsUncheckedCreateWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateWithoutUsersInput.schema'

export const rentalsUpsertWithWhereUniqueWithoutUsersInputObjectSchema: z.ZodType<
  Prisma.rentalsUpsertWithWhereUniqueWithoutUsersInput,
  Prisma.rentalsUpsertWithWhereUniqueWithoutUsersInput
> = z
  .object({
    where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => rentalsUpdateWithoutUsersInputObjectSchema),
      z.lazy(() => rentalsUncheckedUpdateWithoutUsersInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema),
      z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema),
    ]),
  })
  .strict()
export const rentalsUpsertWithWhereUniqueWithoutUsersInputObjectZodSchema = z
  .object({
    where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => rentalsUpdateWithoutUsersInputObjectSchema),
      z.lazy(() => rentalsUncheckedUpdateWithoutUsersInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema),
      z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema),
    ]),
  })
  .strict()
