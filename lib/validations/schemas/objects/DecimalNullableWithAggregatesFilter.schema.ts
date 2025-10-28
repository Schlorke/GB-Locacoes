/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { NestedDecimalNullableWithAggregatesFilterObjectSchema as NestedDecimalNullableWithAggregatesFilterObjectSchema } from './NestedDecimalNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedDecimalNullableFilterObjectSchema as NestedDecimalNullableFilterObjectSchema } from './NestedDecimalNullableFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  equals: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'equals' must be a Decimal',
}).optional().nullable(),
  in: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'in' must be a Decimal',
}).array().optional().nullable(),
  notIn: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'notIn' must be a Decimal',
}).array().optional().nullable(),
  lt: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'lt' must be a Decimal',
}).optional(),
  lte: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'lte' must be a Decimal',
}).optional(),
  gt: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'gt' must be a Decimal',
}).optional(),
  gte: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'gte' must be a Decimal',
}).optional(),
  not: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'not' must be a Decimal',
}), z.lazy(() => NestedDecimalNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional()
}).strict();
export const DecimalNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.DecimalNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.DecimalNullableWithAggregatesFilter>;
export const DecimalNullableWithAggregatesFilterObjectZodSchema = makeSchema();
