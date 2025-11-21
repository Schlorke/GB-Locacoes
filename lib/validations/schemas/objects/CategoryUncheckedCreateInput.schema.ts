/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectSchema as EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateNestedManyWithoutCategoryInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  iconColor: z.string().optional(),
  bgColor: z.string().optional(),
  fontColor: z.string().optional(),
  slug: z.string(),
  placement: z.string().optional().nullable(),
  customIcon: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  equipments: z.lazy(() => EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const CategoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedCreateInput>;
export const CategoryUncheckedCreateInputObjectZodSchema = makeSchema();
