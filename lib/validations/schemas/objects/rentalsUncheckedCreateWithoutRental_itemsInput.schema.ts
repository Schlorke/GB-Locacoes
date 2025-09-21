import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  startdate: z.coerce.date(),
  enddate: z.coerce.date(),
  total: z.number(),
  status: z.string().optional().nullable(),
  userid: z.string(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable()
}).strict();
export const rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateWithoutRental_itemsInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedCreateWithoutRental_itemsInput>;
export const rentalsUncheckedCreateWithoutRental_itemsInputObjectZodSchema = makeSchema();
