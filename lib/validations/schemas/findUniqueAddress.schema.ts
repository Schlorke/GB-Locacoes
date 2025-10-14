/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { AddressSelectObjectSchema as AddressSelectObjectSchema } from './objects/AddressSelect.schema'
import { AddressIncludeObjectSchema as AddressIncludeObjectSchema } from './objects/AddressInclude.schema'
import { AddressWhereUniqueInputObjectSchema as AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema'

export const AddressFindUniqueSchema: z.ZodType<Prisma.AddressFindUniqueArgs> =
  z
    .object({
      select: AddressSelectObjectSchema.optional(),
      include: AddressIncludeObjectSchema.optional(),
      where: AddressWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.AddressFindUniqueArgs>

export const AddressFindUniqueZodSchema = z
  .object({
    select: AddressSelectObjectSchema.optional(),
    include: AddressIncludeObjectSchema.optional(),
    where: AddressWhereUniqueInputObjectSchema,
  })
  .strict()
