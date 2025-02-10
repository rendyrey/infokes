import { Elysia } from "elysia";
import { directoryRoutes, fileRoutes } from "../../routes/v1";
import { beforeAll, afterAll } from "bun:test";

const port = 3001;
const server = new Elysia().use(directoryRoutes).use(fileRoutes);

// export async function startTestServer() {
//   await server.listen(port);
//   console.log(`Test server running on http://localhost:${port}`);
//   return server;
// }

// export async function stopTestServer() {
//   server?.stop();
//   console.log("Test server stopped.");
// }

beforeAll(async () => {
  console.log(`Test server starting on http://localhost:${port}`);
  await server.listen(port);
});


afterAll(async () => {
  await server?.stop();
});
