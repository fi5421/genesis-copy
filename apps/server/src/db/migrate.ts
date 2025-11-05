import { migrate } from 'drizzle-orm/node-postgres/migrator';
import drizzleConfig from '../../drizzle.config';
import { db } from './db';

async function main() {
  if (!drizzleConfig.out) {
    throw new Error('Migrations folder is not set');
  }

  await migrate(db, { migrationsFolder: drizzleConfig.out });
  await db.$client.end();
}

main();
