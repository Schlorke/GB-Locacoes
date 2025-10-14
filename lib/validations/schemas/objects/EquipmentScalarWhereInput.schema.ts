/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema'
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema'
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema'
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema'
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema'
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema'
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema'
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const equipmentscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => EquipmentScalarWhereInputObjectSchema),
        z.lazy(() => EquipmentScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => EquipmentScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => EquipmentScalarWhereInputObjectSchema),
        z.lazy(() => EquipmentScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    pricePerDay: z
      .union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
      .optional(),
    images: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    available: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    categoryId: z
      .union([z.lazy(() => UuidFilterObjectSchema), z.string()])
      .optional(),
    specifications: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    maxStock: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
      .optional()
      .nullable(),
    dailyDiscount: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
      .optional()
      .nullable(),
    weeklyDiscount: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
      .optional()
      .nullable(),
    biweeklyDiscount: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
      .optional()
      .nullable(),
    monthlyDiscount: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
      .optional()
      .nullable(),
    popularPeriod: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    dailyDirectValue: z
      .union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    weeklyDirectValue: z
      .union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    biweeklyDirectValue: z
      .union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    monthlyDirectValue: z
      .union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    dailyUseDirectValue: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    weeklyUseDirectValue: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    biweeklyUseDirectValue: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    monthlyUseDirectValue: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict()
export const EquipmentScalarWhereInputObjectSchema: z.ZodType<Prisma.EquipmentScalarWhereInput> =
  equipmentscalarwhereinputSchema as unknown as z.ZodType<Prisma.EquipmentScalarWhereInput>
export const EquipmentScalarWhereInputObjectZodSchema =
  equipmentscalarwhereinputSchema
