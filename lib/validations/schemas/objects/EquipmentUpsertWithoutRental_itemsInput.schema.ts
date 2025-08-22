import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUpdateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutRental_itemsInput.schema';
import { EquipmentCreateWithoutRental_itemsInputObjectSchema } from './EquipmentCreateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutRental_itemsInput.schema';
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

export const EquipmentUpsertWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpsertWithoutRental_itemsInput, Prisma.EquipmentUpsertWithoutRental_itemsInput> = z.object({
  update: z.union([z.lazy(() => EquipmentUpdateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema)]),
  create: z.union([z.lazy(() => EquipmentCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema)]),
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
export const EquipmentUpsertWithoutRental_itemsInputObjectZodSchema = z.object({
  update: z.union([z.lazy(() => EquipmentUpdateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema)]),
  create: z.union([z.lazy(() => EquipmentCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema)]),
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
