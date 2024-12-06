import dotenv from 'dotenv';
import path from 'path';
import { migrate } from 'drizzle-orm/neon-http/migrator';

import { db } from './drizzle';


dotenv.config({ path: '.env.local' });

async function main() {
  console.log('Migrating database');
  await migrate(db, { migrationsFolder: path.join(__dirname, './migrations') });
  console.log(`Migrations complete`);
}

main();