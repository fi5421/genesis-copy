import { z } from 'zod/v4';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z
    .string()
    .regex(/^\d{4,5}$/)
    .optional()
    .default('3000'),
  DATABASE_URL: z
    .string()
    .url()
    .refine(
      (url) => url.startsWith('postgres://') || url.startsWith('postgresql://'),
      'DATABASE_URL must be a valid postgresql url',
    ),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_GOOGLE_APPLICATION_CLIENT_EMAIL: z.string(),
  FIREBASE_GOOGLE_APPLICATION_PRIVATE_KEY: z
    .string()
    .transform((val) => val.replace(/\\n/g, '\n')),
  FRONTEND_URL: z.string().url(),
});

export type Env = z.infer<typeof EnvSchema>;
export const env = EnvSchema.parse(process.env);
