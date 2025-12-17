/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverSelectObjectSchema as DriverSelectObjectSchema } from './objects/DriverSelect.schema';
import { DriverCreateManyInputObjectSchema as DriverCreateManyInputObjectSchema } from './objects/DriverCreateManyInput.schema';

export const DriverCreateManyAndReturnSchema: z.ZodType<Prisma.DriverCreateManyAndReturnArgs> = z.object({ select: DriverSelectObjectSchema.optional(), data: z.union([ DriverCreateManyInputObjectSchema, z.array(DriverCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.DriverCreateManyAndReturnArgs>;

export const DriverCreateManyAndReturnZodSchema = z.object({ select: DriverSelectObjectSchema.optional(), data: z.union([ DriverCreateManyInputObjectSchema, z.array(DriverCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();