import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string()
}).strict();
export const SettingWhereUniqueInputObjectSchema: z.ZodType<Prisma.SettingWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.SettingWhereUniqueInput>;
export const SettingWhereUniqueInputObjectZodSchema = makeSchema();
