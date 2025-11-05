import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../utils/env';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env file');
}

export const db = drizzle(env.DATABASE_URL);
