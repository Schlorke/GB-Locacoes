import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const rentalsCreateManyUsersInputObjectSchema: z.ZodType<Prisma.rentalsCreateManyUsersInput, Prisma.rentalsCreateManyUsersInput> = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().nullish(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish()
}).strict();
export const rentalsCreateManyUsersInputObjectZodSchema = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().nullish(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish()
}).strict();
