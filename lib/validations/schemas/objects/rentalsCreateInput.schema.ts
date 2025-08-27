import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutRentalsInput.schema';
import { UserCreateNestedOneWithoutRentalsInputObjectSchema } from './UserCreateNestedOneWithoutRentalsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().nullish(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish(),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema).optional(),
  users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema)
}).strict();
export const rentalsCreateInputObjectSchema: z.ZodType<Prisma.rentalsCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateInput>;
export const rentalsCreateInputObjectZodSchema = makeSchema();
