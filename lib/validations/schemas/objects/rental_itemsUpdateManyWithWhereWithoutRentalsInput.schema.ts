/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsScalarWhereInputObjectSchema as rental_itemsScalarWhereInputObjectSchema } from './rental_itemsScalarWhereInput.schema';
import { rental_itemsUpdateManyMutationInputObjectSchema as rental_itemsUpdateManyMutationInputObjectSchema } from './rental_itemsUpdateManyMutationInput.schema';
import { rental_itemsUncheckedUpdateManyWithoutRentalsInputObjectSchema as rental_itemsUncheckedUpdateManyWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedUpdateManyWithoutRentalsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rental_itemsScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => rental_itemsUpdateManyMutationInputObjectSchema), z.lazy(() => rental_itemsUncheckedUpdateManyWithoutRentalsInputObjectSchema)])
}).strict();
export const rental_itemsUpdateManyWithWhereWithoutRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsUpdateManyWithWhereWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUpdateManyWithWhereWithoutRentalsInput>;
export const rental_itemsUpdateManyWithWhereWithoutRentalsInputObjectZodSchema = makeSchema();
