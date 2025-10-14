/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentArgsObjectSchema as EquipmentArgsObjectSchema } from './EquipmentArgs.schema'
import { QuoteArgsObjectSchema as QuoteArgsObjectSchema } from './QuoteArgs.schema'

const makeSchema = () =>
  z
    .object({
      equipment: z
        .union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)])
        .optional(),
      quote: z
        .union([z.boolean(), z.lazy(() => QuoteArgsObjectSchema)])
        .optional(),
    })
    .strict()
export const QuoteItemIncludeObjectSchema: z.ZodType<Prisma.QuoteItemInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemInclude>
export const QuoteItemIncludeObjectZodSchema = makeSchema()
