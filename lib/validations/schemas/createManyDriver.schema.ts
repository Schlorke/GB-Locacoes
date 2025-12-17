import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverCreateManyInputObjectSchema as DriverCreateManyInputObjectSchema } from './objects/DriverCreateManyInput.schema';

export const DriverCreateManySchema: z.ZodType<Prisma.DriverCreateManyArgs> = z.object({ data: z.union([ DriverCreateManyInputObjectSchema, z.array(DriverCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.DriverCreateManyArgs>;

export const DriverCreateManyZodSchema = z.object({ data: z.union([ DriverCreateManyInputObjectSchema, z.array(DriverCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();