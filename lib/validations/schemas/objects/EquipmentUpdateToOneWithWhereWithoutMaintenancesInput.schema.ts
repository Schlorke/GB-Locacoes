import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema';
import { EquipmentUpdateWithoutMaintenancesInputObjectSchema as EquipmentUpdateWithoutMaintenancesInputObjectSchema } from './EquipmentUpdateWithoutMaintenancesInput.schema';
import { EquipmentUncheckedUpdateWithoutMaintenancesInputObjectSchema as EquipmentUncheckedUpdateWithoutMaintenancesInputObjectSchema } from './EquipmentUncheckedUpdateWithoutMaintenancesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => EquipmentUpdateWithoutMaintenancesInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutMaintenancesInputObjectSchema)])
}).strict();
export const EquipmentUpdateToOneWithWhereWithoutMaintenancesInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutMaintenancesInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutMaintenancesInput>;
export const EquipmentUpdateToOneWithWhereWithoutMaintenancesInputObjectZodSchema = makeSchema();
