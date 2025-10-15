/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const nesteddecimalfilterSchema = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalFilterObjectSchema)]).optional()
}).strict();
export const NestedDecimalFilterObjectSchema: z.ZodType<Prisma.NestedDecimalFilter> = nesteddecimalfilterSchema as unknown as z.ZodType<Prisma.NestedDecimalFilter>;
export const NestedDecimalFilterObjectZodSchema = nesteddecimalfilterSchema;
