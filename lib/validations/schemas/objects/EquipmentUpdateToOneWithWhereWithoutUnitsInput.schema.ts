/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema';
import { EquipmentUpdateWithoutUnitsInputObjectSchema as EquipmentUpdateWithoutUnitsInputObjectSchema } from './EquipmentUpdateWithoutUnitsInput.schema';
import { EquipmentUncheckedUpdateWithoutUnitsInputObjectSchema as EquipmentUncheckedUpdateWithoutUnitsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutUnitsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => EquipmentUpdateWithoutUnitsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutUnitsInputObjectSchema)])
}).strict();
export const EquipmentUpdateToOneWithWhereWithoutUnitsInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutUnitsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutUnitsInput>;
export const EquipmentUpdateToOneWithWhereWithoutUnitsInputObjectZodSchema = makeSchema();
