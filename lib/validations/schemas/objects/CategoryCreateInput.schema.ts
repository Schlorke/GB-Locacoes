import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { EquipmentCreateNestedManyWithoutCategoryInputObjectSchema as EquipmentCreateNestedManyWithoutCategoryInputObjectSchema } from './EquipmentCreateNestedManyWithoutCategoryInput.schema'

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
  createdAt: z.coerce.date().optional(),
  placement: z.string().optional().nullable(),
  customIcon: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  equipments: z.lazy(() => EquipmentCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const CategoryCreateInputObjectSchema: z.ZodType<Prisma.CategoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateInput>;
export const CategoryCreateInputObjectZodSchema = makeSchema();
