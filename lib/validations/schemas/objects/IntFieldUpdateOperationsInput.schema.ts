import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const IntFieldUpdateOperationsInputObjectSchema: z.ZodType<
  Prisma.IntFieldUpdateOperationsInput,
  Prisma.IntFieldUpdateOperationsInput
> = z
  .object({
    set: z.number().int().optional(),
    increment: z.number().int().optional(),
    decrement: z.number().int().optional(),
    multiply: z.number().int().optional(),
    divide: z.number().int().optional(),
  })
  .strict()
export const IntFieldUpdateOperationsInputObjectZodSchema = z
  .object({
    set: z.number().int().optional(),
    increment: z.number().int().optional(),
    decrement: z.number().int().optional(),
    multiply: z.number().int().optional(),
    divide: z.number().int().optional(),
  })
  .strict()
