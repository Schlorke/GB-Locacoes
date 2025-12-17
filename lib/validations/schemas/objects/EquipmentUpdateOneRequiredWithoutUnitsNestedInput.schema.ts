import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutUnitsInputObjectSchema as EquipmentCreateWithoutUnitsInputObjectSchema } from './EquipmentCreateWithoutUnitsInput.schema';
import { EquipmentUncheckedCreateWithoutUnitsInputObjectSchema as EquipmentUncheckedCreateWithoutUnitsInputObjectSchema } from './EquipmentUncheckedCreateWithoutUnitsInput.schema';
import { EquipmentCreateOrConnectWithoutUnitsInputObjectSchema as EquipmentCreateOrConnectWithoutUnitsInputObjectSchema } from './EquipmentCreateOrConnectWithoutUnitsInput.schema';
import { EquipmentUpsertWithoutUnitsInputObjectSchema as EquipmentUpsertWithoutUnitsInputObjectSchema } from './EquipmentUpsertWithoutUnitsInput.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentUpdateToOneWithWhereWithoutUnitsInputObjectSchema as EquipmentUpdateToOneWithWhereWithoutUnitsInputObjectSchema } from './EquipmentUpdateToOneWithWhereWithoutUnitsInput.schema';
import { EquipmentUpdateWithoutUnitsInputObjectSchema as EquipmentUpdateWithoutUnitsInputObjectSchema } from './EquipmentUpdateWithoutUnitsInput.schema';
import { EquipmentUncheckedUpdateWithoutUnitsInputObjectSchema as EquipmentUncheckedUpdateWithoutUnitsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutUnitsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutUnitsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutUnitsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutUnitsInputObjectSchema).optional(),
  upsert: z.lazy(() => EquipmentUpsertWithoutUnitsInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => EquipmentUpdateToOneWithWhereWithoutUnitsInputObjectSchema), z.lazy(() => EquipmentUpdateWithoutUnitsInputObjectSchema), z.lazy(() => EquipmentUncheckedUpdateWithoutUnitsInputObjectSchema)]).optional()
}).strict();
export const EquipmentUpdateOneRequiredWithoutUnitsNestedInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutUnitsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateOneRequiredWithoutUnitsNestedInput>;
export const EquipmentUpdateOneRequiredWithoutUnitsNestedInputObjectZodSchema = makeSchema();
