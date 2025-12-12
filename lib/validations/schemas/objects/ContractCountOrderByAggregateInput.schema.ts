/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rentalId: SortOrderSchema.optional(),
  template: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  pdfUrl: SortOrderSchema.optional(),
  signedAt: SortOrderSchema.optional(),
  signedBy: SortOrderSchema.optional(),
  zapSignId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ContractCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ContractCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractCountOrderByAggregateInput>;
export const ContractCountOrderByAggregateInputObjectZodSchema = makeSchema();
