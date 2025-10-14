/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { AddressSelectObjectSchema as AddressSelectObjectSchema } from './objects/AddressSelect.schema'
import { AddressIncludeObjectSchema as AddressIncludeObjectSchema } from './objects/AddressInclude.schema'
import { AddressCreateInputObjectSchema as AddressCreateInputObjectSchema } from './objects/AddressCreateInput.schema'
import { AddressUncheckedCreateInputObjectSchema as AddressUncheckedCreateInputObjectSchema } from './objects/AddressUncheckedCreateInput.schema'

export const AddressCreateOneSchema: z.ZodType<Prisma.AddressCreateArgs> = z
  .object({
    select: AddressSelectObjectSchema.optional(),
    include: AddressIncludeObjectSchema.optional(),
    data: z.union([
      AddressCreateInputObjectSchema,
      AddressUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.AddressCreateArgs>

export const AddressCreateOneZodSchema = z
  .object({
    select: AddressSelectObjectSchema.optional(),
    include: AddressIncludeObjectSchema.optional(),
    data: z.union([
      AddressCreateInputObjectSchema,
      AddressUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict()
