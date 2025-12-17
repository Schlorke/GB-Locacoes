/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './EquipmentUnitWhereUniqueInput.schema';
import { EquipmentUnitCreateWithoutEquipmentInputObjectSchema as EquipmentUnitCreateWithoutEquipmentInputObjectSchema } from './EquipmentUnitCreateWithoutEquipmentInput.schema';
import { EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema as EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema } from './EquipmentUnitUncheckedCreateWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentUnitWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EquipmentUnitCreateWithoutEquipmentInputObjectSchema), z.lazy(() => EquipmentUnitUncheckedCreateWithoutEquipmentInputObjectSchema)])
}).strict();
export const EquipmentUnitCreateOrConnectWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.EquipmentUnitCreateOrConnectWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitCreateOrConnectWithoutEquipmentInput>;
export const EquipmentUnitCreateOrConnectWithoutEquipmentInputObjectZodSchema = makeSchema();
