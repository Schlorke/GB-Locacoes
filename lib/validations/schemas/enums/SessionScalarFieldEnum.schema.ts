/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const SessionScalarFieldEnumSchema = z.enum([
  'id',
  'sessionToken',
  'userId',
  'expires',
])

export type SessionScalarFieldEnum = z.infer<
  typeof SessionScalarFieldEnumSchema
>
