/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutRental_itemsInputObjectSchema as EquipmentCreateWithoutRental_itemsInputObjectSchema } from './EquipmentCreateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema as EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutRental_itemsInput.schema';
import { EquipmentCreateOrConnectWithoutRental_itemsInputObjectSchema as EquipmentCreateOrConnectWithoutRental_itemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutRental_itemsInput.schema';
import { EquipmentUpsertWithoutRental_itemsInputObjectSchema as EquipmentUpsertWithoutRental_itemsInputObjectSchema } from './EquipmentUpsertWithoutRental_itemsInput.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema as EquipmentUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema } from './EquipmentUpdateToOneWithWhereWithoutRental_itemsInput.schema';
import { EquipmentUpdateWithoutRental_itemsInputObjectSchema as EquipmentUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUpdateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema as EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutRental_itemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutRental_itemsInputObjectSchema).optional(),
  upsert: z.lazy(() => EquipmentUpsertWithoutRental_itemsInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => EquipmentUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUpdateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema)]).optional()
}).strict();
export const EquipmentUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutRental_itemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutRental_itemsNestedInput>;
export const EquipmentUpdateOneRequiredWithoutRental_itemsNestedInputObjectZodSchema = makeSchema();
