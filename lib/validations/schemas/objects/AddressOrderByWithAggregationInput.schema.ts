import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AddressCountOrderByAggregateInputObjectSchema } from './AddressCountOrderByAggregateInput.schema';
import { AddressMaxOrderByAggregateInputObjectSchema } from './AddressMaxOrderByAggregateInput.schema';
import { AddressMinOrderByAggregateInputObjectSchema } from './AddressMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  street: SortOrderSchema.optional(),
  number: SortOrderSchema.optional(),
  complement: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  neighborhood: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  state: SortOrderSchema.optional(),
  zipCode: SortOrderSchema.optional(),
  isPrimary: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AddressCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AddressMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AddressMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AddressOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AddressOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressOrderByWithAggregationInput>;
export const AddressOrderByWithAggregationInputObjectZodSchema = makeSchema();
