/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EquipmentScalarRelationFilterObjectSchema as EquipmentScalarRelationFilterObjectSchema } from './EquipmentScalarRelationFilter.schema';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema';
import { RentalsScalarRelationFilterObjectSchema as RentalsScalarRelationFilterObjectSchema } from './RentalsScalarRelationFilter.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const rental_itemswhereinputSchema = z.object({
  AND: z.union([z.lazy(() => rental_itemsWhereInputObjectSchema), z.lazy(() => rental_itemsWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => rental_itemsWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => rental_itemsWhereInputObjectSchema), z.lazy(() => rental_itemsWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  rentalid: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  equipmentid: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  priceperday: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'priceperday' must be a Decimal',
})]).optional(),
  totaldays: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  totalprice: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'totalprice' must be a Decimal',
})]).optional(),
  createdat: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedat: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  equipments: z.union([z.lazy(() => EquipmentScalarRelationFilterObjectSchema), z.lazy(() => EquipmentWhereInputObjectSchema)]).optional(),
  rentals: z.union([z.lazy(() => RentalsScalarRelationFilterObjectSchema), z.lazy(() => rentalsWhereInputObjectSchema)]).optional()
}).strict();
export const rental_itemsWhereInputObjectSchema: z.ZodType<Prisma.rental_itemsWhereInput> = rental_itemswhereinputSchema as unknown as z.ZodType<Prisma.rental_itemsWhereInput>;
export const rental_itemsWhereInputObjectZodSchema = rental_itemswhereinputSchema;
