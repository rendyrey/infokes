import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from "dotenv";

const DB_PORT: number = parseInt(process.env.DB_PORT || '5432', 10);
dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: DB_PORT, // default PostgreSQL port
});

// pool.connect()
//   .then((client) => {
//     console.log("✅ Database connected!");
//     client.release();
//   })
//   .catch((error) => {
//     console.error("❌ Database connection failed:", error);
//   });

const db = drizzle(pool);

// export const createDbConnection = async () => {
//     const pool = new Pool({
//       host: 'db',
//       port: 5432,
//       user: 'postgres',
//       password: 'postgres',
//       database: 'database'
//     });
  
//     // Test the connection
//     try {
//       const client = await pool.connect();
//       console.log('✅ Database connection successful');
      
//       // Test query to verify database and table access
//       const result = await client.query('SELECT NOW()');
//       console.log('✅ Database query successful:', result.rows[0].now);
      
//       client.release();
//       return drizzle(pool);
//     } catch (error) {
//       console.error('❌ Database connection failed:', error);
//       throw error;
//     }
//   };

export default db;

