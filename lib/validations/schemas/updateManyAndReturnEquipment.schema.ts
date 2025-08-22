import { z } from 'zod';
import { EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentUpdateManyMutationInputObjectSchema } from './objects/EquipmentUpdateManyMutationInput.schema';
import { EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema'

export const EquipmentUpdateManyAndReturnSchema = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), data: EquipmentUpdateManyMutationInputObjectSchema, where: EquipmentWhereInputObjectSchema.optional()  })