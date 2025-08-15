import { z } from 'zod';
import { rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema';
import { rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema';
import { rental_itemsCreateInputObjectSchema } from './objects/rental_itemsCreateInput.schema';
import { rental_itemsUncheckedCreateInputObjectSchema } from './objects/rental_itemsUncheckedCreateInput.schema'

export const rental_itemsCreateOneSchema = z.object({ select: rental_itemsSelectObjectSchema.optional(), include: rental_itemsIncludeObjectSchema.optional(), data: z.union([rental_itemsCreateInputObjectSchema, rental_itemsUncheckedCreateInputObjectSchema])  })