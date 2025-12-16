/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ContractOrderByWithRelationInputObjectSchema as ContractOrderByWithRelationInputObjectSchema } from './ContractOrderByWithRelationInput.schema';
import { DeliveryOrderByRelationAggregateInputObjectSchema as DeliveryOrderByRelationAggregateInputObjectSchema } from './DeliveryOrderByRelationAggregateInput.schema';
import { PaymentOrderByRelationAggregateInputObjectSchema as PaymentOrderByRelationAggregateInputObjectSchema } from './PaymentOrderByRelationAggregateInput.schema';
import { rental_itemsOrderByRelationAggregateInputObjectSchema as rental_itemsOrderByRelationAggregateInputObjectSchema } from './rental_itemsOrderByRelationAggregateInput.schema';
import { QuoteOrderByWithRelationInputObjectSchema as QuoteOrderByWithRelationInputObjectSchema } from './QuoteOrderByWithRelationInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  startdate: SortOrderSchema.optional(),
  enddate: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  status: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  userid: SortOrderSchema.optional(),
  createdat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  updatedat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  checkInAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  checkOutAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  extensionDays: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  extensionFee: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lateFee: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  quoteId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  contract: z.lazy(() => ContractOrderByWithRelationInputObjectSchema).optional(),
  deliveries: z.lazy(() => DeliveryOrderByRelationAggregateInputObjectSchema).optional(),
  payments: z.lazy(() => PaymentOrderByRelationAggregateInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsOrderByRelationAggregateInputObjectSchema).optional(),
  quote: z.lazy(() => QuoteOrderByWithRelationInputObjectSchema).optional(),
  users: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const rentalsOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.rentalsOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsOrderByWithRelationInput>;
export const rentalsOrderByWithRelationInputObjectZodSchema = makeSchema();
