import { z } from 'zod';
export const VerificationTokenDeleteResultSchema = z.nullable(z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
}));