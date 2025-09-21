import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutRentalsInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  startdate: z.coerce.date(),
  enddate: z.coerce.date(),
  total: z.number(),
  status: z.string().optional().nullable(),
  userid: z.string(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable(),
  rental_items: z.lazy(() => rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema)
}).strict();
export const rentalsUncheckedCreateInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedCreateInput>;
export const rentalsUncheckedCreateInputObjectZodSchema = makeSchema();
