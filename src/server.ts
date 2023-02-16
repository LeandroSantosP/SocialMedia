import "reflect-metadata";
import "./modules/shared/tsyringe";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./errors/appErros";
import { AllRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(AllRoutes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err);

    if (err instanceof AppError) {
      console.log(err);

      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
    return response.status(500).json({
      message: "Internal Server Error! ",
    });
  }
);

app.listen(3000, () => console.log("Server is Running!"));
