/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { EquipmentCreateManyInputObjectSchema as EquipmentCreateManyInputObjectSchema } from './objects/EquipmentCreateManyInput.schema'

export const EquipmentCreateManySchema: z.ZodType<Prisma.EquipmentCreateManyArgs> =
  z
    .object({
      data: z.union([
        EquipmentCreateManyInputObjectSchema,
        z.array(EquipmentCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.EquipmentCreateManyArgs>

export const EquipmentCreateManyZodSchema = z
  .object({
    data: z.union([
      EquipmentCreateManyInputObjectSchema,
      z.array(EquipmentCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
