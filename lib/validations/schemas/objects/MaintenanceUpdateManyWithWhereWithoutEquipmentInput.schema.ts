import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceScalarWhereInputObjectSchema as MaintenanceScalarWhereInputObjectSchema } from './MaintenanceScalarWhereInput.schema';
import { MaintenanceUpdateManyMutationInputObjectSchema as MaintenanceUpdateManyMutationInputObjectSchema } from './MaintenanceUpdateManyMutationInput.schema';
import { MaintenanceUncheckedUpdateManyWithoutEquipmentInputObjectSchema as MaintenanceUncheckedUpdateManyWithoutEquipmentInputObjectSchema } from './MaintenanceUncheckedUpdateManyWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaintenanceScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MaintenanceUpdateManyMutationInputObjectSchema), z.lazy(() => MaintenanceUncheckedUpdateManyWithoutEquipmentInputObjectSchema)])
}).strict();
export const MaintenanceUpdateManyWithWhereWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.MaintenanceUpdateManyWithWhereWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceUpdateManyWithWhereWithoutEquipmentInput>;
export const MaintenanceUpdateManyWithWhereWithoutEquipmentInputObjectZodSchema = makeSchema();
