import { z } from 'zod';
import { EquipmentUpdateManyMutationInputObjectSchema } from './objects/EquipmentUpdateManyMutationInput.schema';
import { EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema';

export const EquipmentUpdateManySchema = z.object({ data: EquipmentUpdateManyMutationInputObjectSchema, where: EquipmentWhereInputObjectSchema.optional()  })