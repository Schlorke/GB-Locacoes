import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema';
import { rental_itemsCreateWithoutRentalsInputObjectSchema } from './rental_itemsCreateWithoutRentalsInput.schema';
import { rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateWithoutRentalsInput.schema'

export const rental_itemsCreateOrConnectWithoutRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateOrConnectWithoutRentalsInput, Prisma.rental_itemsCreateOrConnectWithoutRentalsInput> = z.object({
  where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rental_itemsCreateWithoutRentalsInputObjectSchema), z.lazy(() => rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema)])
}).strict();
export const rental_itemsCreateOrConnectWithoutRentalsInputObjectZodSchema = z.object({
  where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rental_itemsCreateWithoutRentalsInputObjectSchema), z.lazy(() => rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema)])
}).strict();
