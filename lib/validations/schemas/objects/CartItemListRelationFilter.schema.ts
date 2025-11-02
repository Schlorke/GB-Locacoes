import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereInputObjectSchema as CartItemWhereInputObjectSchema } from './CartItemWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CartItemWhereInputObjectSchema).optional(),
  some: z.lazy(() => CartItemWhereInputObjectSchema).optional(),
  none: z.lazy(() => CartItemWhereInputObjectSchema).optional()
}).strict();
export const CartItemListRelationFilterObjectSchema: z.ZodType<Prisma.CartItemListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CartItemListRelationFilter>;
export const CartItemListRelationFilterObjectZodSchema = makeSchema();
