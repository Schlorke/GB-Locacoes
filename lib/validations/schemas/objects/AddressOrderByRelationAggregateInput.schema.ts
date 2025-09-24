import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AddressOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AddressOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressOrderByRelationAggregateInput>;
export const AddressOrderByRelationAggregateInputObjectZodSchema = makeSchema();
