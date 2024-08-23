import express, { json } from 'express';
import cors from 'cors';
import { router as twilightRouter } from './routes/twilight.route';
import { catchError } from './utils/catchError';
import { errorMiddleware } from './middlewares/errorMiddleware';
import dotenv from 'dotenv';

dotenv.config();

export function createServer() {
  const app = express();

  app.use(cors({
    origin: process.env.APP_URL || '*',
  }));
  app.use(json());

  app.use('/twilight', catchError(twilightRouter));

  app.use(errorMiddleware);

  return app;
}