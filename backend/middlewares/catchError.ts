import { Request, Response, NextFunction } from 'express';

type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const catchError = (router: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await router(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}