/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
export const VerificationTokenUpsertResultSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
});