import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUpdateWithoutMaintenancesInputObjectSchema as EquipmentUpdateWithoutMaintenancesInputObjectSchema } from './EquipmentUpdateWithoutMaintenancesInput.schema';
import { EquipmentUncheckedUpdateWithoutMaintenancesInputObjectSchema as EquipmentUncheckedUpdateWithoutMaintenancesInputObjectSchema } from './EquipmentUncheckedUpdateWithoutMaintenancesInput.schema';
import { EquipmentCreateWithoutMaintenancesInputObjectSchema as EquipmentCreateWithoutMaintenancesInputObjectSchema } from './EquipmentCreateWithoutMaintenancesInput.schema';
import { EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema as EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema } from './EquipmentUncheckedCreateWithoutMaintenancesInput.schema';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => EquipmentUpdateWithoutMaintenancesInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutMaintenancesInputObjectSchema)]),
  create: z.union([z.lazy(() => EquipmentCreateWithoutMaintenancesInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema)]),
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
export const EquipmentUpsertWithoutMaintenancesInputObjectSchema: z.ZodType<Prisma.EquipmentUpsertWithoutMaintenancesInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpsertWithoutMaintenancesInput>;
export const EquipmentUpsertWithoutMaintenancesInputObjectZodSchema = makeSchema();
