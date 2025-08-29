import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().array().nullish(),
  has: z.string().nullish(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();
export const StringNullableListFilterObjectSchema: z.ZodType<Prisma.StringNullableListFilter> = makeSchema() as unknown as z.ZodType<Prisma.StringNullableListFilter>;
export const StringNullableListFilterObjectZodSchema = makeSchema();
