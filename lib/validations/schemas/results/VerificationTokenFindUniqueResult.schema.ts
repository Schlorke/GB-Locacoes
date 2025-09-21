import { z } from 'zod';
export const VerificationTokenFindUniqueResultSchema = z.nullable(z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
}));