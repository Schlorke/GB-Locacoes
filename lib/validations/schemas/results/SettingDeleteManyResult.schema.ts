import { z } from 'zod';
export const SettingDeleteManyResultSchema = z.object({
  count: z.number()
});