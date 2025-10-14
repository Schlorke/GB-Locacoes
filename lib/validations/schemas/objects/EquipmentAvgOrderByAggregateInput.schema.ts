/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () =>
  z
    .object({
      pricePerDay: SortOrderSchema.optional(),
      maxStock: SortOrderSchema.optional(),
      dailyDiscount: SortOrderSchema.optional(),
      weeklyDiscount: SortOrderSchema.optional(),
      biweeklyDiscount: SortOrderSchema.optional(),
      monthlyDiscount: SortOrderSchema.optional(),
      dailyDirectValue: SortOrderSchema.optional(),
      weeklyDirectValue: SortOrderSchema.optional(),
      biweeklyDirectValue: SortOrderSchema.optional(),
      monthlyDirectValue: SortOrderSchema.optional(),
    })
    .strict()
export const EquipmentAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentAvgOrderByAggregateInput>
export const EquipmentAvgOrderByAggregateInputObjectZodSchema = makeSchema()
