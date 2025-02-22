import express, { Application, Router } from "express";
import routes from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

export class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  private routes(): void {
    this.app.use("/api", routes); //Loads all routes
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on ${process.env.SERVER_URL}:${this.port}`);
    });
  }
}
