import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutRentalsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().nullish(),
  userid: z.string(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish(),
  rental_items: z.lazy(() => rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema).optional()
}).strict();
export const rentalsUncheckedCreateInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedCreateInput>;
export const rentalsUncheckedCreateInputObjectZodSchema = makeSchema();
