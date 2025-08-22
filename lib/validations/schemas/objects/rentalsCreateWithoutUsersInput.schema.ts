import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutRentalsInput.schema'

export const rentalsCreateWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsCreateWithoutUsersInput, Prisma.rentalsCreateWithoutUsersInput> = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().nullish(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish(),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema).optional()
}).strict();
export const rentalsCreateWithoutUsersInputObjectZodSchema = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().nullish(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish(),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema).optional()
}).strict();
