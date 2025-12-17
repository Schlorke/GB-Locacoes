import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliveryWhereInputObjectSchema as DeliveryWhereInputObjectSchema } from './objects/DeliveryWhereInput.schema';

export const DeliveryDeleteManySchema: z.ZodType<Prisma.DeliveryDeleteManyArgs> = z.object({ where: DeliveryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DeliveryDeleteManyArgs>;

export const DeliveryDeleteManyZodSchema = z.object({ where: DeliveryWhereInputObjectSchema.optional() }).strict();