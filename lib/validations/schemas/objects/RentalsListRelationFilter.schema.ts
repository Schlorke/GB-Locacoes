/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  some: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  none: z.lazy(() => rentalsWhereInputObjectSchema).optional()
}).strict();
export const RentalsListRelationFilterObjectSchema: z.ZodType<Prisma.RentalsListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RentalsListRelationFilter>;
export const RentalsListRelationFilterObjectZodSchema = makeSchema();
