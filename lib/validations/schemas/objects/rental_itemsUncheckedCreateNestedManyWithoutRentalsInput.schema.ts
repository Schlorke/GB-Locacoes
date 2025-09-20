import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { rental_itemsCreateWithoutRentalsInputObjectSchema } from './rental_itemsCreateWithoutRentalsInput.schema'
import { rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateWithoutRentalsInput.schema'
import { rental_itemsCreateOrConnectWithoutRentalsInputObjectSchema } from './rental_itemsCreateOrConnectWithoutRentalsInput.schema'
import { rental_itemsCreateManyRentalsInputEnvelopeObjectSchema } from './rental_itemsCreateManyRentalsInputEnvelope.schema'
import { rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema'

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
      createMany: z
        .lazy(() => rental_itemsCreateManyRentalsInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
          z.lazy(() => rental_itemsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()
export const rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsUncheckedCreateNestedManyWithoutRentalsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUncheckedCreateNestedManyWithoutRentalsInput>
export const rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectZodSchema =
  makeSchema()
