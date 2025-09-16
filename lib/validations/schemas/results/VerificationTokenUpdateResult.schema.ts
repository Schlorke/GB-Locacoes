import { z } from 'zod';
export const VerificationTokenUpdateResultSchema = z.nullable(z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
}));