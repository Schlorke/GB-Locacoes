/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AccountOrderByRelationAggregateInputObjectSchema as AccountOrderByRelationAggregateInputObjectSchema } from './AccountOrderByRelationAggregateInput.schema';
import { AddressOrderByRelationAggregateInputObjectSchema as AddressOrderByRelationAggregateInputObjectSchema } from './AddressOrderByRelationAggregateInput.schema';
import { AuditLogOrderByRelationAggregateInputObjectSchema as AuditLogOrderByRelationAggregateInputObjectSchema } from './AuditLogOrderByRelationAggregateInput.schema';
import { CartOrderByWithRelationInputObjectSchema as CartOrderByWithRelationInputObjectSchema } from './CartOrderByWithRelationInput.schema';
import { QuoteOrderByRelationAggregateInputObjectSchema as QuoteOrderByRelationAggregateInputObjectSchema } from './QuoteOrderByRelationAggregateInput.schema';
import { rentalsOrderByRelationAggregateInputObjectSchema as rentalsOrderByRelationAggregateInputObjectSchema } from './rentalsOrderByRelationAggregateInput.schema';
import { SessionOrderByRelationAggregateInputObjectSchema as SessionOrderByRelationAggregateInputObjectSchema } from './SessionOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  email: SortOrderSchema.optional(),
  password: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  role: SortOrderSchema.optional(),
  emailVerified: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  image: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  cnpj: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cpf: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phone: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputObjectSchema).optional(),
  addresses: z.lazy(() => AddressOrderByRelationAggregateInputObjectSchema).optional(),
  auditLogs: z.lazy(() => AuditLogOrderByRelationAggregateInputObjectSchema).optional(),
  cart: z.lazy(() => CartOrderByWithRelationInputObjectSchema).optional(),
  approvedQuotes: z.lazy(() => QuoteOrderByRelationAggregateInputObjectSchema).optional(),
  rejectedQuotes: z.lazy(() => QuoteOrderByRelationAggregateInputObjectSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsOrderByRelationAggregateInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
