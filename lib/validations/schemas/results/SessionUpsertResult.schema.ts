import { z } from 'zod';
export const SessionUpsertResultSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  user: z.unknown()
});