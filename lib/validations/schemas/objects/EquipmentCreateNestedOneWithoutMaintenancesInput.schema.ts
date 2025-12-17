import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutMaintenancesInputObjectSchema as EquipmentCreateWithoutMaintenancesInputObjectSchema } from './EquipmentCreateWithoutMaintenancesInput.schema';
import { EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema as EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema } from './EquipmentUncheckedCreateWithoutMaintenancesInput.schema';
import { EquipmentCreateOrConnectWithoutMaintenancesInputObjectSchema as EquipmentCreateOrConnectWithoutMaintenancesInputObjectSchema } from './EquipmentCreateOrConnectWithoutMaintenancesInput.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutMaintenancesInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutMaintenancesInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional()
}).strict();
export const EquipmentCreateNestedOneWithoutMaintenancesInputObjectSchema: z.ZodType<Prisma.EquipmentCreateNestedOneWithoutMaintenancesInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateNestedOneWithoutMaintenancesInput>;
export const EquipmentCreateNestedOneWithoutMaintenancesInputObjectZodSchema = makeSchema();
