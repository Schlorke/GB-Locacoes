import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
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
  users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema)
}).strict();
export const rentalsCreateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsCreateWithoutRental_itemsInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateWithoutRental_itemsInput>;
export const rentalsCreateWithoutRental_itemsInputObjectZodSchema = makeSchema();
