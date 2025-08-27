import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'
import { QuoteUpdateWithoutUserInputObjectSchema } from './QuoteUpdateWithoutUserInput.schema'
import { QuoteUncheckedUpdateWithoutUserInputObjectSchema } from './QuoteUncheckedUpdateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => QuoteUpdateWithoutUserInputObjectSchema),
        z.lazy(() => QuoteUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict()
export const QuoteUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutUserInput>
export const QuoteUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema()
