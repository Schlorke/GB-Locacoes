/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const PaymentTypeSchema = z.enum([
  'RENTAL',
  'DEPOSIT',
  'FINE',
  'DAMAGE',
  'LATE_FEE',
])

export type PaymentType = z.infer<typeof PaymentTypeSchema>
