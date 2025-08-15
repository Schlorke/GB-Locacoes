import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

export const SessionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput, Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SessionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  sessionToken: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional()
}).strict();
export const SessionScalarWhereWithAggregatesInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => SessionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  sessionToken: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional()
}).strict();
