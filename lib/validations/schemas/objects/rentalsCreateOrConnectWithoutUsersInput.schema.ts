import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'
import { rentalsCreateWithoutUsersInputObjectSchema } from './rentalsCreateWithoutUsersInput.schema'
import { rentalsUncheckedCreateWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateWithoutUsersInput.schema'

export const rentalsCreateOrConnectWithoutUsersInputObjectSchema: z.ZodType<
  Prisma.rentalsCreateOrConnectWithoutUsersInput,
  Prisma.rentalsCreateOrConnectWithoutUsersInput
> = z
  .object({
    where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema),
      z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema),
    ]),
  })
  .strict()
export const rentalsCreateOrConnectWithoutUsersInputObjectZodSchema = z
  .object({
    where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema),
      z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema),
    ]),
  })
  .strict()
