/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { EquipmentSelectObjectSchema as EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema'
import { EquipmentCreateManyInputObjectSchema as EquipmentCreateManyInputObjectSchema } from './objects/EquipmentCreateManyInput.schema'

export const EquipmentCreateManyAndReturnSchema: z.ZodType<Prisma.EquipmentCreateManyAndReturnArgs> =
  z
    .object({
      select: EquipmentSelectObjectSchema.optional(),
      data: z.union([
        EquipmentCreateManyInputObjectSchema,
        z.array(EquipmentCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.EquipmentCreateManyAndReturnArgs>

export const EquipmentCreateManyAndReturnZodSchema = z
  .object({
    select: EquipmentSelectObjectSchema.optional(),
    data: z.union([
      EquipmentCreateManyInputObjectSchema,
      z.array(EquipmentCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
