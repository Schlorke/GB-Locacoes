import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUpdateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutRental_itemsInput.schema';
import { EquipmentCreateWithoutRental_itemsInputObjectSchema } from './EquipmentCreateWithoutRental_itemsInput.schema';
import { EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutRental_itemsInput.schema';
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => EquipmentUpdateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema)]),
  create: z.union([z.lazy(() => EquipmentCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema)]),
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
export const EquipmentUpsertWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpsertWithoutRental_itemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpsertWithoutRental_itemsInput>;
export const EquipmentUpsertWithoutRental_itemsInputObjectZodSchema = makeSchema();
