import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutRentalsInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  startdate: z.coerce.date(),
  enddate: z.coerce.date(),
  total: z.number(),
  status: z.string().optional().nullable(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable(),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema).optional()
}).strict();
export const rentalsCreateWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsCreateWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateWithoutUsersInput>;
export const rentalsCreateWithoutUsersInputObjectZodSchema = makeSchema();
