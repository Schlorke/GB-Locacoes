/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverWhereInputObjectSchema as DriverWhereInputObjectSchema } from './objects/DriverWhereInput.schema';

export const DriverDeleteManySchema: z.ZodType<Prisma.DriverDeleteManyArgs> = z.object({ where: DriverWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DriverDeleteManyArgs>;

export const DriverDeleteManyZodSchema = z.object({ where: DriverWhereInputObjectSchema.optional() }).strict();