import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateWithoutRental_itemsInput, Prisma.rentalsUncheckedCreateWithoutRental_itemsInput> = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().optional().nullable(),
  userid: z.string(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable()
}).strict();
export const rentalsUncheckedCreateWithoutRental_itemsInputObjectZodSchema = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().optional().nullable(),
  userid: z.string(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable()
}).strict();
