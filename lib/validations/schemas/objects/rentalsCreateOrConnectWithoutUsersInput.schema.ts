import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'
import { rentalsCreateWithoutUsersInputObjectSchema } from './rentalsCreateWithoutUsersInput.schema'
import { rentalsUncheckedCreateWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateWithoutUsersInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema),
        z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema),
      ]),
    })
    .strict()
export const rentalsCreateOrConnectWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsCreateOrConnectWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateOrConnectWithoutUsersInput>
export const rentalsCreateOrConnectWithoutUsersInputObjectZodSchema =
  makeSchema()
