/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteScalarWhereInputObjectSchema as QuoteScalarWhereInputObjectSchema } from './QuoteScalarWhereInput.schema'
import { QuoteUpdateManyMutationInputObjectSchema as QuoteUpdateManyMutationInputObjectSchema } from './QuoteUpdateManyMutationInput.schema'
import { QuoteUncheckedUpdateManyWithoutUserInputObjectSchema as QuoteUncheckedUpdateManyWithoutUserInputObjectSchema } from './QuoteUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => QuoteScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => QuoteUpdateManyMutationInputObjectSchema),
        z.lazy(() => QuoteUncheckedUpdateManyWithoutUserInputObjectSchema),
      ]),
    })
    .strict()
export const QuoteUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutUserInput>
export const QuoteUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  makeSchema()
