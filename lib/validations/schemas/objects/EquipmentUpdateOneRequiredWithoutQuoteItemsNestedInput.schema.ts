import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateWithoutQuoteItemsInput.schema';
import { EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutQuoteItemsInput.schema';
import { EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutQuoteItemsInput.schema';
import { EquipmentUpsertWithoutQuoteItemsInputObjectSchema } from './EquipmentUpsertWithoutQuoteItemsInput.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateToOneWithWhereWithoutQuoteItemsInputObjectSchema } from './EquipmentUpdateToOneWithWhereWithoutQuoteItemsInput.schema';
import { EquipmentUpdateWithoutQuoteItemsInputObjectSchema } from './EquipmentUpdateWithoutQuoteItemsInput.schema';
import { EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutQuoteItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => EquipmentUpsertWithoutQuoteItemsInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => EquipmentUpdateToOneWithWhereWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUpdateWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema)]).optional()
}).strict();
export const EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInput>;
export const EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectZodSchema = makeSchema();
