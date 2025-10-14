/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const user_roleSchema = z.enum([
  'ADMIN',
  'OPERATOR',
  'FINANCIAL',
  'CUSTOMER',
])

export type user_role = z.infer<typeof user_roleSchema>
