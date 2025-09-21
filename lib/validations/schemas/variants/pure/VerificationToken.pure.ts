import { z } from 'zod';

// prettier-ignore
export const VerificationTokenModelSchema = z.object({
    identifier: z.string(),
    token: z.string(),
    expires: z.date()
}).strict();

export type VerificationTokenModelType = z.infer<typeof VerificationTokenModelSchema>;
