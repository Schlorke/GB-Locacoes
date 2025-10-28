/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional()
}).strict();
export const UserWhereUniqueInputObjectSchema: z.ZodType<Prisma.UserWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UserWhereUniqueInput>;
export const UserWhereUniqueInputObjectZodSchema = makeSchema();
