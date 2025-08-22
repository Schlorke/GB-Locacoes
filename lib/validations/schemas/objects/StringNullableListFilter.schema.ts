import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const StringNullableListFilterObjectSchema: z.ZodType<Prisma.StringNullableListFilter, Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().nullish(),
  has: z.string().nullish(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();
export const StringNullableListFilterObjectZodSchema = z.object({
  equals: z.string().array().nullish(),
  has: z.string().nullish(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();
