import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  some: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  none: z.lazy(() => rentalsWhereInputObjectSchema).optional()
}).strict();
export const RentalsListRelationFilterObjectSchema: z.ZodType<Prisma.RentalsListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RentalsListRelationFilter>;
export const RentalsListRelationFilterObjectZodSchema = makeSchema();
