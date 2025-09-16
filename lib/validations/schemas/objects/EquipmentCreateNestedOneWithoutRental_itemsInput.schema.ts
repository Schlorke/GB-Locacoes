import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutRental_itemsInputObjectSchema } from './EquipmentCreateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutRental_itemsInput.schema';
import { EquipmentCreateOrConnectWithoutRental_itemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutRental_itemsInput.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutRental_itemsInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional()
}).strict();
export const EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateNestedOneWithoutRental_itemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateNestedOneWithoutRental_itemsInput>;
export const EquipmentCreateNestedOneWithoutRental_itemsInputObjectZodSchema = makeSchema();
