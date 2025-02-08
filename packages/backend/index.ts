import { Elysia } from "elysia";
import { directoryRoutes, fileRoutes } from "./src/routes/v1";
// import { createDbConnection } from "./src/db";

const app = new Elysia()
  .use(directoryRoutes)
  .use(fileRoutes)
  .listen(3000);

console.log("Backend server running at http://localhost:3000");

// createDbConnection();


// console.log("Hello via Bun!");
