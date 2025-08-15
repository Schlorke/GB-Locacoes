import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rental_itemsWhereInputObjectSchema } from './rental_itemsWhereInput.schema'

export const Rental_itemsListRelationFilterObjectSchema: z.ZodType<Prisma.Rental_itemsListRelationFilter, Prisma.Rental_itemsListRelationFilter> = z.object({
  every: z.lazy(() => rental_itemsWhereInputObjectSchema).optional(),
  some: z.lazy(() => rental_itemsWhereInputObjectSchema).optional(),
  none: z.lazy(() => rental_itemsWhereInputObjectSchema).optional()
}).strict();
export const Rental_itemsListRelationFilterObjectZodSchema = z.object({
  every: z.lazy(() => rental_itemsWhereInputObjectSchema).optional(),
  some: z.lazy(() => rental_itemsWhereInputObjectSchema).optional(),
  none: z.lazy(() => rental_itemsWhereInputObjectSchema).optional()
}).strict();
