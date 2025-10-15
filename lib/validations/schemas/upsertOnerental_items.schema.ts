/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rental_itemsSelectObjectSchema as rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema';
import { rental_itemsIncludeObjectSchema as rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema';
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './objects/rental_itemsWhereUniqueInput.schema';
import { rental_itemsCreateInputObjectSchema as rental_itemsCreateInputObjectSchema } from './objects/rental_itemsCreateInput.schema';
import { rental_itemsUncheckedCreateInputObjectSchema as rental_itemsUncheckedCreateInputObjectSchema } from './objects/rental_itemsUncheckedCreateInput.schema';
import { rental_itemsUpdateInputObjectSchema as rental_itemsUpdateInputObjectSchema } from './objects/rental_itemsUpdateInput.schema';
import { rental_itemsUncheckedUpdateInputObjectSchema as rental_itemsUncheckedUpdateInputObjectSchema } from './objects/rental_itemsUncheckedUpdateInput.schema';

export const rental_itemsUpsertOneSchema: z.ZodType<Prisma.rental_itemsUpsertArgs> = z.object({ select: rental_itemsSelectObjectSchema.optional(), include: rental_itemsIncludeObjectSchema.optional(), where: rental_itemsWhereUniqueInputObjectSchema, create: z.union([ rental_itemsCreateInputObjectSchema, rental_itemsUncheckedCreateInputObjectSchema ]), update: z.union([ rental_itemsUpdateInputObjectSchema, rental_itemsUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.rental_itemsUpsertArgs>;

export const rental_itemsUpsertOneZodSchema = z.object({ select: rental_itemsSelectObjectSchema.optional(), include: rental_itemsIncludeObjectSchema.optional(), where: rental_itemsWhereUniqueInputObjectSchema, create: z.union([ rental_itemsCreateInputObjectSchema, rental_itemsUncheckedCreateInputObjectSchema ]), update: z.union([ rental_itemsUpdateInputObjectSchema, rental_itemsUncheckedUpdateInputObjectSchema ]) }).strict();