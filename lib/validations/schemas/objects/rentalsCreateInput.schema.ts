/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema as rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutRentalsInput.schema';
import { UserCreateNestedOneWithoutRentalsInputObjectSchema as UserCreateNestedOneWithoutRentalsInputObjectSchema } from './UserCreateNestedOneWithoutRentalsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string(),
  startdate: z.coerce.date(),
  enddate: z.coerce.date(),
  total: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
}),
  status: z.string().optional().nullable(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable(),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema),
  users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema)
}).strict();
export const rentalsCreateInputObjectSchema: z.ZodType<Prisma.rentalsCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateInput>;
export const rentalsCreateInputObjectZodSchema = makeSchema();
