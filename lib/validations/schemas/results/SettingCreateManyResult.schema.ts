import { z } from 'zod';
export const SettingCreateManyResultSchema = z.object({
  count: z.number()
});