/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitScalarWhereInputObjectSchema as EquipmentUnitScalarWhereInputObjectSchema } from './EquipmentUnitScalarWhereInput.schema';
import { EquipmentUnitUpdateManyMutationInputObjectSchema as EquipmentUnitUpdateManyMutationInputObjectSchema } from './EquipmentUnitUpdateManyMutationInput.schema';
import { EquipmentUnitUncheckedUpdateManyWithoutEquipmentInputObjectSchema as EquipmentUnitUncheckedUpdateManyWithoutEquipmentInputObjectSchema } from './EquipmentUnitUncheckedUpdateManyWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentUnitScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => EquipmentUnitUpdateManyMutationInputObjectSchema), z.lazy(() => EquipmentUnitUncheckedUpdateManyWithoutEquipmentInputObjectSchema)])
}).strict();
export const EquipmentUnitUpdateManyWithWhereWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.EquipmentUnitUpdateManyWithWhereWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitUpdateManyWithWhereWithoutEquipmentInput>;
export const EquipmentUnitUpdateManyWithWhereWithoutEquipmentInputObjectZodSchema = makeSchema();
