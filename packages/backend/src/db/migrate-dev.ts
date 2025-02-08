import { migrate } from 'drizzle-orm/node-postgres/migrator';
import db from './index';

// This will run migrations
async function main() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './src/db/migrations' });
  console.log('Migrations completed!');
}

main().catch((err) => {
  console.error('Migration failed!', err);
  process.exit(1);
});