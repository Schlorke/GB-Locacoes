import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'
import { QuoteCreateWithoutUserInputObjectSchema } from './QuoteCreateWithoutUserInput.schema'
import { QuoteUncheckedCreateWithoutUserInputObjectSchema } from './QuoteUncheckedCreateWithoutUserInput.schema'

export const QuoteCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<
  Prisma.QuoteCreateOrConnectWithoutUserInput,
  Prisma.QuoteCreateOrConnectWithoutUserInput
> = z
  .object({
    where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => QuoteCreateWithoutUserInputObjectSchema),
      z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict()
export const QuoteCreateOrConnectWithoutUserInputObjectZodSchema = z
  .object({
    where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => QuoteCreateWithoutUserInputObjectSchema),
      z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict()
