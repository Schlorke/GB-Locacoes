import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { rental_itemsOrderByRelationAggregateInputObjectSchema } from './rental_itemsOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

export const rentalsOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.rentalsOrderByWithRelationInput, Prisma.rentalsOrderByWithRelationInput> = z.object({
  id: SortOrderSchema.optional(),
  startdate: SortOrderSchema.optional(),
  enddate: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  status: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  userid: SortOrderSchema.optional(),
  createdat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  updatedat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rental_items: z.lazy(() => rental_itemsOrderByRelationAggregateInputObjectSchema).optional(),
  users: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const rentalsOrderByWithRelationInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  startdate: SortOrderSchema.optional(),
  enddate: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  status: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  userid: SortOrderSchema.optional(),
  createdat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  updatedat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rental_items: z.lazy(() => rental_itemsOrderByRelationAggregateInputObjectSchema).optional(),
  users: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
