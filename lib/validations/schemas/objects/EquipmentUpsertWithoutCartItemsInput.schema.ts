import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUpdateWithoutCartItemsInputObjectSchema } from './EquipmentUpdateWithoutCartItemsInput.schema';
import { EquipmentUncheckedUpdateWithoutCartItemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutCartItemsInput.schema';
import { EquipmentCreateWithoutCartItemsInputObjectSchema } from './EquipmentCreateWithoutCartItemsInput.schema';
import { EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutCartItemsInput.schema';
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => EquipmentUpdateWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutCartItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => EquipmentCreateWithoutCartItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema)]),
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
export const EquipmentUpsertWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpsertWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpsertWithoutCartItemsInput>;
export const EquipmentUpsertWithoutCartItemsInputObjectZodSchema = makeSchema();
