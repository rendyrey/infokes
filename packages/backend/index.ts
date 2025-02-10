import { Elysia } from "elysia";
import { directoryRoutes, fileRoutes } from "./src/routes/v1";
import { cors } from "@elysiajs/cors";
// import { checkOrigin } from "./src/middlewares/checkOrigin";

const app = new Elysia()
  // .onBeforeHandle(checkOrigin) // enable this if you want to only allow vue app to access backen
  .get("/health", () => "OK")
  .use(directoryRoutes)
  .use(fileRoutes)
  .use(cors());

app.listen(3000);

console.log("Backend server running at http://localhost:3000");
