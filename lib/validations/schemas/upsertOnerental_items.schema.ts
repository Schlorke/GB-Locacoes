import { z } from 'zod';
import { rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema';
import { rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema';
import { rental_itemsWhereUniqueInputObjectSchema } from './objects/rental_itemsWhereUniqueInput.schema';
import { rental_itemsCreateInputObjectSchema } from './objects/rental_itemsCreateInput.schema';
import { rental_itemsUncheckedCreateInputObjectSchema } from './objects/rental_itemsUncheckedCreateInput.schema';
import { rental_itemsUpdateInputObjectSchema } from './objects/rental_itemsUpdateInput.schema';
import { rental_itemsUncheckedUpdateInputObjectSchema } from './objects/rental_itemsUncheckedUpdateInput.schema'

export const rental_itemsUpsertSchema = z.object({ select: rental_itemsSelectObjectSchema.optional(), include: rental_itemsIncludeObjectSchema.optional(), where: rental_itemsWhereUniqueInputObjectSchema, create: z.union([ rental_itemsCreateInputObjectSchema, rental_itemsUncheckedCreateInputObjectSchema ]), update: z.union([ rental_itemsUpdateInputObjectSchema, rental_itemsUncheckedUpdateInputObjectSchema ])  })