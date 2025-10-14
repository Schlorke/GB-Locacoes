/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { AddressSelectObjectSchema as AddressSelectObjectSchema } from './objects/AddressSelect.schema'
import { AddressUpdateManyMutationInputObjectSchema as AddressUpdateManyMutationInputObjectSchema } from './objects/AddressUpdateManyMutationInput.schema'
import { AddressWhereInputObjectSchema as AddressWhereInputObjectSchema } from './objects/AddressWhereInput.schema'

export const AddressUpdateManyAndReturnSchema: z.ZodType<Prisma.AddressUpdateManyAndReturnArgs> =
  z
    .object({
      select: AddressSelectObjectSchema.optional(),
      data: AddressUpdateManyMutationInputObjectSchema,
      where: AddressWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.AddressUpdateManyAndReturnArgs>

export const AddressUpdateManyAndReturnZodSchema = z
  .object({
    select: AddressSelectObjectSchema.optional(),
    data: AddressUpdateManyMutationInputObjectSchema,
    where: AddressWhereInputObjectSchema.optional(),
  })
  .strict()
