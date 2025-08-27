import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'
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
      user: z
        .lazy(() => UserCreateNestedOneWithoutQuotesInputObjectSchema)
        .optional(),
    })
    .strict()
export const QuoteCreateWithoutItemsInputObjectSchema: z.ZodType<Prisma.QuoteCreateWithoutItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateWithoutItemsInput>
export const QuoteCreateWithoutItemsInputObjectZodSchema = makeSchema()
