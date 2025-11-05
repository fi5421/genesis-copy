import { z } from 'zod/v4';

const EnvSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string(),
  VITE_NODE_ENV: z.string(),
  VITE_ENABLE_SIGN_UP_WITH_GOOGLE: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  VITE_API_URL: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;
export const env = EnvSchema.parse(import.meta.env);
