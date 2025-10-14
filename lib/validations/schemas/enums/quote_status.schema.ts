/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const quote_statusSchema = z.enum([
  'pending',
  'approved',
  'rejected',
  'expired',
])

export type quote_status = z.infer<typeof quote_statusSchema>
