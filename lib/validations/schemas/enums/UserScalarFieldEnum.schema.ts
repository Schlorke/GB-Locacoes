/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'password',
  'phone',
  'cpf',
  'cnpj',
  'role',
  'emailVerified',
  'image',
  'createdAt',
  'updatedAt',
])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>
