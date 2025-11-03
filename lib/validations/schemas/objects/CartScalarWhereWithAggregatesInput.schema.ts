/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const cartscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CartScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CartScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CartScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CartScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CartScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CartScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CartScalarWhereWithAggregatesInput> = cartscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CartScalarWhereWithAggregatesInput>;
export const CartScalarWhereWithAggregatesInputObjectZodSchema = cartscalarwherewithaggregatesinputSchema;
