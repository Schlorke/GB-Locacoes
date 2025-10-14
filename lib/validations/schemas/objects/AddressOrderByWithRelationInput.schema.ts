/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      street: SortOrderSchema.optional(),
      number: SortOrderSchema.optional(),
      complement: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      neighborhood: SortOrderSchema.optional(),
      city: SortOrderSchema.optional(),
      state: SortOrderSchema.optional(),
      zipCode: SortOrderSchema.optional(),
      isPrimary: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict()
export const AddressOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AddressOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.AddressOrderByWithRelationInput>
export const AddressOrderByWithRelationInputObjectZodSchema = makeSchema()
