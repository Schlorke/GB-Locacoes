import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedBoolFilterObjectSchema } from './NestedBoolFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(makeSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterObjectSchema).optional()
}).strict();
export const NestedBoolWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedBoolWithAggregatesFilter>;
export const NestedBoolWithAggregatesFilterObjectZodSchema = makeSchema();
