import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './EquipmentUnitWhereUniqueInput.schema';
import { EquipmentUnitUpdateWithoutEquipmentInputObjectSchema as EquipmentUnitUpdateWithoutEquipmentInputObjectSchema } from './EquipmentUnitUpdateWithoutEquipmentInput.schema';
import { EquipmentUnitUncheckedUpdateWithoutEquipmentInputObjectSchema as EquipmentUnitUncheckedUpdateWithoutEquipmentInputObjectSchema } from './EquipmentUnitUncheckedUpdateWithoutEquipmentInput.schema';
import { EquipmentUnitCreateWithoutEquipmentInputObjectSchema as EquipmentUnitCreateWithoutEquipmentInputObjectSchema } from './EquipmentUnitCreateWithoutEquipmentInput.schema';
import { EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema as EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema } from './EquipmentUnitUncheckedCreateWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => EquipmentUnitUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitUncheckedUpdateWithoutEquipmentInputObjectSchema)]),
  create: z.union([z.lazy(() => EquipmentUnitCreateWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema)])
}).strict();
export const EquipmentUnitUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.EquipmentUnitUpsertWithWhereUniqueWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitUpsertWithWhereUniqueWithoutEquipmentInput>;
export const EquipmentUnitUpsertWithWhereUniqueWithoutEquipmentInputObjectZodSchema = makeSchema();
