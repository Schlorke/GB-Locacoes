/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rental_itemsSelectObjectSchema as rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema';
import { rental_itemsIncludeObjectSchema as rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema';
import { rental_itemsUpdateInputObjectSchema as rental_itemsUpdateInputObjectSchema } from './objects/rental_itemsUpdateInput.schema';
import { rental_itemsUncheckedUpdateInputObjectSchema as rental_itemsUncheckedUpdateInputObjectSchema } from './objects/rental_itemsUncheckedUpdateInput.schema';
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './objects/rental_itemsWhereUniqueInput.schema';

export const rental_itemsUpdateOneSchema: z.ZodType<Prisma.rental_itemsUpdateArgs> = z.object({ select: rental_itemsSelectObjectSchema.optional(), include: rental_itemsIncludeObjectSchema.optional(), data: z.union([rental_itemsUpdateInputObjectSchema, rental_itemsUncheckedUpdateInputObjectSchema]), where: rental_itemsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.rental_itemsUpdateArgs>;

export const rental_itemsUpdateOneZodSchema = z.object({ select: rental_itemsSelectObjectSchema.optional(), include: rental_itemsIncludeObjectSchema.optional(), data: z.union([rental_itemsUpdateInputObjectSchema, rental_itemsUncheckedUpdateInputObjectSchema]), where: rental_itemsWhereUniqueInputObjectSchema }).strict();