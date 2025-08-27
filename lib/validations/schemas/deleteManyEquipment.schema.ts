import { z } from 'zod';
import { EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema';

export const EquipmentDeleteManySchema = z.object({ where: EquipmentWhereInputObjectSchema.optional()  })