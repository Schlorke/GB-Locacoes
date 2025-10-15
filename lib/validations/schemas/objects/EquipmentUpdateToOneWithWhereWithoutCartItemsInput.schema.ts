/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema';
import { EquipmentUpdateWithoutCartItemsInputObjectSchema as EquipmentUpdateWithoutCartItemsInputObjectSchema } from './EquipmentUpdateWithoutCartItemsInput.schema';
import { EquipmentUncheckedUpdateWithoutCartItemsInputObjectSchema as EquipmentUncheckedUpdateWithoutCartItemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => EquipmentUpdateWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutCartItemsInputObjectSchema)])
}).strict();
export const EquipmentUpdateToOneWithWhereWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutCartItemsInput>;
export const EquipmentUpdateToOneWithWhereWithoutCartItemsInputObjectZodSchema = makeSchema();
