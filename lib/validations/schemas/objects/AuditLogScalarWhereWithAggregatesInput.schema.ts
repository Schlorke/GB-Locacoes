/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const auditlogscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AuditLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AuditLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AuditLogScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuditLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AuditLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  action: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  entity: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  entityId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  changes: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  ipAddress: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  userAgent: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AuditLogScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AuditLogScalarWhereWithAggregatesInput> = auditlogscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AuditLogScalarWhereWithAggregatesInput>;
export const AuditLogScalarWhereWithAggregatesInputObjectZodSchema = auditlogscalarwherewithaggregatesinputSchema;
