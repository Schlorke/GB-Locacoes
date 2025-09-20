import { z } from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      set: z.string().array(),
    })
    .strict()
export const EquipmentCreateimagesInputObjectSchema: z.ZodType<Prisma.EquipmentCreateimagesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateimagesInput>
export const EquipmentCreateimagesInputObjectZodSchema = makeSchema()
