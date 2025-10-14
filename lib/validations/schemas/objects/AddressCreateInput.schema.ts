/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { UserCreateNestedOneWithoutAddressesInputObjectSchema as UserCreateNestedOneWithoutAddressesInputObjectSchema } from './UserCreateNestedOneWithoutAddressesInput.schema'

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      street: z.string(),
      number: z.string(),
      complement: z.string().optional().nullable(),
      neighborhood: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
      isPrimary: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutAddressesInputObjectSchema),
    })
    .strict()
export const AddressCreateInputObjectSchema: z.ZodType<Prisma.AddressCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.AddressCreateInput>
export const AddressCreateInputObjectZodSchema = makeSchema()
