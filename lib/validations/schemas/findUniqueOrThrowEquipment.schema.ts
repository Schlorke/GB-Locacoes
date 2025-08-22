import { z } from 'zod';
import { EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema'

export const EquipmentFindUniqueOrThrowSchema = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), where: EquipmentWhereUniqueInputObjectSchema })