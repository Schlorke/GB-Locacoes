/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const RentalStatusSchema = z.enum([
  'ACTIVE',
  'COMPLETED',
  'CANCELLED',
  'OVERDUE',
  'PENDING_RETURN',
])

export type RentalStatus = z.infer<typeof RentalStatusSchema>
