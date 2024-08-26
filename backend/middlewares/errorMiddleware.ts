import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export const errorMiddleware = (
  error: Error | CustomError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    console.error(error);

    res.status(error.statusCode);
    res.send(error.message);

    next();

    return;
  }

  console.error(error);

  res.status(500);
  res.send('An error occurred');

  next();
}