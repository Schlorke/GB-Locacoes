/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutCartItemsInputObjectSchema as EquipmentCreateWithoutCartItemsInputObjectSchema } from './EquipmentCreateWithoutCartItemsInput.schema';
import { EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema as EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutCartItemsInput.schema';
import { EquipmentCreateOrConnectWithoutCartItemsInputObjectSchema as EquipmentCreateOrConnectWithoutCartItemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutCartItemsInput.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutCartItemsInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional()
}).strict();
export const EquipmentCreateNestedOneWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateNestedOneWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateNestedOneWithoutCartItemsInput>;
export const EquipmentCreateNestedOneWithoutCartItemsInputObjectZodSchema = makeSchema();
