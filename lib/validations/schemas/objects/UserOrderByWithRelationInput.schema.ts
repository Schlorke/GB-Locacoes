import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { AccountOrderByRelationAggregateInputObjectSchema } from './AccountOrderByRelationAggregateInput.schema'
import { QuoteOrderByRelationAggregateInputObjectSchema } from './QuoteOrderByRelationAggregateInput.schema'
import { rentalsOrderByRelationAggregateInputObjectSchema } from './rentalsOrderByRelationAggregateInput.schema'
import { SessionOrderByRelationAggregateInputObjectSchema } from './SessionOrderByRelationAggregateInput.schema'

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      name: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      email: SortOrderSchema.optional(),
      password: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      role: SortOrderSchema.optional(),
      emailVerified: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      image: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      accounts: z
        .lazy(() => AccountOrderByRelationAggregateInputObjectSchema)
        .optional(),
      quotes: z
        .lazy(() => QuoteOrderByRelationAggregateInputObjectSchema)
        .optional(),
      rentals: z
        .lazy(() => rentalsOrderByRelationAggregateInputObjectSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict()
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema()
