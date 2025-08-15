import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const NullableDateTimeFieldUpdateOperationsInputObjectSchema: z.ZodType<
  Prisma.NullableDateTimeFieldUpdateOperationsInput,
  Prisma.NullableDateTimeFieldUpdateOperationsInput
> = z
  .object({
    set: z.date().optional().nullable(),
  })
  .strict()
export const NullableDateTimeFieldUpdateOperationsInputObjectZodSchema = z
  .object({
    set: z.date().optional().nullable(),
  })
  .strict()
