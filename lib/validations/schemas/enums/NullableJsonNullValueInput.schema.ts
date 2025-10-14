/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const NullableJsonNullValueInputSchema = z.enum(['DbNull', 'JsonNull'])

export type NullableJsonNullValueInput = z.infer<
  typeof NullableJsonNullValueInputSchema
>
