import { App } from "./app";
import "dotenv/config";
import { connectDB } from "./config/db";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is required");
}

// connect to DB
connectDB().then(() => {
  const server = new App(+PORT);
  server.listen();
});
