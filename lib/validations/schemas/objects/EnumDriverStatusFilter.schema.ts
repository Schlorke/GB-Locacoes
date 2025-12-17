/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DriverStatusSchema } from '../enums/DriverStatus.schema';
import { NestedEnumDriverStatusFilterObjectSchema as NestedEnumDriverStatusFilterObjectSchema } from './NestedEnumDriverStatusFilter.schema'

const makeSchema = () => z.object({
  equals: DriverStatusSchema.optional(),
  in: DriverStatusSchema.array().optional(),
  notIn: DriverStatusSchema.array().optional(),
  not: z.union([DriverStatusSchema, z.lazy(() => NestedEnumDriverStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumDriverStatusFilterObjectSchema: z.ZodType<Prisma.EnumDriverStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumDriverStatusFilter>;
export const EnumDriverStatusFilterObjectZodSchema = makeSchema();
