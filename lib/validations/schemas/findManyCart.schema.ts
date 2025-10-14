/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { CartIncludeObjectSchema as CartIncludeObjectSchema } from './objects/CartInclude.schema'
import { CartOrderByWithRelationInputObjectSchema as CartOrderByWithRelationInputObjectSchema } from './objects/CartOrderByWithRelationInput.schema'
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './objects/CartWhereInput.schema'
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema'
import { CartScalarFieldEnumSchema } from './enums/CartScalarFieldEnum.schema'

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CartFindManySelectSchema: z.ZodType<Prisma.CartSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    items: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.CartSelect>

export const CartFindManySelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    items: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict()

export const CartFindManySchema: z.ZodType<Prisma.CartFindManyArgs> = z
  .object({
    select: CartFindManySelectSchema.optional(),
    include: CartIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        CartOrderByWithRelationInputObjectSchema,
        CartOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: CartWhereInputObjectSchema.optional(),
    cursor: CartWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([CartScalarFieldEnumSchema, CartScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.CartFindManyArgs>

export const CartFindManyZodSchema = z
  .object({
    select: CartFindManySelectSchema.optional(),
    include: CartIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        CartOrderByWithRelationInputObjectSchema,
        CartOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: CartWhereInputObjectSchema.optional(),
    cursor: CartWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([CartScalarFieldEnumSchema, CartScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()
