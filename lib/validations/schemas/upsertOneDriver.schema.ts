/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverSelectObjectSchema as DriverSelectObjectSchema } from './objects/DriverSelect.schema';
import { DriverWhereUniqueInputObjectSchema as DriverWhereUniqueInputObjectSchema } from './objects/DriverWhereUniqueInput.schema';
import { DriverCreateInputObjectSchema as DriverCreateInputObjectSchema } from './objects/DriverCreateInput.schema';
import { DriverUncheckedCreateInputObjectSchema as DriverUncheckedCreateInputObjectSchema } from './objects/DriverUncheckedCreateInput.schema';
import { DriverUpdateInputObjectSchema as DriverUpdateInputObjectSchema } from './objects/DriverUpdateInput.schema';
import { DriverUncheckedUpdateInputObjectSchema as DriverUncheckedUpdateInputObjectSchema } from './objects/DriverUncheckedUpdateInput.schema';

export const DriverUpsertOneSchema: z.ZodType<Prisma.DriverUpsertArgs> = z.object({ select: DriverSelectObjectSchema.optional(),  where: DriverWhereUniqueInputObjectSchema, create: z.union([ DriverCreateInputObjectSchema, DriverUncheckedCreateInputObjectSchema ]), update: z.union([ DriverUpdateInputObjectSchema, DriverUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.DriverUpsertArgs>;

export const DriverUpsertOneZodSchema = z.object({ select: DriverSelectObjectSchema.optional(),  where: DriverWhereUniqueInputObjectSchema, create: z.union([ DriverCreateInputObjectSchema, DriverUncheckedCreateInputObjectSchema ]), update: z.union([ DriverUpdateInputObjectSchema, DriverUncheckedUpdateInputObjectSchema ]) }).strict();