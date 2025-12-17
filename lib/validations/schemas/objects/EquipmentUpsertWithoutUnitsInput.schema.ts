import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUpdateWithoutUnitsInputObjectSchema as EquipmentUpdateWithoutUnitsInputObjectSchema } from './EquipmentUpdateWithoutUnitsInput.schema';
import { EquipmentUncheckedUpdateWithoutUnitsInputObjectSchema as EquipmentUncheckedUpdateWithoutUnitsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutUnitsInput.schema';
import { EquipmentCreateWithoutUnitsInputObjectSchema as EquipmentCreateWithoutUnitsInputObjectSchema } from './EquipmentCreateWithoutUnitsInput.schema';
import { EquipmentUncheckedCreateWithoutUnitsInputObjectSchema as EquipmentUncheckedCreateWithoutUnitsInputObjectSchema } from './EquipmentUncheckedCreateWithoutUnitsInput.schema';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => EquipmentUpdateWithoutUnitsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutUnitsInputObjectSchema)]),
  create: z.union([z.lazy(() => EquipmentCreateWithoutUnitsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutUnitsInputObjectSchema)]),
  where: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
export const EquipmentUpsertWithoutUnitsInputObjectSchema: z.ZodType<Prisma.EquipmentUpsertWithoutUnitsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpsertWithoutUnitsInput>;
export const EquipmentUpsertWithoutUnitsInputObjectZodSchema = makeSchema();
