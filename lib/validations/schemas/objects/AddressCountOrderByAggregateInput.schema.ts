import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  street: SortOrderSchema.optional(),
  number: SortOrderSchema.optional(),
  complement: SortOrderSchema.optional(),
  neighborhood: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  state: SortOrderSchema.optional(),
  zipCode: SortOrderSchema.optional(),
  isPrimary: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AddressCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AddressCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressCountOrderByAggregateInput>;
export const AddressCountOrderByAggregateInputObjectZodSchema = makeSchema();
