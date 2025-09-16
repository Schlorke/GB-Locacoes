import { z } from 'zod';

// prettier-ignore
export const SessionResultSchema = z.object({
    id: z.string(),
    sessionToken: z.string(),
    userId: z.string(),
    expires: z.date(),
    user: z.unknown()
}).strict();

export type SessionResultType = z.infer<typeof SessionResultSchema>;
