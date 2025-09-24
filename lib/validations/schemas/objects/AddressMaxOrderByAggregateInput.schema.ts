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
export const AddressMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AddressMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressMaxOrderByAggregateInput>;
export const AddressMaxOrderByAggregateInputObjectZodSchema = makeSchema();
