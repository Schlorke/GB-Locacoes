import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rental_itemsScalarWhereInputObjectSchema } from './rental_itemsScalarWhereInput.schema'
import { rental_itemsUpdateManyMutationInputObjectSchema } from './rental_itemsUpdateManyMutationInput.schema'
import { rental_itemsUncheckedUpdateManyWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedUpdateManyWithoutRentalsInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      where: z.lazy(() => rental_itemsScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => rental_itemsUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => rental_itemsUncheckedUpdateManyWithoutRentalsInputObjectSchema
        ),
      ]),
    })
    .strict()
export const rental_itemsUpdateManyWithWhereWithoutRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsUpdateManyWithWhereWithoutRentalsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUpdateManyWithWhereWithoutRentalsInput>
export const rental_itemsUpdateManyWithWhereWithoutRentalsInputObjectZodSchema =
  makeSchema()
