/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'

export const DeliveryTypeSchema = z.enum(['DELIVERY', 'PICKUP'])

export type DeliveryType = z.infer<typeof DeliveryTypeSchema>
