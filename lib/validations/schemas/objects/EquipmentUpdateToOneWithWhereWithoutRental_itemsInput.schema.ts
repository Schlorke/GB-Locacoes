import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema';
import { EquipmentUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUpdateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutRental_itemsInput.schema'

export const EquipmentUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutRental_itemsInput, Prisma.EquipmentUpdateToOneWithWhereWithoutRental_itemsInput> = z.object({
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => EquipmentUpdateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema)])
}).strict();
export const EquipmentUpdateToOneWithWhereWithoutRental_itemsInputObjectZodSchema = z.object({
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => EquipmentUpdateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema)])
}).strict();
