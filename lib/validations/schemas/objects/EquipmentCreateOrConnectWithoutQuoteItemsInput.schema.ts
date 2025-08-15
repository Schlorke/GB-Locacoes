import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateWithoutQuoteItemsInput.schema';
import { EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutQuoteItemsInput.schema'

export const EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateOrConnectWithoutQuoteItemsInput, Prisma.EquipmentCreateOrConnectWithoutQuoteItemsInput> = z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EquipmentCreateWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema)])
}).strict();
export const EquipmentCreateOrConnectWithoutQuoteItemsInputObjectZodSchema = z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EquipmentCreateWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema)])
}).strict();
