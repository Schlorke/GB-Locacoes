import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PaymentCountOrderByAggregateInputObjectSchema as PaymentCountOrderByAggregateInputObjectSchema } from './PaymentCountOrderByAggregateInput.schema';
import { PaymentAvgOrderByAggregateInputObjectSchema as PaymentAvgOrderByAggregateInputObjectSchema } from './PaymentAvgOrderByAggregateInput.schema';
import { PaymentMaxOrderByAggregateInputObjectSchema as PaymentMaxOrderByAggregateInputObjectSchema } from './PaymentMaxOrderByAggregateInput.schema';
import { PaymentMinOrderByAggregateInputObjectSchema as PaymentMinOrderByAggregateInputObjectSchema } from './PaymentMinOrderByAggregateInput.schema';
import { PaymentSumOrderByAggregateInputObjectSchema as PaymentSumOrderByAggregateInputObjectSchema } from './PaymentSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rentalId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  quoteId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  amount: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  paidAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dueDate: SortOrderSchema.optional(),
  invoiceNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  transactionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pixCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pixQrCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PaymentCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => PaymentAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PaymentMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PaymentMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => PaymentSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PaymentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PaymentOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentOrderByWithAggregationInput>;
export const PaymentOrderByWithAggregationInputObjectZodSchema = makeSchema();
