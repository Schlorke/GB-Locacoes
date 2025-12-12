/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverSelectObjectSchema as DriverSelectObjectSchema } from './objects/DriverSelect.schema';
import { DriverWhereUniqueInputObjectSchema as DriverWhereUniqueInputObjectSchema } from './objects/DriverWhereUniqueInput.schema';

export const DriverFindUniqueOrThrowSchema: z.ZodType<Prisma.DriverFindUniqueOrThrowArgs> = z.object({ select: DriverSelectObjectSchema.optional(),  where: DriverWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DriverFindUniqueOrThrowArgs>;

export const DriverFindUniqueOrThrowZodSchema = z.object({ select: DriverSelectObjectSchema.optional(),  where: DriverWhereUniqueInputObjectSchema }).strict();