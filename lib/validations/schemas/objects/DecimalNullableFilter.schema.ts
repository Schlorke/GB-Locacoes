/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedDecimalNullableFilterObjectSchema as NestedDecimalNullableFilterObjectSchema } from './NestedDecimalNullableFilter.schema'

const makeSchema = () => z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const DecimalNullableFilterObjectSchema: z.ZodType<Prisma.DecimalNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.DecimalNullableFilter>;
export const DecimalNullableFilterObjectZodSchema = makeSchema();
