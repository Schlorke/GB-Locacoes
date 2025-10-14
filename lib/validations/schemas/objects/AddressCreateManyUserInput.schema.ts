/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'

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
      updatedAt: z.coerce.date().optional(),
    })
    .strict()
export const AddressCreateManyUserInputObjectSchema: z.ZodType<Prisma.AddressCreateManyUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.AddressCreateManyUserInput>
export const AddressCreateManyUserInputObjectZodSchema = makeSchema()
