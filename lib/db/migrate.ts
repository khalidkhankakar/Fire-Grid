import dotenv from 'dotenv';
import path from 'path';
import { migrate } from 'drizzle-orm/neon-http/migrator';

import { db } from './drizzle';
import { sql } from 'drizzle-orm';


dotenv.config({ path: '.env' });

async function main() {
  console.log('Migrating database....');

  await db.execute(sql`
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
  `);

  console.log('Created extension for fuzzy searching....');

  await migrate(db, { migrationsFolder: path.join(__dirname, './migrations') });
  console.log(`Migrations complete`);
}

main();