/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const AddressScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'street',
  'number',
  'complement',
  'neighborhood',
  'city',
  'state',
  'zipCode',
  'isPrimary',
  'createdAt',
  'updatedAt',
])

export type AddressScalarFieldEnum = z.infer<
  typeof AddressScalarFieldEnumSchema
>
