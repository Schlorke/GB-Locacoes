import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { rentalsOrderByWithRelationInputObjectSchema as rentalsOrderByWithRelationInputObjectSchema } from './rentalsOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rentalId: SortOrderSchema.optional(),
  template: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  content: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pdfUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signedBy: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  zapSignId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  rental: z.lazy(() => rentalsOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ContractOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ContractOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractOrderByWithRelationInput>;
export const ContractOrderByWithRelationInputObjectZodSchema = makeSchema();
