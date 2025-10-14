/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

const makeSchema = () =>
  z
    .object({
      is: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
    })
    .strict()
export const EquipmentScalarRelationFilterObjectSchema: z.ZodType<Prisma.EquipmentScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentScalarRelationFilter>
export const EquipmentScalarRelationFilterObjectZodSchema = makeSchema()
