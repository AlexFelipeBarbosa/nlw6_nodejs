import dotenv from "dotenv";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

import "./database";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

dotenv.config();

app.listen(process.env.PORT || 3333, () => {
  console.log("Server is running!");
});
