/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const DeliveryCreatephotosInputObjectSchema: z.ZodType<Prisma.DeliveryCreatephotosInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryCreatephotosInput>;
export const DeliveryCreatephotosInputObjectZodSchema = makeSchema();
