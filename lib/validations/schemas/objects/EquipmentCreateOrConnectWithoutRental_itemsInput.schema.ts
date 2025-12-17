import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentCreateWithoutRental_itemsInputObjectSchema as EquipmentCreateWithoutRental_itemsInputObjectSchema } from './EquipmentCreateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema as EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutRental_itemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EquipmentCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema)])
}).strict();
export const EquipmentCreateOrConnectWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateOrConnectWithoutRental_itemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateOrConnectWithoutRental_itemsInput>;
export const EquipmentCreateOrConnectWithoutRental_itemsInputObjectZodSchema = makeSchema();
