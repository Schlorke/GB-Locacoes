import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutRentalsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().nullish(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish(),
  rental_items: z.lazy(() => rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema).optional()
}).strict();
export const rentalsUncheckedCreateWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedCreateWithoutUsersInput>;
export const rentalsUncheckedCreateWithoutUsersInputObjectZodSchema = makeSchema();
