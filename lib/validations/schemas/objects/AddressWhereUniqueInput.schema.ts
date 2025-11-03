/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AddressWhereUniqueInputObjectSchema: z.ZodType<Prisma.AddressWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressWhereUniqueInput>;
export const AddressWhereUniqueInputObjectZodSchema = makeSchema();
