import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutCartItemsInputObjectSchema } from './EquipmentCreateWithoutCartItemsInput.schema';
import { EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutCartItemsInput.schema';
import { EquipmentCreateOrConnectWithoutCartItemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutCartItemsInput.schema';
import { EquipmentUpsertWithoutCartItemsInputObjectSchema } from './EquipmentUpsertWithoutCartItemsInput.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateToOneWithWhereWithoutCartItemsInputObjectSchema } from './EquipmentUpdateToOneWithWhereWithoutCartItemsInput.schema';
import { EquipmentUpdateWithoutCartItemsInputObjectSchema } from './EquipmentUpdateWithoutCartItemsInput.schema';
import { EquipmentUncheckedUpdateWithoutCartItemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutCartItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => EquipmentUpsertWithoutCartItemsInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => EquipmentUpdateToOneWithWhereWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUpdateWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutCartItemsInputObjectSchema)]).optional()
}).strict();
export const EquipmentUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutCartItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutCartItemsNestedInput>;
export const EquipmentUpdateOneRequiredWithoutCartItemsNestedInputObjectZodSchema = makeSchema();
