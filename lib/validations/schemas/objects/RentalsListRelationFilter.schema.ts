import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

export const RentalsListRelationFilterObjectSchema: z.ZodType<Prisma.RentalsListRelationFilter, Prisma.RentalsListRelationFilter> = z.object({
  every: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  some: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  none: z.lazy(() => rentalsWhereInputObjectSchema).optional()
}).strict();
export const RentalsListRelationFilterObjectZodSchema = z.object({
  every: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  some: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  none: z.lazy(() => rentalsWhereInputObjectSchema).optional()
}).strict();
