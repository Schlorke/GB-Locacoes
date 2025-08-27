import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rentalsCreateWithoutUsersInputObjectSchema } from './rentalsCreateWithoutUsersInput.schema'
import { rentalsUncheckedCreateWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateWithoutUsersInput.schema'
import { rentalsCreateOrConnectWithoutUsersInputObjectSchema } from './rentalsCreateOrConnectWithoutUsersInput.schema'
import { rentalsCreateManyUsersInputEnvelopeObjectSchema } from './rentalsCreateManyUsersInputEnvelope.schema'
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema),
          z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema).array(),
          z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema),
          z
            .lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema),
          z
            .lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => rentalsCreateManyUsersInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => rentalsWhereUniqueInputObjectSchema),
          z.lazy(() => rentalsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()
export const rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateNestedManyWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedCreateNestedManyWithoutUsersInput>
export const rentalsUncheckedCreateNestedManyWithoutUsersInputObjectZodSchema =
  makeSchema()
