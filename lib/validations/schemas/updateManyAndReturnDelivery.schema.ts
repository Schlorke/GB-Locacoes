import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliverySelectObjectSchema as DeliverySelectObjectSchema } from './objects/DeliverySelect.schema';
import { DeliveryUpdateManyMutationInputObjectSchema as DeliveryUpdateManyMutationInputObjectSchema } from './objects/DeliveryUpdateManyMutationInput.schema';
import { DeliveryWhereInputObjectSchema as DeliveryWhereInputObjectSchema } from './objects/DeliveryWhereInput.schema';

export const DeliveryUpdateManyAndReturnSchema: z.ZodType<Prisma.DeliveryUpdateManyAndReturnArgs> = z.object({ select: DeliverySelectObjectSchema.optional(), data: DeliveryUpdateManyMutationInputObjectSchema, where: DeliveryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DeliveryUpdateManyAndReturnArgs>;

export const DeliveryUpdateManyAndReturnZodSchema = z.object({ select: DeliverySelectObjectSchema.optional(), data: DeliveryUpdateManyMutationInputObjectSchema, where: DeliveryWhereInputObjectSchema.optional() }).strict();