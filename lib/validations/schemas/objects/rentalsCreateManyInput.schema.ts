import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const rentalsCreateManyInputObjectSchema: z.ZodType<Prisma.rentalsCreateManyInput, Prisma.rentalsCreateManyInput> = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().nullish(),
  userid: z.string(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish()
}).strict();
export const rentalsCreateManyInputObjectZodSchema = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().nullish(),
  userid: z.string(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish()
}).strict();
