import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutUnitsInputObjectSchema as EquipmentCreateWithoutUnitsInputObjectSchema } from './EquipmentCreateWithoutUnitsInput.schema';
import { EquipmentUncheckedCreateWithoutUnitsInputObjectSchema as EquipmentUncheckedCreateWithoutUnitsInputObjectSchema } from './EquipmentUncheckedCreateWithoutUnitsInput.schema';
import { EquipmentCreateOrConnectWithoutUnitsInputObjectSchema as EquipmentCreateOrConnectWithoutUnitsInputObjectSchema } from './EquipmentCreateOrConnectWithoutUnitsInput.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutUnitsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutUnitsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutUnitsInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional()
}).strict();
export const EquipmentCreateNestedOneWithoutUnitsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateNestedOneWithoutUnitsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateNestedOneWithoutUnitsInput>;
export const EquipmentCreateNestedOneWithoutUnitsInputObjectZodSchema = makeSchema();
