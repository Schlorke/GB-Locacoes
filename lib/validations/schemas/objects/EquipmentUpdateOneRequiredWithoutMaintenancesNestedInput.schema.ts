/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutMaintenancesInputObjectSchema as EquipmentCreateWithoutMaintenancesInputObjectSchema } from './EquipmentCreateWithoutMaintenancesInput.schema';
import { EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema as EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema } from './EquipmentUncheckedCreateWithoutMaintenancesInput.schema';
import { EquipmentCreateOrConnectWithoutMaintenancesInputObjectSchema as EquipmentCreateOrConnectWithoutMaintenancesInputObjectSchema } from './EquipmentCreateOrConnectWithoutMaintenancesInput.schema';
import { EquipmentUpsertWithoutMaintenancesInputObjectSchema as EquipmentUpsertWithoutMaintenancesInputObjectSchema } from './EquipmentUpsertWithoutMaintenancesInput.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateToOneWithWhereWithoutMaintenancesInputObjectSchema as EquipmentUpdateToOneWithWhereWithoutMaintenancesInputObjectSchema } from './EquipmentUpdateToOneWithWhereWithoutMaintenancesInput.schema';
import { EquipmentUpdateWithoutMaintenancesInputObjectSchema as EquipmentUpdateWithoutMaintenancesInputObjectSchema } from './EquipmentUpdateWithoutMaintenancesInput.schema';
import { EquipmentUncheckedUpdateWithoutMaintenancesInputObjectSchema as EquipmentUncheckedUpdateWithoutMaintenancesInputObjectSchema } from './EquipmentUncheckedUpdateWithoutMaintenancesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutMaintenancesInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutMaintenancesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutMaintenancesInputObjectSchema).optional(),
  upsert: z.lazy(() => EquipmentUpsertWithoutMaintenancesInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => EquipmentUpdateToOneWithWhereWithoutMaintenancesInputObjectSchema), z.lazy(() => EquipmentUpdateWithoutMaintenancesInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutMaintenancesInputObjectSchema)]).optional()
}).strict();
export const EquipmentUpdateOneRequiredWithoutMaintenancesNestedInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutMaintenancesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutMaintenancesNestedInput>;
export const EquipmentUpdateOneRequiredWithoutMaintenancesNestedInputObjectZodSchema = makeSchema();
