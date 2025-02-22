import { App } from "./app";
import "dotenv/config";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is required");
}

const server = new App(+PORT);
server.listen();
