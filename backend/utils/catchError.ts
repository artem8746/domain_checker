import { Request, Response, NextFunction, Router } from 'express';

export const catchError = (router: Router) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await router(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}