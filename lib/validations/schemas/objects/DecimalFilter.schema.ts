import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedDecimalFilterObjectSchema } from './NestedDecimalFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalFilterObjectSchema)]).optional()
}).strict();
export const DecimalFilterObjectSchema: z.ZodType<Prisma.DecimalFilter> = makeSchema() as unknown as z.ZodType<Prisma.DecimalFilter>;
export const DecimalFilterObjectZodSchema = makeSchema();
