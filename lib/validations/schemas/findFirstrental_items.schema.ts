import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema'
import { rental_itemsOrderByWithRelationInputObjectSchema } from './objects/rental_itemsOrderByWithRelationInput.schema'
import { rental_itemsWhereInputObjectSchema } from './objects/rental_itemsWhereInput.schema'
import { rental_itemsWhereUniqueInputObjectSchema } from './objects/rental_itemsWhereUniqueInput.schema'
import { RentalItemsScalarFieldEnumSchema } from './enums/RentalItemsScalarFieldEnum.schema'

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const rental_itemsFindFirstSelectSchema: z.ZodType<Prisma.rental_itemsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      rentalid: z.boolean().optional(),
      equipmentid: z.boolean().optional(),
      quantity: z.boolean().optional(),
      priceperday: z.boolean().optional(),
      totaldays: z.boolean().optional(),
      totalprice: z.boolean().optional(),
      createdat: z.boolean().optional(),
      updatedat: z.boolean().optional(),
      equipments: z.boolean().optional(),
      rentals: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.rental_itemsSelect>

export const rental_itemsFindFirstSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    rentalid: z.boolean().optional(),
    equipmentid: z.boolean().optional(),
    quantity: z.boolean().optional(),
    priceperday: z.boolean().optional(),
    totaldays: z.boolean().optional(),
    totalprice: z.boolean().optional(),
    createdat: z.boolean().optional(),
    updatedat: z.boolean().optional(),
    equipments: z.boolean().optional(),
    rentals: z.boolean().optional(),
  })
  .strict()

export const rental_itemsFindFirstSchema: z.ZodType<Prisma.rental_itemsFindFirstArgs> =
  z
    .object({
      select: rental_itemsFindFirstSelectSchema.optional(),
      include: z.lazy(() => rental_itemsIncludeObjectSchema.optional()),
      orderBy: z
        .union([
          rental_itemsOrderByWithRelationInputObjectSchema,
          rental_itemsOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: rental_itemsWhereInputObjectSchema.optional(),
      cursor: rental_itemsWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          RentalItemsScalarFieldEnumSchema,
          RentalItemsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.rental_itemsFindFirstArgs>

export const rental_itemsFindFirstZodSchema = z
  .object({
    select: rental_itemsFindFirstSelectSchema.optional(),
    include: z.lazy(() => rental_itemsIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        rental_itemsOrderByWithRelationInputObjectSchema,
        rental_itemsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: rental_itemsWhereInputObjectSchema.optional(),
    cursor: rental_itemsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RentalItemsScalarFieldEnumSchema,
        RentalItemsScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict()
