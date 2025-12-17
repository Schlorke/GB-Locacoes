import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './EquipmentUnitWhereUniqueInput.schema';
import { EquipmentUnitUpdateWithoutEquipmentInputObjectSchema as EquipmentUnitUpdateWithoutEquipmentInputObjectSchema } from './EquipmentUnitUpdateWithoutEquipmentInput.schema';
import { EquipmentUnitUncheckedUpdateWithoutEquipmentInputObjectSchema as EquipmentUnitUncheckedUpdateWithoutEquipmentInputObjectSchema } from './EquipmentUnitUncheckedUpdateWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => EquipmentUnitUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitUncheckedUpdateWithoutEquipmentInputObjectSchema)])
}).strict();
export const EquipmentUnitUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.EquipmentUnitUpdateWithWhereUniqueWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitUpdateWithWhereUniqueWithoutEquipmentInput>;
export const EquipmentUnitUpdateWithWhereUniqueWithoutEquipmentInputObjectZodSchema = makeSchema();
