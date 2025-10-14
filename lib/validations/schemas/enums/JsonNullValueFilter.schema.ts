/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const JsonNullValueFilterSchema = z.enum([
  'DbNull',
  'JsonNull',
  'AnyNull',
])

export type JsonNullValueFilter = z.infer<typeof JsonNullValueFilterSchema>
