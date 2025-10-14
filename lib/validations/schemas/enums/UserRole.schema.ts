/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const UserRoleSchema = z.enum([
  'ADMIN',
  'OPERATOR',
  'FINANCIAL',
  'CUSTOMER',
])

export type UserRole = z.infer<typeof UserRoleSchema>
