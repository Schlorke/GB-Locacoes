import { z } from 'zod';
import { rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema';
import { rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema';
import { rental_itemsWhereUniqueInputObjectSchema } from './objects/rental_itemsWhereUniqueInput.schema'

export const rental_itemsFindUniqueOrThrowSchema = z.object({ select: rental_itemsSelectObjectSchema.optional(), include: rental_itemsIncludeObjectSchema.optional(), where: rental_itemsWhereUniqueInputObjectSchema })