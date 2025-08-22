import { z } from 'zod';
import { EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentCreateManyInputObjectSchema } from './objects/EquipmentCreateManyInput.schema'

export const EquipmentCreateManyAndReturnSchema = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), data: z.union([ EquipmentCreateManyInputObjectSchema, z.array(EquipmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })