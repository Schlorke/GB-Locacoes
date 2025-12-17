/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => rentalsWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => rentalsWhereInputObjectSchema).optional().nullable()
}).strict();
export const RentalsNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.RentalsNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RentalsNullableScalarRelationFilter>;
export const RentalsNullableScalarRelationFilterObjectZodSchema = makeSchema();
