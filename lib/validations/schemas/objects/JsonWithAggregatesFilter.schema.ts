import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QueryModeSchema } from '../enums/QueryMode.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedJsonFilterObjectSchema } from './NestedJsonFilter.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: jsonSchema.optional(),
  path: z.string().array().optional(),
  mode: QueryModeSchema.optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: jsonSchema.nullish(),
  array_ends_with: jsonSchema.nullish(),
  array_contains: jsonSchema.nullish(),
  lt: jsonSchema.optional(),
  lte: jsonSchema.optional(),
  gt: jsonSchema.optional(),
  gte: jsonSchema.optional(),
  not: jsonSchema.optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterObjectSchema).optional()
}).strict();
export const JsonWithAggregatesFilterObjectSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.JsonWithAggregatesFilter>;
export const JsonWithAggregatesFilterObjectZodSchema = makeSchema();
