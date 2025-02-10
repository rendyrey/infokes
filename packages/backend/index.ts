import { Elysia } from "elysia";
import { directoryRoutes, fileRoutes } from "./src/routes/v1";
import { cors } from '@elysiajs/cors'
// import { createDbConnection } from "./src/db";


const app = new Elysia()
  .get("/health", () => "OK")
  .use(directoryRoutes)
  .use(fileRoutes)
  .use(cors({
    origin: 'http://localhost:8080'
  }))
  .listen(3000);



console.log("Backend server running at http://localhost:3000");

// createDbConnection();


// console.log("Hello via Bun!");
