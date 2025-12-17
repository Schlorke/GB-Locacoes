/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentCreateWithoutUnitsInputObjectSchema as EquipmentCreateWithoutUnitsInputObjectSchema } from './EquipmentCreateWithoutUnitsInput.schema';
import { EquipmentUncheckedCreateWithoutUnitsInputObjectSchema as EquipmentUncheckedCreateWithoutUnitsInputObjectSchema } from './EquipmentUncheckedCreateWithoutUnitsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EquipmentCreateWithoutUnitsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutUnitsInputObjectSchema)])
}).strict();
export const EquipmentCreateOrConnectWithoutUnitsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateOrConnectWithoutUnitsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateOrConnectWithoutUnitsInput>;
export const EquipmentCreateOrConnectWithoutUnitsInputObjectZodSchema = makeSchema();
