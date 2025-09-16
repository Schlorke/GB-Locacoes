import { z } from 'zod';
export const SessionFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  user: z.unknown()
}));