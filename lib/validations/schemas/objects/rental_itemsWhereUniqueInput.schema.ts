/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const rental_itemsWhereUniqueInputObjectSchema: z.ZodType<Prisma.rental_itemsWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsWhereUniqueInput>;
export const rental_itemsWhereUniqueInputObjectZodSchema = makeSchema();
