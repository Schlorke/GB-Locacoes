import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentCreateWithoutRental_itemsInputObjectSchema } from './EquipmentCreateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutRental_itemsInput.schema'

export const EquipmentCreateOrConnectWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateOrConnectWithoutRental_itemsInput, Prisma.EquipmentCreateOrConnectWithoutRental_itemsInput> = z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EquipmentCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema)])
}).strict();
export const EquipmentCreateOrConnectWithoutRental_itemsInputObjectZodSchema = z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EquipmentCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema)])
}).strict();
