/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

// prettier-ignore
export const SessionModelSchema = z.object({
    id: z.string(),
    sessionToken: z.string(),
    userId: z.string(),
    expires: z.date(),
    user: z.unknown()
}).strict();

export type SessionPureType = z.infer<typeof SessionModelSchema>;
