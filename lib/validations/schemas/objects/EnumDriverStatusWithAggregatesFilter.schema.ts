import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DriverStatusSchema } from '../enums/DriverStatus.schema';
import { NestedEnumDriverStatusWithAggregatesFilterObjectSchema as NestedEnumDriverStatusWithAggregatesFilterObjectSchema } from './NestedEnumDriverStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumDriverStatusFilterObjectSchema as NestedEnumDriverStatusFilterObjectSchema } from './NestedEnumDriverStatusFilter.schema'

const makeSchema = () => z.object({
  equals: DriverStatusSchema.optional(),
  in: DriverStatusSchema.array().optional(),
  notIn: DriverStatusSchema.array().optional(),
  not: z.union([DriverStatusSchema, z.lazy(() => NestedEnumDriverStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumDriverStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumDriverStatusFilterObjectSchema).optional()
}).strict();
export const EnumDriverStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumDriverStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumDriverStatusWithAggregatesFilter>;
export const EnumDriverStatusWithAggregatesFilterObjectZodSchema = makeSchema();
