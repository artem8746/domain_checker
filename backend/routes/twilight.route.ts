import { Router } from 'express'
import * as twilightController from '../controllers/twilight.controller';

export const router = Router();

router.post('/search', twilightController.getDomainInfo);
