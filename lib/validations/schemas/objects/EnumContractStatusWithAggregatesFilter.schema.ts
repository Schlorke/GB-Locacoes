/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ContractStatusSchema } from '../enums/ContractStatus.schema';
import { NestedEnumContractStatusWithAggregatesFilterObjectSchema as NestedEnumContractStatusWithAggregatesFilterObjectSchema } from './NestedEnumContractStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumContractStatusFilterObjectSchema as NestedEnumContractStatusFilterObjectSchema } from './NestedEnumContractStatusFilter.schema'

const makeSchema = () => z.object({
  equals: ContractStatusSchema.optional(),
  in: ContractStatusSchema.array().optional(),
  notIn: ContractStatusSchema.array().optional(),
  not: z.union([ContractStatusSchema, z.lazy(() => NestedEnumContractStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumContractStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumContractStatusFilterObjectSchema).optional()
}).strict();
export const EnumContractStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumContractStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumContractStatusWithAggregatesFilter>;
export const EnumContractStatusWithAggregatesFilterObjectZodSchema = makeSchema();
