/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema as rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutRentalsInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  startdate: z.coerce.date(),
  enddate: z.coerce.date(),
  total: z.number(),
  status: z.string().optional().nullable(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable(),
  rental_items: z.lazy(() => rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema).optional()
}).strict();
export const rentalsUncheckedCreateWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedCreateWithoutUsersInput>;
export const rentalsUncheckedCreateWithoutUsersInputObjectZodSchema = makeSchema();
