/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverSelectObjectSchema as DriverSelectObjectSchema } from './objects/DriverSelect.schema';
import { DriverUpdateManyMutationInputObjectSchema as DriverUpdateManyMutationInputObjectSchema } from './objects/DriverUpdateManyMutationInput.schema';
import { DriverWhereInputObjectSchema as DriverWhereInputObjectSchema } from './objects/DriverWhereInput.schema';

export const DriverUpdateManyAndReturnSchema: z.ZodType<Prisma.DriverUpdateManyAndReturnArgs> = z.object({ select: DriverSelectObjectSchema.optional(), data: DriverUpdateManyMutationInputObjectSchema, where: DriverWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DriverUpdateManyAndReturnArgs>;

export const DriverUpdateManyAndReturnZodSchema = z.object({ select: DriverSelectObjectSchema.optional(), data: DriverUpdateManyMutationInputObjectSchema, where: DriverWhereInputObjectSchema.optional() }).strict();