import { z } from 'zod';
export const VerificationTokenCreateResultSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
});