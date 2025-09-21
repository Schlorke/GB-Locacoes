import { z } from 'zod';
export const AccountGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string(),
  access_token: z.string(),
  expires_at: z.number().int(),
  token_type: z.string(),
  scope: z.string(),
  id_token: z.string(),
  session_state: z.string(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    type: z.number(),
    provider: z.number(),
    providerAccountId: z.number(),
    refresh_token: z.number(),
    access_token: z.number(),
    expires_at: z.number(),
    token_type: z.number(),
    scope: z.number(),
    id_token: z.number(),
    session_state: z.number(),
    user: z.number()
  }).optional(),
  _sum: z.object({
    expires_at: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    expires_at: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    type: z.string().nullable(),
    provider: z.string().nullable(),
    providerAccountId: z.string().nullable(),
    refresh_token: z.string().nullable(),
    access_token: z.string().nullable(),
    expires_at: z.number().int().nullable(),
    token_type: z.string().nullable(),
    scope: z.string().nullable(),
    id_token: z.string().nullable(),
    session_state: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    type: z.string().nullable(),
    provider: z.string().nullable(),
    providerAccountId: z.string().nullable(),
    refresh_token: z.string().nullable(),
    access_token: z.string().nullable(),
    expires_at: z.number().int().nullable(),
    token_type: z.string().nullable(),
    scope: z.string().nullable(),
    id_token: z.string().nullable(),
    session_state: z.string().nullable()
  }).nullable().optional()
}));