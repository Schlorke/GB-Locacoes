import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverSelectObjectSchema as DriverSelectObjectSchema } from './objects/DriverSelect.schema';
import { DriverCreateInputObjectSchema as DriverCreateInputObjectSchema } from './objects/DriverCreateInput.schema';
import { DriverUncheckedCreateInputObjectSchema as DriverUncheckedCreateInputObjectSchema } from './objects/DriverUncheckedCreateInput.schema';

export const DriverCreateOneSchema: z.ZodType<Prisma.DriverCreateArgs> = z.object({ select: DriverSelectObjectSchema.optional(),  data: z.union([DriverCreateInputObjectSchema, DriverUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.DriverCreateArgs>;

export const DriverCreateOneZodSchema = z.object({ select: DriverSelectObjectSchema.optional(),  data: z.union([DriverCreateInputObjectSchema, DriverUncheckedCreateInputObjectSchema]) }).strict();