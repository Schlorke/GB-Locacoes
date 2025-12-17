import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './CartWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CartWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CartWhereInputObjectSchema).optional()
}).strict();
export const CartScalarRelationFilterObjectSchema: z.ZodType<Prisma.CartScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CartScalarRelationFilter>;
export const CartScalarRelationFilterObjectZodSchema = makeSchema();
