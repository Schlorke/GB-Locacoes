import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'
import { QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemCreateNestedManyWithoutQuoteInput.schema'
import { UserCreateNestedOneWithoutQuotesInputObjectSchema } from './UserCreateNestedOneWithoutQuotesInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      company: z.string().nullish(),
      message: z.string().nullish(),
      total: z.number().optional(),
      status: QuoteStatusSchema.optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
      items: z
        .lazy(() => QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema)
        .optional(),
      user: z
        .lazy(() => UserCreateNestedOneWithoutQuotesInputObjectSchema)
        .optional(),
    })
    .strict()
export const QuoteCreateInputObjectSchema: z.ZodType<Prisma.QuoteCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateInput>
export const QuoteCreateInputObjectZodSchema = makeSchema()
