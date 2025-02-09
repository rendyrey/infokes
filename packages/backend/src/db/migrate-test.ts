import { migrate } from 'drizzle-orm/node-postgres/migrator';
import db from './index';

// This will run migrations
async function main() {
  console.log('Running migrations for test database...');
  await migrate(db, { migrationsFolder: './src/db/tests/migrations' });
  console.log('Migrations for test database completed!');
}

main().catch((err) => {
  console.error('Migration failed!', err);
  process.exit(1);
});