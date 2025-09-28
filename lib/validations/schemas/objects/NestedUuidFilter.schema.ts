/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const nesteduuidfilterSchema = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedUuidFilterObjectSchema)]).optional()
}).strict();
export const NestedUuidFilterObjectSchema: z.ZodType<Prisma.NestedUuidFilter> = nesteduuidfilterSchema as unknown as z.ZodType<Prisma.NestedUuidFilter>;
export const NestedUuidFilterObjectZodSchema = nesteduuidfilterSchema;
