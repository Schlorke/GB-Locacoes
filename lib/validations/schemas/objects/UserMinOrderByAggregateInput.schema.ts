/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      password: SortOrderSchema.optional(),
      phone: SortOrderSchema.optional(),
      cpf: SortOrderSchema.optional(),
      cnpj: SortOrderSchema.optional(),
      role: SortOrderSchema.optional(),
      emailVerified: SortOrderSchema.optional(),
      image: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict()
export const UserMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserMinOrderByAggregateInput>
export const UserMinOrderByAggregateInputObjectZodSchema = makeSchema()
