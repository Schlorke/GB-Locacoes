/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { CartSelectObjectSchema as CartSelectObjectSchema } from './CartSelect.schema'
import { CartIncludeObjectSchema as CartIncludeObjectSchema } from './CartInclude.schema'

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => CartSelectObjectSchema).optional(),
      include: z.lazy(() => CartIncludeObjectSchema).optional(),
    })
    .strict()
export const CartArgsObjectSchema = makeSchema()
export const CartArgsObjectZodSchema = makeSchema()
