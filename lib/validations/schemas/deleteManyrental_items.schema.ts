import { z } from 'zod';
import { rental_itemsWhereInputObjectSchema } from './objects/rental_itemsWhereInput.schema';

export const rental_itemsDeleteManySchema = z.object({ where: rental_itemsWhereInputObjectSchema.optional()  })