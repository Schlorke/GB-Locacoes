import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => rentalsWhereInputObjectSchema).optional()
}).strict();
export const RentalsScalarRelationFilterObjectSchema: z.ZodType<Prisma.RentalsScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RentalsScalarRelationFilter>;
export const RentalsScalarRelationFilterObjectZodSchema = makeSchema();
