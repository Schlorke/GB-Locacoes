import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserCreateNestedOneWithoutRentalsInputObjectSchema } from './UserCreateNestedOneWithoutRentalsInput.schema'

export const rentalsCreateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsCreateWithoutRental_itemsInput, Prisma.rentalsCreateWithoutRental_itemsInput> = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().optional().nullable(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable(),
  users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema)
}).strict();
export const rentalsCreateWithoutRental_itemsInputObjectZodSchema = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().optional().nullable(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable(),
  users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema)
}).strict();
