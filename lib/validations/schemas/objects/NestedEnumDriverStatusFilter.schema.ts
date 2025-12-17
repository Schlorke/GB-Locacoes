import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DriverStatusSchema } from '../enums/DriverStatus.schema'

const nestedenumdriverstatusfilterSchema = z.object({
  equals: DriverStatusSchema.optional(),
  in: DriverStatusSchema.array().optional(),
  notIn: DriverStatusSchema.array().optional(),
  not: z.union([DriverStatusSchema, z.lazy(() => NestedEnumDriverStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumDriverStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumDriverStatusFilter> = nestedenumdriverstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumDriverStatusFilter>;
export const NestedEnumDriverStatusFilterObjectZodSchema = nestedenumdriverstatusfilterSchema;
