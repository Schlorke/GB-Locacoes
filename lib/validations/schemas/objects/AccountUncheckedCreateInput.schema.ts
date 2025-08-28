import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish()
}).strict();
export const AccountUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountUncheckedCreateInput>;
export const AccountUncheckedCreateInputObjectZodSchema = makeSchema();
