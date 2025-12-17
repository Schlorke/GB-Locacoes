import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverSelectObjectSchema as DriverSelectObjectSchema } from './objects/DriverSelect.schema';
import { DriverWhereUniqueInputObjectSchema as DriverWhereUniqueInputObjectSchema } from './objects/DriverWhereUniqueInput.schema';

export const DriverDeleteOneSchema: z.ZodType<Prisma.DriverDeleteArgs> = z.object({ select: DriverSelectObjectSchema.optional(),  where: DriverWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DriverDeleteArgs>;

export const DriverDeleteOneZodSchema = z.object({ select: DriverSelectObjectSchema.optional(),  where: DriverWhereUniqueInputObjectSchema }).strict();