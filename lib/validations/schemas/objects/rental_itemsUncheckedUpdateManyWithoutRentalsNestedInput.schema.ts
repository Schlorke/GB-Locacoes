/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { rental_itemsCreateWithoutRentalsInputObjectSchema as rental_itemsCreateWithoutRentalsInputObjectSchema } from './rental_itemsCreateWithoutRentalsInput.schema'
import { rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema as rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateWithoutRentalsInput.schema'
import { rental_itemsCreateOrConnectWithoutRentalsInputObjectSchema as rental_itemsCreateOrConnectWithoutRentalsInputObjectSchema } from './rental_itemsCreateOrConnectWithoutRentalsInput.schema'
import { rental_itemsUpsertWithWhereUniqueWithoutRentalsInputObjectSchema as rental_itemsUpsertWithWhereUniqueWithoutRentalsInputObjectSchema } from './rental_itemsUpsertWithWhereUniqueWithoutRentalsInput.schema'
import { rental_itemsCreateManyRentalsInputEnvelopeObjectSchema as rental_itemsCreateManyRentalsInputEnvelopeObjectSchema } from './rental_itemsCreateManyRentalsInputEnvelope.schema'
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema'
import { rental_itemsUpdateWithWhereUniqueWithoutRentalsInputObjectSchema as rental_itemsUpdateWithWhereUniqueWithoutRentalsInputObjectSchema } from './rental_itemsUpdateWithWhereUniqueWithoutRentalsInput.schema'
import { rental_itemsUpdateManyWithWhereWithoutRentalsInputObjectSchema as rental_itemsUpdateManyWithWhereWithoutRentalsInputObjectSchema } from './rental_itemsUpdateManyWithWhereWithoutRentalsInput.schema'
import { rental_itemsScalarWhereInputObjectSchema as rental_itemsScalarWhereInputObjectSchema } from './rental_itemsScalarWhereInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => rental_itemsCreateWithoutRentalsInputObjectSchema),
          z
            .lazy(() => rental_itemsCreateWithoutRentalsInputObjectSchema)
            .array(),
          z.lazy(
            () => rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema
          ),
          z
            .lazy(
              () => rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => rental_itemsCreateOrConnectWithoutRentalsInputObjectSchema
          ),
          z
            .lazy(
              () => rental_itemsCreateOrConnectWithoutRentalsInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              rental_itemsUpsertWithWhereUniqueWithoutRentalsInputObjectSchema
          ),
          z
            .lazy(
              () =>
                rental_itemsUpsertWithWhereUniqueWithoutRentalsInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => rental_itemsCreateManyRentalsInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
          z.lazy(() => rental_itemsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
          z.lazy(() => rental_itemsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
          z.lazy(() => rental_itemsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
          z.lazy(() => rental_itemsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              rental_itemsUpdateWithWhereUniqueWithoutRentalsInputObjectSchema
          ),
          z
            .lazy(
              () =>
                rental_itemsUpdateWithWhereUniqueWithoutRentalsInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => rental_itemsUpdateManyWithWhereWithoutRentalsInputObjectSchema
          ),
          z
            .lazy(
              () =>
                rental_itemsUpdateManyWithWhereWithoutRentalsInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => rental_itemsScalarWhereInputObjectSchema),
          z.lazy(() => rental_itemsScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()
export const rental_itemsUncheckedUpdateManyWithoutRentalsNestedInputObjectSchema: z.ZodType<Prisma.rental_itemsUncheckedUpdateManyWithoutRentalsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUncheckedUpdateManyWithoutRentalsNestedInput>
export const rental_itemsUncheckedUpdateManyWithoutRentalsNestedInputObjectZodSchema =
  makeSchema()
