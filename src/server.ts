import "reflect-metadata";
import "express-async-errors";
import "./modules/shared/tsyringe";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./middlewares/appErros";
import { AllRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(AllRoutes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error - " + err.message,
    });
  }
);

app.listen(3000, () => console.log("Server is Running!"));
