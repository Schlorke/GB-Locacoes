import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentCreateWithoutCartItemsInputObjectSchema } from './EquipmentCreateWithoutCartItemsInput.schema';
import { EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EquipmentCreateWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema)])
}).strict();
export const EquipmentCreateOrConnectWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateOrConnectWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateOrConnectWithoutCartItemsInput>;
export const EquipmentCreateOrConnectWithoutCartItemsInputObjectZodSchema = makeSchema();
