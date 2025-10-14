/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { AddressCreateWithoutUserInputObjectSchema as AddressCreateWithoutUserInputObjectSchema } from './AddressCreateWithoutUserInput.schema'
import { AddressUncheckedCreateWithoutUserInputObjectSchema as AddressUncheckedCreateWithoutUserInputObjectSchema } from './AddressUncheckedCreateWithoutUserInput.schema'
import { AddressCreateOrConnectWithoutUserInputObjectSchema as AddressCreateOrConnectWithoutUserInputObjectSchema } from './AddressCreateOrConnectWithoutUserInput.schema'
import { AddressUpsertWithWhereUniqueWithoutUserInputObjectSchema as AddressUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AddressUpsertWithWhereUniqueWithoutUserInput.schema'
import { AddressCreateManyUserInputEnvelopeObjectSchema as AddressCreateManyUserInputEnvelopeObjectSchema } from './AddressCreateManyUserInputEnvelope.schema'
import { AddressWhereUniqueInputObjectSchema as AddressWhereUniqueInputObjectSchema } from './AddressWhereUniqueInput.schema'
import { AddressUpdateWithWhereUniqueWithoutUserInputObjectSchema as AddressUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AddressUpdateWithWhereUniqueWithoutUserInput.schema'
import { AddressUpdateManyWithWhereWithoutUserInputObjectSchema as AddressUpdateManyWithWhereWithoutUserInputObjectSchema } from './AddressUpdateManyWithWhereWithoutUserInput.schema'
import { AddressScalarWhereInputObjectSchema as AddressScalarWhereInputObjectSchema } from './AddressScalarWhereInput.schema'

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
      upsert: z
        .union([
          z.lazy(
            () => AddressUpsertWithWhereUniqueWithoutUserInputObjectSchema
          ),
          z
            .lazy(
              () => AddressUpsertWithWhereUniqueWithoutUserInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AddressCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AddressWhereUniqueInputObjectSchema),
          z.lazy(() => AddressWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AddressWhereUniqueInputObjectSchema),
          z.lazy(() => AddressWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AddressWhereUniqueInputObjectSchema),
          z.lazy(() => AddressWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AddressWhereUniqueInputObjectSchema),
          z.lazy(() => AddressWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => AddressUpdateWithWhereUniqueWithoutUserInputObjectSchema
          ),
          z
            .lazy(
              () => AddressUpdateWithWhereUniqueWithoutUserInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AddressUpdateManyWithWhereWithoutUserInputObjectSchema),
          z
            .lazy(() => AddressUpdateManyWithWhereWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AddressScalarWhereInputObjectSchema),
          z.lazy(() => AddressScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()
export const AddressUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AddressUpdateManyWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.AddressUpdateManyWithoutUserNestedInput>
export const AddressUpdateManyWithoutUserNestedInputObjectZodSchema =
  makeSchema()
