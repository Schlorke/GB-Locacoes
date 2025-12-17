import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  action: SortOrderSchema.optional(),
  entity: SortOrderSchema.optional(),
  entityId: SortOrderSchema.optional(),
  ipAddress: SortOrderSchema.optional(),
  userAgent: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const AuditLogMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AuditLogMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogMinOrderByAggregateInput>;
export const AuditLogMinOrderByAggregateInputObjectZodSchema = makeSchema();
