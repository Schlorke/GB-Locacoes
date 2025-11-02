import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './CartWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CartWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => CartWhereInputObjectSchema).optional().nullable()
}).strict();
export const CartNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.CartNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CartNullableScalarRelationFilter>;
export const CartNullableScalarRelationFilterObjectZodSchema = makeSchema();
