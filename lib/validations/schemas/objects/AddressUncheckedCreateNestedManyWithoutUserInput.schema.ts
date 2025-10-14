/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { AddressCreateWithoutUserInputObjectSchema as AddressCreateWithoutUserInputObjectSchema } from './AddressCreateWithoutUserInput.schema'
import { AddressUncheckedCreateWithoutUserInputObjectSchema as AddressUncheckedCreateWithoutUserInputObjectSchema } from './AddressUncheckedCreateWithoutUserInput.schema'
import { AddressCreateOrConnectWithoutUserInputObjectSchema as AddressCreateOrConnectWithoutUserInputObjectSchema } from './AddressCreateOrConnectWithoutUserInput.schema'
import { AddressCreateManyUserInputEnvelopeObjectSchema as AddressCreateManyUserInputEnvelopeObjectSchema } from './AddressCreateManyUserInputEnvelope.schema'
import { AddressWhereUniqueInputObjectSchema as AddressWhereUniqueInputObjectSchema } from './AddressWhereUniqueInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => AddressCreateWithoutUserInputObjectSchema),
          z.lazy(() => AddressCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => AddressUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => AddressUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AddressCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => AddressCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AddressCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AddressWhereUniqueInputObjectSchema),
          z.lazy(() => AddressWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()
export const AddressUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AddressUncheckedCreateNestedManyWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.AddressUncheckedCreateNestedManyWithoutUserInput>
export const AddressUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
  makeSchema()
