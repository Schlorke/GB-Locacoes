import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentUpdateWithoutQuoteItemsInputObjectSchema } from './EquipmentUpdateWithoutQuoteItemsInput.schema';
import { EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutQuoteItemsInput.schema';
import { EquipmentCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateWithoutQuoteItemsInput.schema';
import { EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutQuoteItemsInput.schema';
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

export const EquipmentUpsertWithoutQuoteItemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpsertWithoutQuoteItemsInput, Prisma.EquipmentUpsertWithoutQuoteItemsInput> = z.object({
  update: z.union([z.lazy(() => EquipmentUpdateWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => EquipmentCreateWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema)]),
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
export const EquipmentUpsertWithoutQuoteItemsInputObjectZodSchema = z.object({
  update: z.union([z.lazy(() => EquipmentUpdateWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => EquipmentCreateWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema)]),
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
