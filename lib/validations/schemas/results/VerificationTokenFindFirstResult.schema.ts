import { z } from 'zod';
export const VerificationTokenFindFirstResultSchema = z.nullable(z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
}));