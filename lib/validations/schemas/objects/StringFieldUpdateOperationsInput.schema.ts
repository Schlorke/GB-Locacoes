import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const StringFieldUpdateOperationsInputObjectSchema: z.ZodType<
  Prisma.StringFieldUpdateOperationsInput,
  Prisma.StringFieldUpdateOperationsInput
> = z
  .object({
    set: z.string().optional(),
  })
  .strict()
export const StringFieldUpdateOperationsInputObjectZodSchema = z
  .object({
    set: z.string().optional(),
  })
  .strict()
