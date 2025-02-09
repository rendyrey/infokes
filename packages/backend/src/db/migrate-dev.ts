import { migrate } from 'drizzle-orm/node-postgres/migrator';
import db from './index';

// This will run migrations
async function main() {
  console.log('Running migrations for development database...');
  await migrate(db, { migrationsFolder: './src/db/migrations' });
  console.log('Migrations for dev database completed!');
}

main().catch((err) => {
  console.error('Migration development failed!', err);
  process.exit(1);
});