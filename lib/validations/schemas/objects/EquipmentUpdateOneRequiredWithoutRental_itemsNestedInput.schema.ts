import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutRental_itemsInputObjectSchema } from './EquipmentCreateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutRental_itemsInput.schema';
import { EquipmentCreateOrConnectWithoutRental_itemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutRental_itemsInput.schema';
import { EquipmentUpsertWithoutRental_itemsInputObjectSchema } from './EquipmentUpsertWithoutRental_itemsInput.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema } from './EquipmentUpdateToOneWithWhereWithoutRental_itemsInput.schema';
import { EquipmentUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUpdateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutRental_itemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutRental_itemsInputObjectSchema).optional(),
  upsert: z.lazy(() => EquipmentUpsertWithoutRental_itemsInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => EquipmentUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUpdateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema)]).optional()
}).strict();
export const EquipmentUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutRental_itemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutRental_itemsNestedInput>;
export const EquipmentUpdateOneRequiredWithoutRental_itemsNestedInputObjectZodSchema = makeSchema();
