import { Router } from 'express'
import * as twilightController from '../controllers/twilight.controller';
import { catchError } from '../middlewares/catchError';

export const router = Router();

router.post('/search', catchError(twilightController.getDomainInfo));
