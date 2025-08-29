import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(makeSchema)]).optional()
}).strict();
export const NestedBoolFilterObjectSchema: z.ZodType<Prisma.NestedBoolFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedBoolFilter>;
export const NestedBoolFilterObjectZodSchema = makeSchema();
