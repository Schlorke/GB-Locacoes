/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverSelectObjectSchema as DriverSelectObjectSchema } from './objects/DriverSelect.schema';
import { DriverUpdateInputObjectSchema as DriverUpdateInputObjectSchema } from './objects/DriverUpdateInput.schema';
import { DriverUncheckedUpdateInputObjectSchema as DriverUncheckedUpdateInputObjectSchema } from './objects/DriverUncheckedUpdateInput.schema';
import { DriverWhereUniqueInputObjectSchema as DriverWhereUniqueInputObjectSchema } from './objects/DriverWhereUniqueInput.schema';

export const DriverUpdateOneSchema: z.ZodType<Prisma.DriverUpdateArgs> = z.object({ select: DriverSelectObjectSchema.optional(),  data: z.union([DriverUpdateInputObjectSchema, DriverUncheckedUpdateInputObjectSchema]), where: DriverWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DriverUpdateArgs>;

export const DriverUpdateOneZodSchema = z.object({ select: DriverSelectObjectSchema.optional(),  data: z.union([DriverUpdateInputObjectSchema, DriverUncheckedUpdateInputObjectSchema]), where: DriverWhereUniqueInputObjectSchema }).strict();