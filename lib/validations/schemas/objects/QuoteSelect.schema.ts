/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteItemFindManySchema as QuoteItemFindManySchema } from '../findManyQuoteItem.schema'
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'
import { QuoteCountOutputTypeArgsObjectSchema as QuoteCountOutputTypeArgsObjectSchema } from './QuoteCountOutputTypeArgs.schema'

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      email: z.boolean().optional(),
      phone: z.boolean().optional(),
      company: z.boolean().optional(),
      message: z.boolean().optional(),
      total: z.boolean().optional(),
      status: z.boolean().optional(),
      userId: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      items: z
        .union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)])
        .optional(),
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => QuoteCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict()
export const QuoteSelectObjectSchema: z.ZodType<Prisma.QuoteSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteSelect>
export const QuoteSelectObjectZodSchema = makeSchema()
