import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverUpdateManyMutationInputObjectSchema as DriverUpdateManyMutationInputObjectSchema } from './objects/DriverUpdateManyMutationInput.schema';
import { DriverWhereInputObjectSchema as DriverWhereInputObjectSchema } from './objects/DriverWhereInput.schema';

export const DriverUpdateManySchema: z.ZodType<Prisma.DriverUpdateManyArgs> = z.object({ data: DriverUpdateManyMutationInputObjectSchema, where: DriverWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DriverUpdateManyArgs>;

export const DriverUpdateManyZodSchema = z.object({ data: DriverUpdateManyMutationInputObjectSchema, where: DriverWhereInputObjectSchema.optional() }).strict();