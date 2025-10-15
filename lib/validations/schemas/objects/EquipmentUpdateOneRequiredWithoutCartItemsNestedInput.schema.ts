/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutCartItemsInputObjectSchema as EquipmentCreateWithoutCartItemsInputObjectSchema } from './EquipmentCreateWithoutCartItemsInput.schema';
import { EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema as EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutCartItemsInput.schema';
import { EquipmentCreateOrConnectWithoutCartItemsInputObjectSchema as EquipmentCreateOrConnectWithoutCartItemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutCartItemsInput.schema';
import { EquipmentUpsertWithoutCartItemsInputObjectSchema as EquipmentUpsertWithoutCartItemsInputObjectSchema } from './EquipmentUpsertWithoutCartItemsInput.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateToOneWithWhereWithoutCartItemsInputObjectSchema as EquipmentUpdateToOneWithWhereWithoutCartItemsInputObjectSchema } from './EquipmentUpdateToOneWithWhereWithoutCartItemsInput.schema';
import { EquipmentUpdateWithoutCartItemsInputObjectSchema as EquipmentUpdateWithoutCartItemsInputObjectSchema } from './EquipmentUpdateWithoutCartItemsInput.schema';
import { EquipmentUncheckedUpdateWithoutCartItemsInputObjectSchema as EquipmentUncheckedUpdateWithoutCartItemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutCartItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => EquipmentUpsertWithoutCartItemsInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => EquipmentUpdateToOneWithWhereWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUpdateWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutCartItemsInputObjectSchema)]).optional()
}).strict();
export const EquipmentUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutCartItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutCartItemsNestedInput>;
export const EquipmentUpdateOneRequiredWithoutCartItemsNestedInputObjectZodSchema = makeSchema();
