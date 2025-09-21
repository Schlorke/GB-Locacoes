import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema'
import { rentalsOrderByWithRelationInputObjectSchema } from './objects/rentalsOrderByWithRelationInput.schema'
import { rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema'
import { rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema'
import { RentalsScalarFieldEnumSchema } from './enums/RentalsScalarFieldEnum.schema'

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const rentalsFindFirstOrThrowSelectSchema: z.ZodType<Prisma.rentalsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      startdate: z.boolean().optional(),
      enddate: z.boolean().optional(),
      total: z.boolean().optional(),
      status: z.boolean().optional(),
      userid: z.boolean().optional(),
      createdat: z.boolean().optional(),
      updatedat: z.boolean().optional(),
      rental_items: z.boolean().optional(),
      users: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.rentalsSelect>

export const rentalsFindFirstOrThrowSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    startdate: z.boolean().optional(),
    enddate: z.boolean().optional(),
    total: z.boolean().optional(),
    status: z.boolean().optional(),
    userid: z.boolean().optional(),
    createdat: z.boolean().optional(),
    updatedat: z.boolean().optional(),
    rental_items: z.boolean().optional(),
    users: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict()

export const rentalsFindFirstOrThrowSchema: z.ZodType<Prisma.rentalsFindFirstOrThrowArgs> =
  z
    .object({
      select: rentalsFindFirstOrThrowSelectSchema.optional(),
      include: z.lazy(() => rentalsIncludeObjectSchema.optional()),
      orderBy: z
        .union([
          rentalsOrderByWithRelationInputObjectSchema,
          rentalsOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: rentalsWhereInputObjectSchema.optional(),
      cursor: rentalsWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          RentalsScalarFieldEnumSchema,
          RentalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.rentalsFindFirstOrThrowArgs>

export const rentalsFindFirstOrThrowZodSchema = z
  .object({
    select: rentalsFindFirstOrThrowSelectSchema.optional(),
    include: z.lazy(() => rentalsIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        rentalsOrderByWithRelationInputObjectSchema,
        rentalsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: rentalsWhereInputObjectSchema.optional(),
    cursor: rentalsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RentalsScalarFieldEnumSchema,
        RentalsScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict()
