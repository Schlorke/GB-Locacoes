/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { CartItemIncludeObjectSchema as CartItemIncludeObjectSchema } from './objects/CartItemInclude.schema'
import { CartItemOrderByWithRelationInputObjectSchema as CartItemOrderByWithRelationInputObjectSchema } from './objects/CartItemOrderByWithRelationInput.schema'
import { CartItemWhereInputObjectSchema as CartItemWhereInputObjectSchema } from './objects/CartItemWhereInput.schema'
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './objects/CartItemWhereUniqueInput.schema'
import { CartItemScalarFieldEnumSchema } from './enums/CartItemScalarFieldEnum.schema'

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CartItemFindFirstOrThrowSelectSchema: z.ZodType<Prisma.CartItemSelect> =
  z
    .object({
      id: z.boolean().optional(),
      cartId: z.boolean().optional(),
      cart: z.boolean().optional(),
      equipmentId: z.boolean().optional(),
      equipment: z.boolean().optional(),
      quantity: z.boolean().optional(),
      days: z.boolean().optional(),
      pricePerDay: z.boolean().optional(),
      finalPrice: z.boolean().optional(),
      createdAt: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CartItemSelect>

export const CartItemFindFirstOrThrowSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    cartId: z.boolean().optional(),
    cart: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    equipment: z.boolean().optional(),
    quantity: z.boolean().optional(),
    days: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    finalPrice: z.boolean().optional(),
    createdAt: z.boolean().optional(),
  })
  .strict()

export const CartItemFindFirstOrThrowSchema: z.ZodType<Prisma.CartItemFindFirstOrThrowArgs> =
  z
    .object({
      select: CartItemFindFirstOrThrowSelectSchema.optional(),
      include: CartItemIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          CartItemOrderByWithRelationInputObjectSchema,
          CartItemOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: CartItemWhereInputObjectSchema.optional(),
      cursor: CartItemWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CartItemScalarFieldEnumSchema,
          CartItemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CartItemFindFirstOrThrowArgs>

export const CartItemFindFirstOrThrowZodSchema = z
  .object({
    select: CartItemFindFirstOrThrowSelectSchema.optional(),
    include: CartItemIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        CartItemOrderByWithRelationInputObjectSchema,
        CartItemOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: CartItemWhereInputObjectSchema.optional(),
    cursor: CartItemWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        CartItemScalarFieldEnumSchema,
        CartItemScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict()
