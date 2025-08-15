import type { Prisma } from '../../../node_modules/.prisma/client'
import { z } from 'zod'
import { UserIncludeObjectSchema } from './objects/UserInclude.schema'
import { UserOrderByWithRelationInputObjectSchema } from './objects/UserOrderByWithRelationInput.schema'
import { UserWhereInputObjectSchema } from './objects/UserWhereInput.schema'
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema'
import { UserScalarFieldEnumSchema } from './enums/UserScalarFieldEnum.schema'
import { AccountArgsObjectSchema } from './objects/AccountArgs.schema'
import { QuoteArgsObjectSchema } from './objects/QuoteArgs.schema'
import { rentalsArgsObjectSchema } from './objects/rentalsArgs.schema'
import { SessionArgsObjectSchema } from './objects/SessionArgs.schema'
import { UserCountOutputTypeArgsObjectSchema } from './objects/UserCountOutputTypeArgs.schema'

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindFirstSelectSchema: z.ZodType<
  Prisma.UserSelect,
  Prisma.UserSelect
> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    role: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    image: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    accounts: z.boolean().optional(),
    quotes: z.boolean().optional(),
    rentals: z.boolean().optional(),
    sessions: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict()

export const UserFindFirstSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    role: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    image: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    accounts: z.boolean().optional(),
    quotes: z.boolean().optional(),
    rentals: z.boolean().optional(),
    sessions: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict()

export const UserFindFirstSchema: z.ZodType<
  Prisma.UserFindFirstArgs,
  Prisma.UserFindFirstArgs
> = z
  .object({
    select: UserFindFirstSelectSchema.optional(),
    include: z.lazy(() => UserIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const UserFindFirstZodSchema = z
  .object({
    select: UserFindFirstSelectSchema.optional(),
    include: z.lazy(() => UserIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()
