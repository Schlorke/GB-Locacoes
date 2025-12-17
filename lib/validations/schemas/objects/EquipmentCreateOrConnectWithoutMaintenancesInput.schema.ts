import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentCreateWithoutMaintenancesInputObjectSchema as EquipmentCreateWithoutMaintenancesInputObjectSchema } from './EquipmentCreateWithoutMaintenancesInput.schema';
import { EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema as EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema } from './EquipmentUncheckedCreateWithoutMaintenancesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EquipmentCreateWithoutMaintenancesInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema)])
}).strict();
export const EquipmentCreateOrConnectWithoutMaintenancesInputObjectSchema: z.ZodType<Prisma.EquipmentCreateOrConnectWithoutMaintenancesInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateOrConnectWithoutMaintenancesInput>;
export const EquipmentCreateOrConnectWithoutMaintenancesInputObjectZodSchema = makeSchema();
