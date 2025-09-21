import { z } from 'zod';

// prettier-ignore
export const VerificationTokenResultSchema = z.object({
    identifier: z.string(),
    token: z.string(),
    expires: z.date()
}).strict();

export type VerificationTokenResultType = z.infer<typeof VerificationTokenResultSchema>;
