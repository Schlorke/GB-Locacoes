import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliveryUpdateManyMutationInputObjectSchema as DeliveryUpdateManyMutationInputObjectSchema } from './objects/DeliveryUpdateManyMutationInput.schema';
import { DeliveryWhereInputObjectSchema as DeliveryWhereInputObjectSchema } from './objects/DeliveryWhereInput.schema';

export const DeliveryUpdateManySchema: z.ZodType<Prisma.DeliveryUpdateManyArgs> = z.object({ data: DeliveryUpdateManyMutationInputObjectSchema, where: DeliveryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DeliveryUpdateManyArgs>;

export const DeliveryUpdateManyZodSchema = z.object({ data: DeliveryUpdateManyMutationInputObjectSchema, where: DeliveryWhereInputObjectSchema.optional() }).strict();