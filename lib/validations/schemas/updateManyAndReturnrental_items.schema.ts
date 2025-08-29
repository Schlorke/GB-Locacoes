import { z } from 'zod';
import { rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema';
import { rental_itemsUpdateManyMutationInputObjectSchema } from './objects/rental_itemsUpdateManyMutationInput.schema';
import { rental_itemsWhereInputObjectSchema } from './objects/rental_itemsWhereInput.schema';

export const rental_itemsUpdateManyAndReturnSchema = z.object({ select: rental_itemsSelectObjectSchema.optional(), data: rental_itemsUpdateManyMutationInputObjectSchema, where: rental_itemsWhereInputObjectSchema.optional()  }).strict()