import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CartItemListRelationFilterObjectSchema as CartItemListRelationFilterObjectSchema } from './CartItemListRelationFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const cartwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CartWhereInputObjectSchema), z.lazy(() => CartWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CartWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CartWhereInputObjectSchema), z.lazy(() => CartWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  items: z.lazy(() => CartItemListRelationFilterObjectSchema).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const CartWhereInputObjectSchema: z.ZodType<Prisma.CartWhereInput> = cartwhereinputSchema as unknown as z.ZodType<Prisma.CartWhereInput>;
export const CartWhereInputObjectZodSchema = cartwhereinputSchema;
