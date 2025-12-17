import * as z from 'zod';
// prettier-ignore
export const VerificationTokenModelSchema = z.object({
    identifier: z.string(),
    token: z.string(),
    expires: z.date()
}).strict();

export type VerificationTokenPureType = z.infer<typeof VerificationTokenModelSchema>;
